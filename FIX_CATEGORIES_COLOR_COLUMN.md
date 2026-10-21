# Fix: Course Categories Color Column Error

## Problem
When trying to add categories at `/dashboard/admin/categories`, you get the error:
```
Could not find the 'color' column of 'course_categories' in the schema cache
```

## Cause
The `course_categories` table in your Supabase database is missing the `color` column that the application code expects.

## Solution

### Step 1: Run the Migration in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (in the left sidebar)
3. Click **New Query**
4. Copy and paste the contents of `add-color-column-migration.sql`
5. Click **Run** to execute the migration

The migration will:
- Add the `color` column to the `course_categories` table with a default value of `#7C3AED` (purple)
- Add the `is_active` column if it's missing
- Update any existing categories to have the default color

### Step 2: Verify the Fix

1. Go back to your application at `https://www.agccr.com/dashboard/admin/categories`
2. Try adding a new category
3. The error should be gone and you should be able to:
   - Add categories with custom colors
   - Edit existing categories
   - See the color badge next to each category

## What Changed

The migration adds these columns to the `course_categories` table:

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `color` | TEXT | `#7C3AED` | Hex color code for visual identification |
| `is_active` | BOOLEAN | `true` | Whether the category is visible in dropdowns |

## Color Presets Available

After the fix, you'll be able to choose from these preset colors or use a custom color picker:

- Purple: `#7C3AED`
- Blue: `#2563EB`
- Green: `#16A34A`
- Red: `#DC2626`
- Orange: `#EA580C`
- Pink: `#DB2777`
- Teal: `#0D9488`
- Indigo: `#4338CA`

## Need Help?

If you encounter any issues:
1. Check that you have admin privileges in Supabase
2. Verify the migration ran successfully (no error messages)
3. Try refreshing your application page
4. Check the browser console for any other errors
