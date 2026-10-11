# Timesheets Column Mismatch Fix

## Problem
The timesheets table was created with columns `clock_in` and `clock_out`, but the API routes expect `check_in_time` and `check_out_time`. Additionally, the table has required columns (`date`, `service_type`) that the API doesn't populate. This causes errors:
```
column timesheets.check_in_time does not exist
null value in column "date" of relation "timesheets" violates not-null constraint
```

## Root Cause
Two different schemas were used:
1. **Main migration** (`supabase-complete-migration.sql`): Uses `clock_in`, `clock_out`, `date`
2. **API routes** (`app/api/timesheets/route.ts`): Expects `check_in_time`, `check_out_time`, plus additional columns like `check_in_location`, `check_in_notes`, etc.

## Solution
Run the migration script to add the missing columns and migrate existing data.

## Steps to Fix

### 1. Run the Migration
In Supabase SQL Editor, run:
```bash
scripts/fix-timesheets-columns.sql
```

This will:
- Add all missing columns (`check_in_time`, `check_out_time`, `check_in_location`, etc.)
- Migrate existing data from `clock_in` → `check_in_time` and `clock_out` → `check_out_time`
- **Fix the `date` column**: Make it auto-populate from `check_in_time` using a trigger
- **Fix the `service_type` column**: Make it nullable (API gets it from bookings)
- Update status constraint to include new statuses: `checked-in`, `checked-out`, `submitted`
- Create necessary indexes for performance
- Preserve existing data (old columns are NOT dropped by default)

### 2. Verify the Fix
After running the migration, test:
```sql
-- Check the updated table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'timesheets'
ORDER BY ordinal_position;

-- Verify data migration
SELECT 
  id,
  clock_in,
  check_in_time,
  clock_out,
  check_out_time,
  status
FROM timesheets
LIMIT 5;
```

### 3. Test the Application
1. Navigate to `/dashboard/caregiver/timesheets`
2. The error should be gone
3. Try checking in/out as a caregiver

### 4. Clean Up (Optional)
After confirming everything works, you can optionally drop the old columns by uncommenting and running these lines from the migration:
```sql
ALTER TABLE public.timesheets DROP COLUMN IF EXISTS clock_in;
ALTER TABLE public.timesheets DROP COLUMN IF EXISTS clock_out;
ALTER TABLE public.timesheets DROP COLUMN IF EXISTS date;
```

## Updated Schema
After this fix, the timesheets table will have:

### Core Columns
- `id` - UUID primary key
- `caregiver_id` - References caregivers table
- `client_id` - References clients table (nullable)
- `booking_id` - References bookings table (nullable)
- `date` - Date of the timesheet (auto-populated from check_in_time via trigger)

### Time Tracking
- `check_in_time` - When caregiver starts work (NOT NULL)
- `check_out_time` - When caregiver finishes work
- `total_hours` - Calculated work duration

### Location & Notes
- `check_in_location` - Where caregiver checked in
- `check_in_notes` - Notes at check-in
- `check_out_location` - Where caregiver checked out
- `check_out_notes` - Notes at check-out

### Work Details
- `work_description` - Description of work performed
- `tasks_completed` - Tasks completed during shift
- `client_feedback` - Feedback from client

### Status & Metadata
- `status` - checked-in | checked-out | submitted | approved | rejected | pending
- `service_type` - Type of service provided (nullable, can be populated from booking)
- `notes` - General notes
- `created_at` - Record creation time
- `updated_at` - Last update time

## Status Workflow
1. **checked-in** - Caregiver has clocked in
2. **checked-out** - Caregiver has clocked out (auto-calculated hours)
3. **submitted** - Timesheet submitted for approval
4. **approved** - Admin approved the timesheet
5. **rejected** - Admin rejected the timesheet
6. **pending** - Legacy status from old schema

## Notes
- The old columns (`clock_in`, `clock_out`, `date`) are preserved until you manually drop them
- All existing timesheet data is migrated to the new columns
- **The `date` column will auto-populate** from `check_in_time` via a database trigger
- **The `service_type` column is now nullable** since the API gets it from the related booking
- The API will now work correctly with the updated schema
