-- ============================================
-- Add color column to course_categories table
-- Run this in Supabase SQL Editor
-- ============================================

-- Add color column to course_categories
ALTER TABLE public.course_categories 
ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#7C3AED';

-- Add is_active column if it doesn't exist (for completeness)
ALTER TABLE public.course_categories 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update existing records to have the default color if they're NULL
UPDATE public.course_categories 
SET color = '#7C3AED' 
WHERE color IS NULL;

-- Add comment to document the column
COMMENT ON COLUMN public.course_categories.color IS 'Hex color code for category visual identification (e.g., #7C3AED)';
COMMENT ON COLUMN public.course_categories.is_active IS 'Whether the category is active and visible in dropdowns';
