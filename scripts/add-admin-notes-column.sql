-- ============================================
-- ADD ADMIN_NOTES AND REVIEWED_BY COLUMNS TO TIMESHEETS
-- ============================================
-- This migration adds missing columns to the timesheets table

-- Add admin_notes column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'timesheets' 
    AND column_name = 'admin_notes'
  ) THEN
    ALTER TABLE public.timesheets ADD COLUMN admin_notes TEXT;
    RAISE NOTICE 'Column admin_notes added successfully';
  ELSE
    RAISE NOTICE 'Column admin_notes already exists';
  END IF;
END $$;

-- Add reviewed_by column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'timesheets' 
    AND column_name = 'reviewed_by'
  ) THEN
    ALTER TABLE public.timesheets ADD COLUMN reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
    RAISE NOTICE 'Column reviewed_by added successfully';
  ELSE
    RAISE NOTICE 'Column reviewed_by already exists';
  END IF;
END $$;

-- Add reviewed_at column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'timesheets' 
    AND column_name = 'reviewed_at'
  ) THEN
    ALTER TABLE public.timesheets ADD COLUMN reviewed_at TIMESTAMPTZ;
    RAISE NOTICE 'Column reviewed_at added successfully';
  ELSE
    RAISE NOTICE 'Column reviewed_at already exists';
  END IF;
END $$;

-- Verify the columns exist
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'timesheets'
  AND column_name IN ('admin_notes', 'reviewed_by', 'reviewed_at')
ORDER BY column_name;
