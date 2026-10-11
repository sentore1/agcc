# Fix tasks_completed.map Error

## Error
```
TypeError: timesheet.tasks_completed.map is not a function
```

## Root Cause
The `tasks_completed` column is TEXT in the database, but the frontend code expects it to be an array.

## Solution Applied

### 1. Frontend Fix (Immediate)
**File**: `app/dashboard/caregiver/timesheets/page.tsx`

Added a helper function to safely parse tasks:
```typescript
const parseTasksCompleted = (tasks: string[] | string | null): string[] => {
  if (!tasks) return [];
  if (Array.isArray(tasks)) return tasks;
  
  // If it's a string, try to parse as JSON
  if (typeof tasks === 'string') {
    try {
      const parsed = JSON.parse(tasks);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // If not JSON, treat as comma-separated or single task
      return tasks.includes(',') ? tasks.split(',').map(t => t.trim()) : [tasks];
    }
  }
  
  return [];
};
```

Now handles:
- ✅ `null` or `undefined` → empty array
- ✅ Array → returns as-is
- ✅ JSON string `'["task1","task2"]'` → parsed array
- ✅ Comma-separated `'task1, task2'` → split into array
- ✅ Single task string `'task1'` → single-item array

### 2. Database Fix (Migration)
**File**: `scripts/fix-timesheets-columns.sql`

Updated to:
```sql
-- Create column as JSONB (proper array storage)
ADD COLUMN IF NOT EXISTS tasks_completed JSONB

-- Convert existing TEXT data to JSONB
ALTER TABLE public.timesheets 
  ALTER COLUMN tasks_completed TYPE JSONB 
  USING tasks_completed::jsonb;
```

## How Data Should Be Stored

### Current (Broken)
```sql
tasks_completed: TEXT
-- Stores: 'task1,task2' or '["task1","task2"]'
-- Problem: Inconsistent format, not queryable
```

### Fixed (Proper)
```sql
tasks_completed: JSONB
-- Stores: ["task1", "task2", "task3"]
-- Benefits: 
--   - Consistent format
--   - Queryable with JSON operators
--   - Type-safe in API
```

## API Changes Needed

The API route (`app/api/timesheets/route.ts`) already sends tasks as an array:
```typescript
tasks_completed: ["Task 1", "Task 2"]  // ✅ Correct
```

With JSONB column, this will be stored properly.

## Testing

### Before Fix ❌
```
1. Check in
2. Check out with tasks
3. ERROR: tasks_completed.map is not a function
```

### After Fix ✅
```
1. Check in
2. Check out with tasks: ["Fed patient", "Cleaned room"]
3. Tasks display correctly ✅
4. Stored as JSONB: ["Fed patient", "Cleaned room"] ✅
```

## Migration Already Applied?

If you've already run the migration with TEXT type, you need to:

### Option 1: Rerun the Updated Migration
```sql
-- Run the updated scripts/fix-timesheets-columns.sql
-- It now includes the JSONB conversion
```

### Option 2: Quick Fix for Existing Column
```sql
-- If tasks_completed already exists as TEXT, convert it:
ALTER TABLE public.timesheets 
  ALTER COLUMN tasks_completed TYPE JSONB 
  USING CASE 
    WHEN tasks_completed IS NULL THEN NULL
    WHEN tasks_completed::text = '' THEN NULL
    WHEN tasks_completed::text LIKE '[%' THEN tasks_completed::jsonb
    ELSE to_jsonb(string_to_array(tasks_completed, ','))
  END;
```

## Verification

After applying the fix:

```sql
-- Check column type
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'timesheets' 
  AND column_name = 'tasks_completed';

-- Expected: jsonb
```

## Result

The error is now fixed:
- ✅ Frontend handles all formats gracefully
- ✅ Database stores tasks as proper JSONB array
- ✅ API works correctly
- ✅ No more `.map is not a function` errors
