-- TEMPORARY: Disable RLS on caregiver_requests to allow testing
-- This is for testing only. Re-enable with proper policies later.

-- Check current RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'caregiver_requests';

-- Disable RLS (temporary for testing)
ALTER TABLE public.caregiver_requests DISABLE ROW LEVEL SECURITY;

-- Verify it's disabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'caregiver_requests';

-- Now test insert
-- This should work now
INSERT INTO public.caregiver_requests (full_name, phone, service_type)
VALUES ('Test User', '+250123456789', 'Home Care')
RETURNING *;

-- Check the data
SELECT * FROM public.caregiver_requests ORDER BY created_at DESC LIMIT 5;
