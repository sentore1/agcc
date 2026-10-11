# 🚀 Quick Guide: Add Admin, Caregiver & Client Users

## The Fastest Way (5 minutes)

### Step 1: Edit the SQL Script
1. Open `scripts/create-three-users-quick.sql`
2. Change these values (3 places - one for each user):

```sql
-- For ADMIN (Line ~14-16)
new_user_email VARCHAR := 'admin@example.com';     -- Your admin email
new_user_name VARCHAR := 'Admin User';             -- Admin name
new_user_phone VARCHAR := '+1234567890';           -- Admin phone

-- For CAREGIVER (Line ~46-48)  
new_user_email VARCHAR := 'caregiver@example.com'; -- Your caregiver email
new_user_name VARCHAR := 'Caregiver User';         -- Caregiver name
new_user_phone VARCHAR := '+1234567891';           -- Caregiver phone

-- For CLIENT (Line ~78-80)
new_user_email VARCHAR := 'client@example.com';    -- Your client email
new_user_name VARCHAR := 'Client User';            -- Client name
new_user_phone VARCHAR := '+1234567892';           -- Client phone
```

### Step 2: Run in Supabase
1. Go to your Supabase Dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **+ New Query**
4. Copy the **entire** `create-three-users-quick.sql` file
5. Paste it into the SQL editor
6. Click **RUN** or press `Ctrl+Enter`

### Step 3: Verify Success ✅
You should see:
- ✅ 3 success messages in the Results
- ✅ A table showing all 3 users with their details

### Step 4: Login
All users can now login at: `http://localhost:3000/auth/signin`

**Default Password:** `TempPass123!`

---

## 📋 User Details

| Role | Dashboard Access |
|------|-----------------|
| **Admin** | Full admin panel, user management, all features |
| **Caregiver** | Caregiver dashboard, timesheets, bookings |
| **Client** | Client dashboard, booking services, courses |

---

## 🔄 Alternative Methods

### Method A: Admin UI (If No Rate Limits)
1. Login as admin
2. Go to `/dashboard/admin/users`
3. Click **"+ Add User"**
4. Fill the form
5. Submit

**Note:** May hit rate limits after 3-4 users

### Method B: One User at a Time
Use `scripts/create-user-directly.sql` for single users

### Method C: Bulk Creation Function
Use `scripts/create-multiple-users.sql` to create a reusable function

---

## ❓ Troubleshooting

### "User already exists"
- Change the email address to a unique one
- Or delete the existing user first

### "Could not find 'phone' column"
- Run: `scripts/add-phone-column-to-profiles.sql`

### Can't login after creation
- The script auto-confirms emails, so they should work immediately
- Verify in Supabase: Authentication → Users → Check "Email Confirmed"

### Need to reset password
```sql
-- Run this in Supabase SQL Editor
UPDATE auth.users 
SET encrypted_password = crypt('NewPassword123!', gen_salt('bf'))
WHERE email = 'user@example.com';
```

---

## 🎯 Quick Examples

### Create a Nurse
```sql
-- Change role to 'nurse' in the script
new_user_role := 'nurse';
```

### Create a Student
```sql
-- Change role to 'student' in the script  
new_user_role := 'student';
```

### Available Roles
- `admin` - System administrator
- `caregiver` - Care provider
- `client` - Service client
- `nurse` - Medical staff
- `student` - Academy student
- `trainer` - Course instructor
- `consultant` - Consultant

---

## 📞 Need Help?

Check these docs:
- Full guide: `ADMIN_ADD_USER_SOLUTIONS.md`
- User management: `ADMIN_USER_MANAGEMENT_GUIDE.md`
- Rate limit fix: `FIX_EMAIL_RATE_LIMIT_ERROR.md`

---

**That's it! Your users are ready to go! 🎉**
