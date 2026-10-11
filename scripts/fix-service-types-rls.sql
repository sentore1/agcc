-- Fix RLS Policy for Service Types
-- Allow anonymous (public) users to view active service types
-- This is needed for the homepage form

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "service_types_view_all" ON public.service_types;

-- Create new policy that allows everyone (including anonymous) to view active services
CREATE POLICY "service_types_public_view" ON public.service_types
  FOR SELECT
  USING (is_active = true);

-- Keep admin policy for management
-- (This should already exist, but we're ensuring it's correct)
DROP POLICY IF EXISTS "service_types_admin_all" ON public.service_types;

CREATE POLICY "service_types_admin_all" ON public.service_types
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Verify policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd
FROM pg_policies 
WHERE tablename = 'service_types';

-- Test query (should return results)
SELECT COUNT(*) as active_services FROM public.service_types WHERE is_active = true;
