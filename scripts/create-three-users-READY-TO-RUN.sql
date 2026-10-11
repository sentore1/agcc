-- ============================================
-- QUICK USER CREATION - Admin, Caregiver, Client
-- ============================================
-- Ready to run in Supabase SQL Editor
-- Password: Intore@1234
-- ============================================

-- 1. ADMIN USER
DO $$
DECLARE
  new_user_email VARCHAR := 'ali@agccrwanda.com';
  new_user_name VARCHAR := 'Admin User';
  new_user_phone VARCHAR := '+250788000000';
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
    crypt('Intore@1234', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', new_user_name),
    FALSE, NOW(), NOW(), '', '', '', '', ''
  )
  RETURNING id INTO new_user_id;

  INSERT INTO profiles (id, full_name, email, role, phone, created_at)
  VALUES (new_user_id, new_user_name, new_user_email, 'admin', NULLIF(new_user_phone, ''), NOW())
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone;

  RAISE NOTICE '✅ ADMIN created: % (ID: %)', new_user_email, new_user_id;
END $$;

-- 2. CAREGIVER USER
DO $$
DECLARE
  new_user_email VARCHAR := 'caregiver@agccrwanda.com';
  new_user_name VARCHAR := 'Caregiver User';
  new_user_phone VARCHAR := '+250788000001';
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
    crypt('Intore@1234', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', new_user_name),
    FALSE, NOW(), NOW(), '', '', '', '', ''
  )
  RETURNING id INTO new_user_id;

  INSERT INTO profiles (id, full_name, email, role, phone, created_at)
  VALUES (new_user_id, new_user_name, new_user_email, 'caregiver', NULLIF(new_user_phone, ''), NOW())
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone;

  RAISE NOTICE '✅ CAREGIVER created: % (ID: %)', new_user_email, new_user_id;
END $$;

-- 3. CLIENT USER
DO $$
DECLARE
  new_user_email VARCHAR := 'client@agccrwanda.com';
  new_user_name VARCHAR := 'Client User';
  new_user_phone VARCHAR := '+250788000002';
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
    crypt('Intore@1234', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', new_user_name),
    FALSE, NOW(), NOW(), '', '', '', '', ''
  )
  RETURNING id INTO new_user_id;

  INSERT INTO profiles (id, full_name, email, role, phone, created_at)
  VALUES (new_user_id, new_user_name, new_user_email, 'client', NULLIF(new_user_phone, ''), NOW())
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    phone = EXCLUDED.phone;

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
  '🔑 Password: Intore@1234' as login_info
FROM profiles p
WHERE p.email IN ('ali@agccrwanda.com', 'caregiver@agccrwanda.com', 'client@agccrwanda.com')
ORDER BY 
  CASE p.role
    WHEN 'admin' THEN 1
    WHEN 'caregiver' THEN 2
    WHEN 'client' THEN 3
  END;

-- ============================================
-- ✅ SUCCESS! 
-- ============================================
-- All three users have been created with:
-- - Password: Intore@1234
-- - Status: Email confirmed (ready to login)
-- 
-- Login credentials:
-- 1. ali@agccrwanda.com / Intore@1234 (Admin)
-- 2. caregiver@agccrwanda.com / Intore@1234 (Caregiver)
-- 3. client@agccrwanda.com / Intore@1234 (Client)
-- ============================================
