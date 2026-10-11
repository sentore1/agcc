# Profile Auto-Creation Fix Summary

## Issue Identified
When users sign up through the authentication system, a record is created in `auth.users`, but no corresponding record is created in `public.profiles`. This causes the application to fail when trying to load user profiles with error:
```
PGRST116: Cannot coerce the result to a single JSON object
Profile not found for user: <user-id>
```

## Root Cause
The database schema defined the `profiles` table but did not include an automatic trigger to create profile records when new users sign up.

## Solution Implemented

### 1. Database Trigger Function
Created `handle_new_user()` function that automatically inserts a profile record whenever a new user is created in `auth.users`.

**Location in code:**
- `supabase-complete-migration.sql` - Section 4: Helper Functions (updated)
- `scripts/fix-missing-profiles.sql` - Standalone fix script (new)

**What it does:**
- Listens for INSERT operations on `auth.users`
- Automatically creates a matching profile in `public.profiles`
- Extracts data from user metadata (full_name, role) or uses defaults
- Uses `ON CONFLICT DO NOTHING` to prevent duplicate profile creation

### 2. Automatic Trigger
Created database trigger `on_auth_user_created` that fires after each user signup.

### 3. Backfill Script
Created SQL to create profiles for existing users who signed up before the trigger was in place.

### 4. Fallback Logic (Already Existed)
The dashboard page (`app/dashboard/page.tsx`) already had client-side fallback logic to create profiles if missing. However, the database trigger is the preferred solution.

## Files Updated/Created

### Updated:
- ✅ `supabase-complete-migration.sql` - Added trigger function and trigger

### Created:
- ✅ `scripts/fix-missing-profiles.sql` - Standalone fix script with verification
- ✅ `PROFILE_FIX_GUIDE.md` - Step-by-step guide for applying the fix
- ✅ `PROFILE_AUTO_CREATION_SUMMARY.md` - This summary document

## How to Apply the Fix

### For New Deployments:
Run the updated `supabase-complete-migration.sql` file which now includes the trigger.

### For Existing Deployments:
Run `scripts/fix-missing-profiles.sql` in Supabase SQL Editor to:
1. Add the trigger for future signups
2. Create profiles for existing users
3. Verify the fix was successful

## Profile Default Values

When auto-created, profiles use these defaults:

| Field | Source | Default Fallback |
|-------|--------|------------------|
| `id` | `auth.users.id` | Required |
| `email` | `auth.users.email` | Required |
| `full_name` | User metadata → `full_name` | Email address |
| `role` | User metadata → `role` | `'student'` |
| `avatar_url` | NULL | NULL |
| `phone` | NULL | NULL |
| `created_at` | NOW() | Current timestamp |

## Testing Checklist

After applying the fix:

- [ ] Existing users can sign in and access `/dashboard` without errors
- [ ] New user signups automatically create profiles
- [ ] Profile table count matches auth.users count
- [ ] No PGRST116 errors in browser console
- [ ] Users can update their profiles

## Verification Query

Run this in Supabase SQL Editor to check for missing profiles:

```sql
SELECT 
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM public.profiles) as total_profiles,
  (SELECT COUNT(*) FROM auth.users au 
   LEFT JOIN public.profiles p ON au.id = p.id 
   WHERE p.id IS NULL) as missing_profiles;
```

Expected result: `missing_profiles` should be `0`.

## Benefits

✅ **Automatic**: No manual intervention needed for new signups  
✅ **Consistent**: Every user automatically gets a profile  
✅ **Secure**: Uses `SECURITY DEFINER` to bypass RLS during creation  
✅ **Safe**: `ON CONFLICT DO NOTHING` prevents duplicate errors  
✅ **Auditable**: Creates timestamped records for tracking  

## Next Steps

1. Run the fix script in your Supabase dashboard
2. Test with a new user signup
3. Verify existing users can still sign in
4. Remove or keep the client-side fallback logic as desired (recommended to keep as safety net)

## Notes

- The trigger runs with `SECURITY DEFINER` permissions, allowing it to bypass Row Level Security policies
- This is necessary because profile creation happens in auth context, not user context
- The client-side fallback in `dashboard/page.tsx` serves as an additional safety measure
- Default role is set to `'student'` - adjust in trigger if different default is needed
