# Profile Fix Guide

## Problem
Users signing up don't automatically get a profile record created in the `profiles` table, causing the error:
```
PGRST116: Cannot coerce the result to a single JSON object
The result contains 0 rows
```

## Solution

### Option 1: Run the Fix Script (Recommended)

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Open the file `scripts/fix-missing-profiles.sql`
4. Copy and paste its contents into the SQL Editor
5. Click **RUN**

This will:
- ✅ Create a trigger that automatically creates profiles for new signups
- ✅ Create profiles for all existing users who are missing them
- ✅ Show you a summary of the fix

### Option 2: Update Your Complete Migration

If you haven't run your migration yet, the trigger is already included in `supabase-complete-migration.sql`. Just run that entire file.

### Option 3: Manual Profile Creation (Dashboard Fallback)

The dashboard (`app/dashboard/page.tsx`) already has fallback logic that will attempt to create a profile if one is missing. However, it's better to use the automatic trigger approach above.

## How It Works

### The Trigger Function
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### The Trigger
```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

This ensures that whenever a new user signs up in `auth.users`, a corresponding profile is automatically created in `public.profiles`.

## Verification

After running the fix script, you should see output like:
```
Total users in auth.users: 5
Total profiles created: 5
Missing profiles: 0
✓ All users have profiles!
```

## Testing

1. Try signing up a new user
2. Check that they can access `/dashboard` without errors
3. Verify their profile exists in the `profiles` table

## Default Profile Values

When a profile is auto-created:
- **email**: Taken from `auth.users.email`
- **full_name**: Taken from signup metadata or defaults to email
- **role**: Taken from signup metadata or defaults to `'student'`
- **avatar_url**: NULL (can be updated later)
- **phone**: NULL (can be updated later)

## Troubleshooting

### Still getting "Profile not found" errors?

1. Check if the trigger exists:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

2. Check if the function exists:
```sql
SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
```

3. Manually check for missing profiles:
```sql
SELECT au.id, au.email
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;
```

### Need to change default role?

Edit the trigger function and change `'student'` to your preferred default role:
```sql
COALESCE(NEW.raw_user_meta_data->>'role', 'client')  -- or 'caregiver', etc.
```

## Related Files

- `supabase-complete-migration.sql` - Complete database setup with trigger included
- `scripts/fix-missing-profiles.sql` - Standalone fix script
- `app/dashboard/page.tsx` - Dashboard with fallback profile creation
