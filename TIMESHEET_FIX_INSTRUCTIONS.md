# Timesheet Fix Instructions

## Issues Fixed

1. **Missing `admin_notes` column error** - Fixed by running SQL migration
2. **PDF Download not working** - Fixed by updating jsPDF package and code

## Steps to Apply Fixes

### 1. Install Updated Dependencies

Run this command in your terminal:

```bash
npm install
```

This will install the correct version of jsPDF (2.5.2 instead of 4.2.1).

### 2. Add Missing Database Columns

You need to run the SQL migration to add the missing columns to your `timesheets` table.

**Option A: Using Supabase Dashboard**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `scripts/add-admin-notes-column.sql`
5. Click **Run** to execute the migration

**Option B: Using Supabase CLI** (if installed)

```bash
supabase db execute --file scripts/add-admin-notes-column.sql
```

### 3. Verify the Fix

After completing the above steps:

1. **Test the admin notes:** 
   - Go to Admin Dashboard → Timesheets
   - Click on a submitted timesheet
   - Try to approve or reject it with notes
   - Should work without errors now

2. **Test PDF download:**
   - Click on any timesheet to open the details modal
   - Click the "Download PDF" button at the top right
   - A PDF file should download with the timesheet details

## What Changed

### Database Schema
- Added `admin_notes` column (TEXT) - for admin review comments
- Added `reviewed_by` column (UUID) - tracks which admin reviewed
- Added `reviewed_at` column (TIMESTAMPTZ) - tracks when review happened

### Code Changes
- Updated `package.json` to use correct jsPDF version (2.5.2)
- Improved PDF download function with better error handling
- Added proper PDF configuration for jsPDF 2.x API

## Troubleshooting

### If you still get "admin_notes column not found":
- Make sure you ran the SQL migration in step 2
- Verify the columns exist by running this query in Supabase SQL Editor:
  ```sql
  SELECT column_name FROM information_schema.columns 
  WHERE table_name = 'timesheets' AND column_name IN ('admin_notes', 'reviewed_by', 'reviewed_at');
  ```

### If PDF download still doesn't work:
- Clear your browser cache and reload
- Check browser console for errors
- Make sure `npm install` completed successfully
- Try restarting your development server
