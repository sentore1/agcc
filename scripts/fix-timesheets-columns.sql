-- Fix timesheets table column names to match API expectations
-- The main migration created columns: clock_in, clock_out
-- But the API expects: check_in_time, check_out_time, check_in_location, etc.

-- Step 0: Make old columns nullable first (so they don't block new inserts)
ALTER TABLE public.timesheets 
  ALTER COLUMN clock_in DROP NOT NULL,
  ALTER COLUMN date DROP NOT NULL,
  ALTER COLUMN service_type DROP NOT NULL;

-- Step 1: Add new columns if they don't exist
ALTER TABLE public.timesheets 
  ADD COLUMN IF NOT EXISTS check_in_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS check_out_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS check_in_location TEXT,
  ADD COLUMN IF NOT EXISTS check_in_notes TEXT,
  ADD COLUMN IF NOT EXISTS check_out_location TEXT,
  ADD COLUMN IF NOT EXISTS check_out_notes TEXT,
  ADD COLUMN IF NOT EXISTS work_description TEXT,
  ADD COLUMN IF NOT EXISTS tasks_completed JSONB, -- Store as JSONB array
  ADD COLUMN IF NOT EXISTS client_feedback TEXT;

-- Step 2: Migrate existing data from old columns to new columns
UPDATE public.timesheets 
SET 
  check_in_time = clock_in,
  check_out_time = clock_out
WHERE check_in_time IS NULL;

-- Step 3: Set default for check_in_time if not set
ALTER TABLE public.timesheets 
  ALTER COLUMN check_in_time SET DEFAULT NOW();

-- Step 4: Make check_in_time NOT NULL after migration
-- First ensure all records have check_in_time
UPDATE public.timesheets 
SET check_in_time = clock_in
WHERE check_in_time IS NULL AND clock_in IS NOT NULL;

UPDATE public.timesheets 
SET check_in_time = created_at
WHERE check_in_time IS NULL;

ALTER TABLE public.timesheets 
  ALTER COLUMN check_in_time SET NOT NULL;

-- Step 4.5: Make the 'date' column nullable
-- The API doesn't provide a 'date' field, so make it nullable
-- It will be auto-populated by the sync trigger
ALTER TABLE public.timesheets 
  ALTER COLUMN date DROP NOT NULL;

-- Populate existing NULL dates from check_in_time or created_at
UPDATE public.timesheets 
SET date = DATE(check_in_time)
WHERE date IS NULL AND check_in_time IS NOT NULL;

UPDATE public.timesheets 
SET date = DATE(clock_in)
WHERE date IS NULL AND clock_in IS NOT NULL;

UPDATE public.timesheets 
SET date = DATE(created_at)
WHERE date IS NULL;

-- Step 4.6: Handle service_type column
-- The API gets service_type from the booking, but the table requires it
-- Make it nullable or set a default
ALTER TABLE public.timesheets 
  ALTER COLUMN service_type DROP NOT NULL;

-- Optionally populate from related booking if NULL
UPDATE public.timesheets t
SET service_type = b.service_type
FROM public.bookings b
WHERE t.booking_id = b.id 
  AND t.service_type IS NULL;

-- Set a default for any remaining NULL values
UPDATE public.timesheets 
SET service_type = 'General Care'
WHERE service_type IS NULL;

-- Step 4.7: Add triggers to sync old and new columns during transition
-- This ensures that inserts/updates to new columns also update old columns
CREATE OR REPLACE FUNCTION sync_timesheet_columns()
RETURNS TRIGGER AS $$
BEGIN
  -- Sync check_in_time to clock_in
  IF NEW.check_in_time IS NOT NULL THEN
    NEW.clock_in := NEW.check_in_time;
  END IF;
  
  -- Sync check_out_time to clock_out
  IF NEW.check_out_time IS NOT NULL THEN
    NEW.clock_out := NEW.check_out_time;
  END IF;
  
  -- Auto-populate date from check_in_time if not set
  IF NEW.date IS NULL AND NEW.check_in_time IS NOT NULL THEN
    NEW.date := DATE(NEW.check_in_time);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_timesheet_columns ON public.timesheets;
CREATE TRIGGER trigger_sync_timesheet_columns
  BEFORE INSERT OR UPDATE ON public.timesheets
  FOR EACH ROW
  EXECUTE FUNCTION sync_timesheet_columns();

-- Step 4.8: If tasks_completed column already exists as TEXT, convert it to JSONB
-- First check if we need to convert existing data
DO $$
BEGIN
  -- Try to alter the column type
  BEGIN
    ALTER TABLE public.timesheets 
      ALTER COLUMN tasks_completed TYPE JSONB 
      USING CASE 
        WHEN tasks_completed IS NULL THEN NULL
        WHEN tasks_completed::text = '' THEN NULL
        ELSE tasks_completed::jsonb
      END;
  EXCEPTION WHEN OTHERS THEN
    -- Column might already be JSONB or doesn't exist yet
    NULL;
  END;
END $$;

-- Step 5: Update status column to match API expectations
-- API uses: 'checked-in', 'checked-out', 'submitted', 'approved', 'rejected'
-- Current schema uses: 'pending', 'approved', 'rejected'
ALTER TABLE public.timesheets 
  DROP CONSTRAINT IF EXISTS timesheets_status_check;

ALTER TABLE public.timesheets 
  ADD CONSTRAINT timesheets_status_check 
  CHECK (status IN ('checked-in', 'checked-out', 'submitted', 'approved', 'rejected', 'pending'));

-- Step 6: Update total_hours to be calculated correctly
-- Change from NUMERIC(5,2) to allow more precision
ALTER TABLE public.timesheets 
  ALTER COLUMN total_hours TYPE NUMERIC(8,4);

-- Step 7: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_timesheets_check_in_time ON public.timesheets(check_in_time);
CREATE INDEX IF NOT EXISTS idx_timesheets_caregiver_id ON public.timesheets(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_booking_id ON public.timesheets(booking_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_status ON public.timesheets(status);

-- Step 8: Optional - Drop old columns if they exist and data is migrated
-- Uncomment these lines after verifying the migration worked:
-- ALTER TABLE public.timesheets DROP COLUMN IF EXISTS clock_in;
-- ALTER TABLE public.timesheets DROP COLUMN IF EXISTS clock_out;
-- ALTER TABLE public.timesheets DROP COLUMN IF EXISTS date;

COMMENT ON TABLE public.timesheets IS 'Tracks caregiver work hours and job completion';
COMMENT ON COLUMN public.timesheets.check_in_time IS 'When caregiver starts work/arrives at location';
COMMENT ON COLUMN public.timesheets.check_out_time IS 'When caregiver completes work/leaves';
COMMENT ON COLUMN public.timesheets.total_hours IS 'Automatically calculated hours worked';
COMMENT ON COLUMN public.timesheets.status IS 'Workflow status: checked-in, checked-out, submitted, approved, rejected';

-- Summary of changes:
-- 1. Old columns (clock_in, clock_out, date, service_type) are now NULLABLE
-- 2. New columns (check_in_time, check_out_time, etc.) are added
-- 3. A trigger syncs new columns to old columns automatically
-- 4. This allows the API to work while maintaining backward compatibility
-- 5. Once confirmed working, you can drop the old columns
