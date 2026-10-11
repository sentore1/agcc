-- Fix RLS Policy for Caregiver Requests
-- Allow anonymous users to submit requests from homepage form

-- First, let's check current policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd
FROM pg_policies 
WHERE tablename = 'caregiver_requests';

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can submit caregiver request" ON public.caregiver_requests;
DROP POLICY IF EXISTS "Admins can view all caregiver requests" ON public.caregiver_requests;
DROP POLICY IF EXISTS "Admins can update caregiver requests" ON public.caregiver_requests;
DROP POLICY IF EXISTS "Admins can delete caregiver requests" ON public.caregiver_requests;
DROP POLICY IF EXISTS "allow_anonymous_insert" ON public.caregiver_requests;

-- Policy 1: Allow ANYONE (including anonymous) to insert
CREATE POLICY "caregiver_requests_insert_anonymous"
  ON public.caregiver_requests
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Only admins can view all requests
CREATE POLICY "caregiver_requests_select_admin"
  ON public.caregiver_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy 3: Only admins can update requests
CREATE POLICY "caregiver_requests_update_admin"
  ON public.caregiver_requests
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy 4: Only admins can delete requests
CREATE POLICY "caregiver_requests_delete_admin"
  ON public.caregiver_requests
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Verify the policies were created correctly
SELECT 
  policyname, 
  roles, 
  cmd,
  permissive
FROM pg_policies 
WHERE tablename = 'caregiver_requests'
ORDER BY policyname;

-- Test that anonymous insert works (you can comment this out after testing)
-- This simulates what happens when a visitor submits the form
-- DELETE FROM public.caregiver_requests WHERE full_name = 'Test Anonymous User';
-- INSERT INTO public.caregiver_requests (full_name, phone, service_type)
-- VALUES ('Test Anonymous User', '+250999999999', 'Elderly Care');
