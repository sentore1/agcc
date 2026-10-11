-- ============================================
-- FIX MISSING PROFILES
-- Run this script to automatically create profiles for existing users
-- and set up automatic profile creation for future signups
-- ============================================

-- Step 1: Create the function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Create the trigger to automatically create profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 3: Create profiles for existing users who don't have them
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email, 'User'),
  COALESCE(au.raw_user_meta_data->>'role', 'student')
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- Step 4: Verify the fix
DO $$
DECLARE
  user_count INT;
  profile_count INT;
  missing_count INT;
BEGIN
  SELECT COUNT(*) INTO user_count FROM auth.users;
  SELECT COUNT(*) INTO profile_count FROM public.profiles;
  missing_count := user_count - profile_count;
  
  RAISE NOTICE '=======================================';
  RAISE NOTICE 'Profile Fix Results:';
  RAISE NOTICE '=======================================';
  RAISE NOTICE 'Total users in auth.users: %', user_count;
  RAISE NOTICE 'Total profiles created: %', profile_count;
  RAISE NOTICE 'Missing profiles: %', missing_count;
  RAISE NOTICE '=======================================';
  
  IF missing_count = 0 THEN
    RAISE NOTICE '✓ All users have profiles!';
  ELSE
    RAISE NOTICE '⚠ There are still % users without profiles', missing_count;
  END IF;
  RAISE NOTICE '=======================================';
END $$;
