-- ============================================
-- QUICK USER CREATION - Admin, Caregiver, Client
-- ============================================
-- Copy and paste this entire script into Supabase SQL Editor and run it
-- All users will have password: TempPass123!
-- They can login immediately (no email confirmation needed)

-- ============================================
-- EDIT THESE VALUES BEFORE RUNNING
-- ============================================

-- 1. ADMIN USER
DO $$
DECLARE
  new_user_email VARCHAR := 'admin@example.com';     -- CHANGE EMAIL
  new_user_name VARCHAR := 'Admin User';             -- CHANGE NAME
  new_user_phone VARCHAR := '+1234567890';           -- CHANGE PHONE (optional)
  new_user_id UUID;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    new_user_email,
    crypt('TempPass123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', new_user_name),
    FALSE, NOW(), NOW(), '', '', '', '', ''
  )
  RETURNING id INTO new_user_id;

  INSERT INTO profiles (id, full_name, email, role, phone, created_at, updated_at)
  VALUES (new_user_id, new_user_name, new_user_email, 'admin', NULLIF(new_user_phone, ''), NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone,
    updated_at = NOW();

  RAISE NOTICE '✅ ADMIN created: % (ID: %)', new_user_email, new_user_id;
END $$;

-- 2. CAREGIVER USER
DO $$
DECLARE
  new_user_email VARCHAR := 'caregiver@example.com'; -- CHANGE EMAIL
  new_user_name VARCHAR := 'Caregiver User';         -- CHANGE NAME
  new_user_phone VARCHAR := '+1234567891';           -- CHANGE PHONE (optional)
  new_user_id UUID;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    new_user_email,
    crypt('TempPass123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', new_user_name),
    FALSE, NOW(), NOW(), '', '', '', '', ''
  )
  RETURNING id INTO new_user_id;

  INSERT INTO profiles (id, full_name, email, role, phone, created_at, updated_at)
  VALUES (new_user_id, new_user_name, new_user_email, 'caregiver', NULLIF(new_user_phone, ''), NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone,
    updated_at = NOW();

  RAISE NOTICE '✅ CAREGIVER created: % (ID: %)', new_user_email, new_user_id;
END $$;

-- 3. CLIENT USER
DO $$
DECLARE
  new_user_email VARCHAR := 'client@example.com';    -- CHANGE EMAIL
  new_user_name VARCHAR := 'Client User';            -- CHANGE NAME
  new_user_phone VARCHAR := '+1234567892';           -- CHANGE PHONE (optional)
  new_user_id UUID;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, created_at, updated_at,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    new_user_email,
    crypt('TempPass123!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', new_user_name),
    FALSE, NOW(), NOW(), '', '', '', '', ''
  )
  RETURNING id INTO new_user_id;

  INSERT INTO profiles (id, full_name, email, role, phone, created_at, updated_at)
  VALUES (new_user_id, new_user_name, new_user_email, 'client', NULLIF(new_user_phone, ''), NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone,
    updated_at = NOW();

  RAISE NOTICE '✅ CLIENT created: % (ID: %)', new_user_email, new_user_id;
END $$;

-- ============================================
-- VERIFICATION - View the created users
-- ============================================
SELECT 
  p.full_name,
  p.email,
  p.role,
  p.phone,
  p.created_at,
  '🔑 Password: TempPass123!' as login_info
FROM profiles p
WHERE p.email IN ('admin@example.com', 'caregiver@example.com', 'client@example.com')
ORDER BY 
  CASE p.role
    WHEN 'admin' THEN 1
    WHEN 'caregiver' THEN 2
    WHEN 'client' THEN 3
  END;

-- ============================================
-- SUCCESS! 
-- ============================================
-- All three users have been created with:
-- - Email: As specified above
-- - Password: TempPass123!
-- - Status: Email confirmed (ready to login)
-- 
-- They can login at: http://localhost:3000/auth/signin
-- ============================================
