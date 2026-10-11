-- Verify Service Types
-- Run this in Supabase SQL Editor to check if service types were inserted

-- Count total service types
SELECT 
  COUNT(*) as total_services
FROM public.service_types;

-- Show all service types
SELECT 
  id,
  name,
  LEFT(description, 50) || '...' as short_description,
  icon,
  is_active,
  created_at
FROM public.service_types
ORDER BY name;

-- Count active vs inactive
SELECT 
  is_active,
  COUNT(*) as count
FROM public.service_types
GROUP BY is_active;
