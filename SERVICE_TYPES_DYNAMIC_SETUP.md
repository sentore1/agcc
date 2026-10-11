# Dynamic Service Types System

## Overview
The homepage caregiver request form now dynamically loads service types from the database, which can be managed by admins.

## How It Works

### 1. **Admin Manages Service Types**
Location: `/dashboard/admin/services`

Admins can:
- ✅ Add new service types
- ✅ Edit existing services
- ✅ Enable/disable services
- ✅ Set pricing per hour
- ✅ Change display order
- ✅ Add descriptions and icons

### 2. **API Endpoint**
Location: `/api/service-types`

- Returns only **active** service types
- Ordered by `display_order`
- Includes: name, description, icon, price_per_hour

### 3. **Homepage Form**
Location: Homepage (`app/page.tsx`)

- Automatically fetches active service types on page load
- Shows loading state while fetching
- Displays service names with prices (if set)
- Shows error message if no services available

### 4. **Database Table**
Table: `service_types`

Columns:
- `id` - Unique identifier
- `name` - Service name
- `description` - Service description
- `icon` - Icon identifier
- `price_per_hour` - Price (optional)
- `is_active` - Active status (boolean)
- `display_order` - Sort order (integer)
- `created_at`, `updated_at` - Timestamps

## Setup Instructions

### Step 1: Ensure Service Types Table Exists
The table should already exist from your migration. If not, check:
- `supabase-complete-migration.sql` (line 61)
- `scripts/create-service-types-table.sql`

### Step 2: Add Initial Service Types
Run this in Supabase SQL editor:

```sql
INSERT INTO public.service_types (name, description, icon, price_per_hour, is_active, display_order)
VALUES
  ('Elderly Care', 'Specialized care for seniors with medical monitoring', 'user-group', 5000, true, 1),
  ('Home Care', 'Professional in-home support and assistance', 'home', 4000, true, 2),
  ('Companionship', 'Emotional support and social interaction', 'heart', 3000, true, 3),
  ('Child Care', 'Qualified care for children with special needs', 'sparkles', 4500, true, 4),
  ('Personal Assistance', 'Help with daily tasks and errands', 'briefcase', 3500, true, 5),
  ('Post Hospital Recovery', 'Specialized post-surgical care', 'medical', 6000, true, 6);
```

### Step 3: Test the System

1. **As Admin:**
   - Go to `/dashboard/admin/services`
   - Add/edit/disable service types
   
2. **As User:**
   - Visit the homepage
   - Scroll to "Request a Caregiver" form
   - Service dropdown should show active services

3. **Submit a Request:**
   - Fill the form and submit
   - Admin can view requests at `/dashboard/admin/caregiver-requests`

## Benefits

✅ **No Code Changes Needed** - Admins can update services without developer involvement
✅ **Real-time Updates** - Changes appear immediately on the homepage
✅ **Flexible Pricing** - Each service can have its own price
✅ **Easy Management** - Simple UI for adding/editing services
✅ **Scalable** - Add unlimited services as your business grows

## Files Changed

1. `app/api/service-types/route.ts` - API endpoint
2. `app/page.tsx` - Homepage form with dynamic loading
3. `app/dashboard/admin/services/page.tsx` - Already existed (service management)

## Future Enhancements

Consider adding:
- Service categories/grouping
- Service images
- Service requirements/qualifications
- Service availability schedules
- Multi-language support for service names
