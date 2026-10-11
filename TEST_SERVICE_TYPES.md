# Testing Service Types

## Step 1: Verify SQL Script Was Run

Open Supabase SQL Editor and run:

```sql
SELECT COUNT(*) as total FROM public.service_types;
```

**Expected result:** Should show 12 services

If it shows 0, you need to run: `scripts/insert-initial-service-types.sql`

## Step 2: Check API Response

Open browser console (F12) and go to homepage. Look for these logs:
- "Loading service types..."
- "Response status: 200"
- "Response data: {data: Array(12)}"
- "Service types loaded: 12"

## Step 3: Verify API Works

Test the API directly:
```
http://localhost:3000/api/service-types
```

Should return:
```json
{
  "data": [
    {
      "id": "...",
      "name": "Child Care",
      "description": "...",
      "icon": "sparkles"
    },
    ...
  ]
}
```

## Common Issues:

### Issue 1: No services in database
**Solution:** Run `scripts/insert-initial-service-types.sql` in Supabase SQL Editor

### Issue 2: API returns error
**Check:**
- Environment variables in `.env.local`
- Supabase connection
- RLS policies on service_types table

### Issue 3: Dropdown shows "Loading..." forever
**Check browser console for errors**

## Quick Fix SQL (Run in Supabase):

```sql
-- Quick check if services exist
SELECT name FROM public.service_types ORDER BY name;

-- If empty, run the insert script OR use this quick insert:
INSERT INTO public.service_types (name, description, icon, is_active)
VALUES
  ('Elderly Care', 'Senior care services', 'user-group', true),
  ('Home Care', 'In-home care services', 'home', true),
  ('Companionship', 'Social support', 'heart', true)
ON CONFLICT (name) DO NOTHING;
```
