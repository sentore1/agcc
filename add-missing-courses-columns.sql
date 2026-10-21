-- ============================================
-- Add missing columns to courses table
-- Run this in Supabase SQL Editor
-- ============================================

-- Add featured_image_url column (the code uses this instead of featured_image)
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS featured_image_url TEXT;

-- Migrate data from featured_image to featured_image_url if it exists
UPDATE public.courses 
SET featured_image_url = featured_image 
WHERE featured_image IS NOT NULL AND featured_image_url IS NULL;

-- Add other potentially missing columns that might be used
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT true;

ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS requires_payment BOOLEAN DEFAULT false;

-- Update requires_payment based on price
UPDATE public.courses 
SET requires_payment = (price > 0)
WHERE requires_payment IS NULL OR requires_payment = false;

-- Add comments to document the columns
COMMENT ON COLUMN public.courses.featured_image_url IS 'URL to the featured image for the course (publicly accessible)';
COMMENT ON COLUMN public.courses.is_free IS 'Whether the course is free or requires payment';
COMMENT ON COLUMN public.courses.requires_payment IS 'Whether payment is required before enrollment';

-- Display success message
DO $$
BEGIN
  RAISE NOTICE '✓ Course table columns updated successfully!';
  RAISE NOTICE '✓ Added: featured_image_url, is_free, requires_payment';
  RAISE NOTICE '';
  RAISE NOTICE 'You can now create courses without errors.';
END $$;
