# AGCC Setup Checklist

Run these SQL scripts in Supabase SQL Editor in this order:

## ✅ Required Scripts (Run These Now!)

### 1. Service Types Table & Data
**Status:** ✅ DONE (services are loading)

### 2. Caregiver Requests Table
**Status:** ❌ MISSING - Run this now!

**File:** `supabase-caregiver-requests.sql`

**What it does:**
- Creates table to store form submissions from homepage
- Allows anonymous users to submit requests
- Allows admins to view/manage requests

**Run this in Supabase SQL Editor NOW!**

### 3. Fix Service Types RLS Policy
**Status:** ✅ DONE (services showing on homepage)

---

## Current Errors:

### ❌ Error 1: Caregiver Requests Table Missing
```
Could not find the table 'public.caregiver_requests' in the schema cache
```

**Solution:** Run `supabase-caregiver-requests.sql` in Supabase SQL Editor

---

## After Running the Script:

### Test the Homepage Form:
1. Go to homepage: `http://localhost:3000`
2. Fill in the form:
   - Name: Test User
   - Phone: +250 123 456 789
   - Service Type: (select from dropdown)
3. Click "Request a Caregiver"
4. Should see: "✓ Request submitted successfully!"

### Check Admin Dashboard:
1. Login as admin
2. Go to: `/dashboard/admin/caregiver-requests`
3. You should see the submitted request

---

## Quick Run Guide:

### In Supabase SQL Editor:

1. **Create Caregiver Requests Table:**
   - Copy entire content from: `supabase-caregiver-requests.sql`
   - Paste in Supabase SQL Editor
   - Click "Run"
   - Should see: "Success. No rows returned"

2. **Verify Table Exists:**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'caregiver_requests';
   ```
   Should return: `caregiver_requests`

3. **Test Form Again**
   - Homepage form should now work completely!

---

## All Required Tables:

- ✅ `service_types` - Active services (12 services)
- ❌ `caregiver_requests` - Form submissions (NEEDS TO BE CREATED)
- ✅ `profiles` - User profiles
- ✅ `bookings` - Service bookings
- ✅ `courses` - Academy courses
- ✅ Other tables...

---

## Next Steps After Setup:

1. Test homepage form submission
2. Login as admin
3. View requests in admin dashboard
4. Update request status
5. Add notes to requests

---

## Need Help?

If you see errors after running the SQL:
1. Check browser console (F12)
2. Check Supabase logs
3. Verify RLS policies are created
4. Test with `/test-services` page
