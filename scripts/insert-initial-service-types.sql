-- Insert Initial Service Types for AGCR
-- All Generations Care and Companionship Rwanda
-- Run this script in Supabase SQL Editor to populate service types

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE public.service_types RESTART IDENTITY CASCADE;

-- Insert service types based on AGCR services
-- Columns: name, description, icon, is_active
INSERT INTO public.service_types (name, description, icon, is_active)
VALUES
  (
    'Elderly Care',
    'Specialized support for seniors in retirement homes or at home, including medical monitoring, daily assistance, and companionship tailored to their medical conditions.',
    'user-group',
    true
  ),
  (
    'Home Care',
    'Professional in-home care services including personal care, meal preparation, medication management, and household support based on patient medical condition.',
    'home',
    true
  ),
  (
    'Companionship',
    'Emotional support and social interaction to combat loneliness, with engaging activities, conversations, and meaningful connections for all ages.',
    'heart',
    true
  ),
  (
    'Child Care',
    'Qualified care for children requiring special support, ensuring safety, development, and appropriate medical attention based on their needs.',
    'sparkles',
    true
  ),
  (
    'Personal Assistance',
    'Daily assistance with personal care, mobility, hygiene, dressing, and other essential activities of daily living.',
    'briefcase',
    true
  ),
  (
    'Post Hospital Recovery',
    'Specialized post-surgical and recovery care at home or in hospital, with medical monitoring and rehabilitation support.',
    'medical',
    true
  ),
  (
    'Home Support Activities',
    'Assistance with household tasks, light housekeeping, meal preparation, and creating a comfortable living environment.',
    'home',
    true
  ),
  (
    'Hospital Care Support',
    'Professional caregiving support for patients in hospital settings, providing comfort, monitoring, and family liaison.',
    'medical',
    true
  ),
  (
    'Family Support',
    'Comprehensive care services for entire families, including respite care for family caregivers and multi-generational support.',
    'user-group',
    true
  ),
  (
    'Medical Condition Management',
    'Specialized care tailored to specific medical conditions including chronic diseases, disabilities, and special medical needs.',
    'medical',
    true
  ),
  (
    'Retirement Home Care',
    'Professional caregiving services in retirement homes and care centers, ensuring quality of life and dignity for residents.',
    'home',
    true
  ),
  (
    'Respite Care',
    'Temporary relief care for family caregivers, providing professional support while you take a break.',
    'clock',
    true
  )
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  is_active = EXCLUDED.is_active;

-- Verify insertion
SELECT 
  id,
  name,
  description,
  icon,
  is_active,
  created_at
FROM public.service_types
ORDER BY name;

-- Summary
SELECT 
  COUNT(*) as total_services,
  COUNT(*) FILTER (WHERE is_active = true) as active_services,
  COUNT(*) FILTER (WHERE is_active = false) as inactive_services
FROM public.service_types;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✓ Successfully inserted % service types for AGCR!', (SELECT COUNT(*) FROM public.service_types);
  RAISE NOTICE '✓ Services available at home and in hospital';
  RAISE NOTICE '✓ Professional care for all generations';
END $$;
