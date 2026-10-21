# Fix All Database Schema Errors

## Problems

You're encountering multiple database schema errors:

1. **Categories Error**: `Could not find the 'color' column of 'course_categories' in the schema cache`
2. **Courses Error**: `Could not find the 'featured_image_url' column of 'courses' in the schema cache`

## Root Cause

Your database schema is missing several columns that the application code expects. This happens when the database was created with an older version of the schema.

## Complete Solution (Run All Migrations)

### Step 1: Fix Course Categories Table

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** (in the left sidebar)
3. Click **New Query**
4. Copy and paste the contents of **`add-color-column-migration.sql`**
5. Click **Run**

This will add:
- `color` column (for visual category identification)
- `is_active` column (for showing/hiding categories)

### Step 2: Fix Courses Table

1. Still in **SQL Editor**, click **New Query** again
2. Copy and paste the contents of **`add-missing-courses-columns.sql`**
3. Click **Run**

This will add:
- `featured_image_url` column (for course cover images)
- `is_free` column (to mark free courses)
- `requires_payment` column (to enforce payment before enrollment)

### Step 3: Add Sample Data (Optional)

If you want sample courses to test with:

1. In **SQL Editor**, click **New Query**
2. Copy and paste the contents of **`scripts/seed-sample-data.sql`**
3. Click **Run**

This will create:
- 6 course categories with colors
- 10 sample courses across different categories

### Step 4: Verify Everything Works

1. Go to `https://www.agccr.com/dashboard/admin/categories`
2. Try **adding a new category** - should work now! ✓
3. Go to `https://www.agccr.com/dashboard/admin/courses`
4. Try **creating a new course** - should work now! ✓

## What Each Migration Does

### Categories Migration (`add-color-column-migration.sql`)

```sql
-- Adds color for visual identification
ALTER TABLE course_categories ADD COLUMN color TEXT DEFAULT '#7C3AED';

-- Adds active/inactive status
ALTER TABLE course_categories ADD COLUMN is_active BOOLEAN DEFAULT true;
```

**Features unlocked:**
- Color-coded category badges
- Custom color picker (8 presets + custom colors)
- Show/hide categories in dropdowns

### Courses Migration (`add-missing-courses-columns.sql`)

```sql
-- Adds featured image URL
ALTER TABLE courses ADD COLUMN featured_image_url TEXT;

-- Adds free/paid course flags
ALTER TABLE courses ADD COLUMN is_free BOOLEAN DEFAULT true;
ALTER TABLE courses ADD COLUMN requires_payment BOOLEAN DEFAULT false;
```

**Features unlocked:**
- Upload course cover images
- Display beautiful course cards with images
- Mark courses as free or paid
- Enforce payment requirements

## Troubleshooting

### "Permission denied" Error

- Make sure you're logged into Supabase with admin/owner privileges
- Check that you're in the correct project

### "Column already exists" Error

- This is fine! It means the column was already added
- The migrations use `ADD COLUMN IF NOT EXISTS` to be safe
- Continue to the next migration

### "Relation does not exist" Error

- Your main schema might not be created yet
- Run the complete migration first: `supabase-complete-migration.sql`
- Then run these fix migrations

### Still Having Issues?

1. Check browser console for detailed error messages
2. Verify migrations ran successfully (no red errors in SQL Editor)
3. Try hard refresh in browser (Ctrl+F5 or Cmd+Shift+R)
4. Check that environment variables in `.env.local` are correct

## Files Reference

| File | Purpose |
|------|---------|
| `add-color-column-migration.sql` | Fixes category colors |
| `add-missing-courses-columns.sql` | Fixes course image and payment columns |
| `scripts/seed-sample-data.sql` | Adds sample categories and courses |
| `supabase-complete-migration.sql` | Complete initial schema (if starting fresh) |

## After Running Migrations

Your platform will have these new capabilities:

### Categories Management
- ✅ Add categories with custom colors
- ✅ Color-coded category badges throughout the site
- ✅ Activate/deactivate categories
- ✅ Reorder categories for display

### Course Management
- ✅ Upload beautiful featured images for courses
- ✅ Create free courses
- ✅ Create paid courses with RWF pricing
- ✅ Rich text course descriptions
- ✅ Add resources (PDFs, videos, documents)
- ✅ Create quizzes with multiple choice questions
- ✅ Publish/unpublish courses
- ✅ Track enrollments and progress

## Next Steps After Fixing

1. **Create Categories**: Add your real course categories with appropriate colors
2. **Create Courses**: Build your course catalog with rich content
3. **Add Lessons**: Break courses into lessons with videos and content
4. **Create Quizzes**: Test learner knowledge with course quizzes
5. **Set Prices**: Configure pricing for paid courses
6. **Publish**: Make courses live for students to enroll

---

**Note**: Always backup your database before running migrations on production data!
