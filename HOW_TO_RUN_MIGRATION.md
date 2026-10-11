# How to Run the Complete Supabase Migration

## Quick Start

You have **3 options** to run the SQL migration:

---

## Option 1: Using Supabase Dashboard (Recommended - Easiest)

1. **Open your Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Login to your account

2. **Select your project**
   - Project ref: `ejngnogukoschoqtkhkj`
   - Project URL: `https://ejngnogukoschoqtkhkj.supabase.co`

3. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Or go directly to: https://supabase.com/dashboard/project/ejngnogukoschoqtkhkj/sql/new

4. **Paste and Run**
   - Open the file: `supabase-complete-migration.sql`
   - Copy all the content (Ctrl+A, Ctrl+C)
   - Paste it into the SQL Editor
   - Click **"Run"** button (or press Ctrl+Enter)

5. **Wait for completion**
   - The migration will take 30-60 seconds
   - You'll see success messages at the bottom

---

## Option 2: Using Supabase CLI

### Prerequisites
```powershell
# Install Supabase CLI globally
npm install -g supabase
```

### Steps
```powershell
# 1. Navigate to your project directory
cd g:\agcc

# 2. Login to Supabase
supabase login

# 3. Link to your project
supabase link --project-ref ejngnogukoschoqtkhkj

# 4. Run the migration
supabase db reset

# Or run the SQL file directly
psql -h db.ejngnogukoschoqtkhkj.supabase.co -U postgres -d postgres -f supabase-complete-migration.sql
```

---

## Option 3: Using PowerShell with psql

### Prerequisites
- Install PostgreSQL client tools (includes psql)
- Download from: https://www.postgresql.org/download/windows/

### Steps
```powershell
# Navigate to project directory
cd g:\agcc

# Run the migration using psql
# You'll be prompted for the database password (use your Supabase service role key or database password)
psql "postgresql://postgres:[YOUR-DB-PASSWORD]@db.ejngnogukoschoqtkhkj.supabase.co:5432/postgres" -f supabase-complete-migration.sql
```

---

## What This Migration Does

The complete migration file includes:

### ✅ Database Tables (21 tables)
- **User Management**: profiles
- **Care Management**: clients, caregivers, bookings, timesheets, service_types
- **Learning Management**: courses, lessons, resources, course_resources, enrollments, quizzes, course_quizzes, quiz_attempts, course_quiz_attempts, certificates, course_announcements, course_categories
- **Payment System**: payments, system_settings
- **Notifications**: notifications

### ✅ Security Features
- Row Level Security (RLS) policies for all tables
- Helper functions: `is_admin()`, `is_caregiver()`, `is_client()`
- Proper access control for different user roles

### ✅ Storage Buckets
- `course-images` - For course featured images (5MB limit)
- `course-payments` - For payment proof uploads (10MB limit)
- `course-files` - For course resources (20MB limit)

### ✅ Indexes
- Performance indexes on frequently queried columns
- Foreign key indexes for better join performance

### ✅ Default Data
- Course categories (Healthcare, Caregiving, First Aid, etc.)
- Service types (Home Care, Medical Care, etc.)
- Payment settings (bank account, mobile money)

---

## Verification

After running the migration, verify it worked:

### In Supabase Dashboard:
1. Go to **Table Editor** - you should see 21 tables
2. Go to **Database** → **Policies** - you should see RLS policies
3. Go to **Storage** - you should see 3 buckets

### In SQL Editor, run:
```sql
-- Check tables count
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

-- Check policies count
SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public';

-- Check storage buckets
SELECT * FROM storage.buckets;
```

---

## Troubleshooting

### Error: "relation already exists"
- This means some tables already exist
- You can either:
  - Drop existing tables first (⚠️ WARNING: This deletes all data!)
  - Or skip the migration for existing tables

### Error: "permission denied"
- Make sure you're using the correct credentials
- Use the **service_role** key for full access

### Error: "syntax error"
- Make sure you copied the entire SQL file
- Check for any special characters that might have been corrupted

---

## Next Steps After Migration

1. **Create an Admin User**
   - Use the Supabase Dashboard to sign up
   - Then run SQL to promote to admin:
   ```sql
   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE email = 'your-email@example.com';
   ```

2. **Test the Application**
   ```powershell
   npm run dev
   ```

3. **Verify Everything Works**
   - Login to the application
   - Check that all features work
   - Test course creation, enrollment, etc.

---

## File Location
The complete migration SQL file is located at:
```
g:\agcc\supabase-complete-migration.sql
```

---

## Support
If you encounter any issues:
- Check Supabase logs in Dashboard → Logs
- Review the SQL error messages
- Ensure your Supabase project is active and not paused
