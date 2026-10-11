# Quick Fix: Profile Error PGRST116

## 🚨 Error You're Seeing
```
PGRST116: Cannot coerce the result to a single JSON object
Profile not found for user: <user-id>
```

## ⚡ Quick Fix (2 minutes)

### Step 1: Open Supabase Dashboard
Go to your project → **SQL Editor**

### Step 2: Run This Script
Copy and paste the contents of `scripts/fix-missing-profiles.sql` or run this:

```sql
-- Create auto-profile function
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

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Fix existing users
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email, 'User'),
  COALESCE(au.raw_user_meta_data->>'role', 'student')
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;
```

### Step 3: Verify
Check the output - you should see:
```
✓ All users have profiles!
```

### Step 4: Test
- Try signing in again
- Go to `/dashboard`
- Should work without errors! ✅

## 📚 More Details
See `PROFILE_FIX_GUIDE.md` for comprehensive documentation.

## 🔍 What This Does
1. Creates a database trigger that auto-creates profiles for new signups
2. Creates profiles for all existing users who are missing them
3. Prevents this error from happening again

## ⏱️ Time Required
- Running the script: **30 seconds**
- Testing the fix: **1 minute**
- **Total: ~2 minutes**

## 🎯 Success Indicators
- ✅ No more PGRST116 errors
- ✅ Users can access dashboard immediately after signup
- ✅ Profile data displays correctly

---
**Still having issues?** Check `PROFILE_FIX_GUIDE.md` for troubleshooting.
