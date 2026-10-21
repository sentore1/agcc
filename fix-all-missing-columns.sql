-- ============================================
-- COMPLETE FIX: Add All Missing Columns
-- Run this ONCE in Supabase SQL Editor
-- ============================================
-- This single script fixes all missing columns for:
-- - course_categories table
-- - courses table
-- ============================================

-- ============================================
-- PART 1: Fix course_categories table
-- ============================================

-- Add color column to course_categories
ALTER TABLE public.course_categories 
ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#7C3AED';

-- Add is_active column to course_categories
ALTER TABLE public.course_categories 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing records to have the default color if they're NULL
UPDATE public.course_categories 
SET color = '#7C3AED' 
WHERE color IS NULL;

-- Add comments
COMMENT ON COLUMN public.course_categories.color IS 'Hex color code for category visual identification (e.g., #7C3AED)';
COMMENT ON COLUMN public.course_categories.is_active IS 'Whether the category is active and visible in dropdowns';

-- ============================================
-- PART 2: Fix courses table
-- ============================================

-- Add featured_image_url column (the code uses this instead of featured_image)
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS featured_image_url TEXT;

-- Migrate data from featured_image to featured_image_url if it exists
UPDATE public.courses 
SET featured_image_url = featured_image 
WHERE featured_image IS NOT NULL AND featured_image_url IS NULL;

-- Add is_free column
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT true;

-- Add requires_payment column
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS requires_payment BOOLEAN DEFAULT false;

-- Update requires_payment based on price
UPDATE public.courses 
SET requires_payment = (COALESCE(price, 0) > 0)
WHERE requires_payment = false;

-- Update is_free based on price
UPDATE public.courses 
SET is_free = (COALESCE(price, 0) = 0)
WHERE is_free = true;

-- Add comments
COMMENT ON COLUMN public.courses.featured_image_url IS 'URL to the featured image for the course (publicly accessible)';
COMMENT ON COLUMN public.courses.is_free IS 'Whether the course is free or requires payment';
COMMENT ON COLUMN public.courses.requires_payment IS 'Whether payment is required before enrollment';

-- ============================================
-- Success Message
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✓ ALL DATABASE FIXES APPLIED SUCCESSFULLY!';
  RAISE NOTICE '========================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Course Categories Table:';
  RAISE NOTICE '  ✓ Added: color column';
  RAISE NOTICE '  ✓ Added: is_active column';
  RAISE NOTICE '';
  RAISE NOTICE 'Courses Table:';
  RAISE NOTICE '  ✓ Added: featured_image_url column';
  RAISE NOTICE '  ✓ Added: is_free column';
  RAISE NOTICE '  ✓ Added: requires_payment column';
  RAISE NOTICE '';
  RAISE NOTICE 'Your application should now work without errors!';
  RAISE NOTICE '';
  RAISE NOTICE 'Test these features:';
  RAISE NOTICE '  1. Create categories at: /dashboard/admin/categories';
  RAISE NOTICE '  2. Create courses at: /dashboard/admin/courses';
  RAISE NOTICE '';
  RAISE NOTICE 'Next: Run scripts/seed-sample-data.sql for sample content';
  RAISE NOTICE '========================================';
END $$;
