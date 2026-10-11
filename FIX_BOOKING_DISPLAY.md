# Fix Booking Display in Timesheets

## Problem
The booking dropdown shows malformed data like:
```
1408:00 - 79548c95-c3b1-4d64-90a6-51a55edfb154 (Admin User)
```

Instead of:
```
2:08 PM - Home Care (Admin User)
```

## Root Causes

### 1. Malformed Time Data
- Times are stored incorrectly (e.g., `1408:00` instead of `14:08:00`)
- This breaks time formatting

### 2. UUID in Service Type Field
- The `bookings.service_type` column contains UUID values instead of service type names
- Should contain names like "Home Care", "Personal Care", etc.
- Or should be renamed to `service_type_id` and properly reference the `service_types` table

## Solutions Implemented

### Frontend Fix (Applied)
Updated `components/TimesheetForm.tsx` to:

1. **Format time display properly**
   - Converts `1408:00` → `2:08 PM`
   - Handles malformed time strings gracefully

2. **Resolve service type names**
   - Detects when service_type contains a UUID
   - Fetches the actual name from service_types table
   - Displays clean, user-friendly text

3. **Improved error handling**
   - Falls back to "Service" if name can't be resolved
   - Shows "Unknown Client" if client data is missing

### Database Fix (Optional)

If you want to fix the root cause in the database, run this migration:

```sql
-- Fix bookings table to properly reference service_types

-- Step 1: Add a new service_type_id column
ALTER TABLE public.bookings 
  ADD COLUMN IF NOT EXISTS service_type_id UUID REFERENCES public.service_types(id);

-- Step 2: Migrate existing UUID data from service_type to service_type_id
UPDATE public.bookings
SET service_type_id = service_type::uuid
WHERE service_type ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- Step 3: Update service_type to contain actual names
UPDATE public.bookings b
SET service_type = st.name
FROM public.service_types st
WHERE b.service_type_id = st.id;

-- Step 4: For any remaining NULL or invalid service_types, set a default
UPDATE public.bookings
SET service_type = 'General Care'
WHERE service_type IS NULL 
   OR service_type = ''
   OR service_type ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

-- Step 5: Fix time format if needed (PostgreSQL TIME type should handle this automatically)
-- If you have malformed time data, you might need to investigate individual records

-- Verify the changes
SELECT 
  id,
  service_type,
  service_type_id,
  scheduled_time,
  scheduled_date
FROM bookings
LIMIT 10;
```

## How Data Should Be Structured

### Current Schema (Suboptimal)
```
bookings:
  - service_type: TEXT (contains either UUIDs or names inconsistently)
```

### Recommended Schema
```
bookings:
  - service_type: TEXT (always contains the display name)
  - service_type_id: UUID (optional, references service_types.id for relational integrity)
```

## Testing

After applying the frontend fix:

1. Navigate to `/dashboard/caregiver/timesheets`
2. Look at the booking dropdown
3. Should now show clean, formatted bookings like:
   - `2:08 PM - Home Care (John Doe)`
   - `10:30 AM - Personal Care (Jane Smith)`

## Future Improvements

Consider migrating to a proper foreign key structure:

1. **Change bookings.service_type to service_type_id**
   ```sql
   ALTER TABLE bookings 
     DROP COLUMN service_type,
     RENAME COLUMN service_type_id TO service_type_id;
   ```

2. **Update all queries to join with service_types**
   ```typescript
   const { data } = await supabase
     .from('bookings')
     .select(`
       *,
       service_types:service_type_id (
         id,
         name,
         description
       )
     `);
   ```

3. **Update forms to select from service_types table**

This would ensure data consistency and prevent UUIDs from being displayed to users.
