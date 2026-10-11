-- ============================================
-- COMPLETE SUPABASE MIGRATION
-- Combined SQL for AGCC Platform
-- Generated: 2026-10-10
-- ============================================
-- This file contains all necessary database setup
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- SECTION 1: EXTENSIONS AND BASE SETUP
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SECTION 2: CORE TABLES
-- ============================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'trainer', 'student', 'caregiver', 'nurse', 'consultant', 'client')),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Division A: Care Management

-- Clients table
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  emergency_contact TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Caregivers table
CREATE TABLE IF NOT EXISTS public.caregivers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  specialization TEXT,
  availability JSONB DEFAULT '[]',
  rating NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service types table
CREATE TABLE IF NOT EXISTS public.service_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  base_price NUMERIC(10,2),
  duration_minutes INTEGER,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  caregiver_id UUID REFERENCES public.caregivers(id) ON DELETE SET NULL,
  service_type TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in-progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timesheet system
CREATE TABLE IF NOT EXISTS public.timesheets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  caregiver_id UUID REFERENCES public.caregivers(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  clock_in TIMESTAMP WITH TIME ZONE NOT NULL,
  clock_out TIMESTAMP WITH TIME ZONE,
  total_hours NUMERIC(5,2),
  service_type TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Division B: Learning Management System (LMS)

-- Course categories
CREATE TABLE IF NOT EXISTS public.course_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  introduction TEXT,
  category TEXT NOT NULL,
  category_id UUID REFERENCES public.course_categories(id) ON DELETE SET NULL,
  instructor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  thumbnail TEXT,
  featured_image TEXT,
  duration_hours INTEGER,
  price NUMERIC(10,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  youtube_url TEXT,
  prerequisites TEXT,
  learning_outcomes TEXT[],
  certificate_title TEXT,
  certificate_subtitle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table (downloadable materials)
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course resources table (course-level resources)
CREATE TABLE IF NOT EXISTS public.course_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('pdf', 'video', 'link', 'document', 'other')),
  resource_url TEXT NOT NULL,
  file_size INTEGER,
  is_downloadable BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'dropped')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  payment_proof_url TEXT,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Quizzes table (lesson-level)
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  questions JSONB NOT NULL,
  passing_score INTEGER DEFAULT 70,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course quizzes table (course-level)
CREATE TABLE IF NOT EXISTS public.course_quizzes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL DEFAULT '[]',
  passing_score INTEGER DEFAULT 70 CHECK (passing_score >= 0 AND passing_score <= 100),
  time_limit_minutes INTEGER,
  max_attempts INTEGER DEFAULT 3,
  is_required BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz attempts table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course quiz attempts table
CREATE TABLE IF NOT EXISTS public.course_quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES public.course_quizzes(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '[]',
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  passed BOOLEAN NOT NULL,
  time_taken_minutes INTEGER,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  certificate_url TEXT,
  UNIQUE(user_id, course_id)
);

-- Course announcements
CREATE TABLE IF NOT EXISTS public.course_announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Division C: Payment System

-- System settings for payment
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_type TEXT NOT NULL CHECK (payment_type IN ('booking', 'course')),
  reference_id UUID NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT CHECK (payment_method IN ('momo', 'bank', 'card', 'cash')),
  momo_code TEXT,
  payment_proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SECTION 3: INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_bookings_client ON public.bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_caregiver ON public.bookings(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(is_published);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_lesson ON public.quizzes(lesson_id);
CREATE INDEX IF NOT EXISTS idx_course_resources_course_id ON public.course_resources(course_id);
CREATE INDEX IF NOT EXISTS idx_course_quizzes_course_id ON public.course_quizzes(course_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_timesheets_caregiver ON public.timesheets(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_client ON public.timesheets(client_id);

-- ============================================
-- SECTION 4: HELPER FUNCTIONS
-- ============================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create helper function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin',
    FALSE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create helper function to check if user is caregiver
CREATE OR REPLACE FUNCTION public.is_caregiver()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'caregiver',
    FALSE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create helper function to check if user is client
CREATE OR REPLACE FUNCTION public.is_client()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN COALESCE(
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'client',
    FALSE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to timesheets
DROP TRIGGER IF EXISTS update_timesheets_updated_at ON public.timesheets;
CREATE TRIGGER update_timesheets_updated_at
  BEFORE UPDATE ON public.timesheets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Apply trigger to system_settings
DROP TRIGGER IF EXISTS update_system_settings_updated_at ON public.system_settings;
CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON public.system_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- SECTION 5: ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SECTION 6: ROW LEVEL SECURITY POLICIES
-- ============================================

-- Drop all existing policies to start clean
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT schemaname, tablename, policyname 
              FROM pg_policies 
              WHERE schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
                      r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- ============================================
-- Profiles Policies
-- ============================================

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Clients Policies
-- ============================================

CREATE POLICY "clients_admin_all" ON public.clients
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "clients_caregiver_view" ON public.clients
  FOR SELECT
  TO authenticated
  USING (public.is_caregiver());

CREATE POLICY "clients_select_own" ON public.clients
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "clients_insert_own" ON public.clients
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "clients_update_own" ON public.clients
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================
-- Caregivers Policies
-- ============================================

CREATE POLICY "caregivers_admin_all" ON public.caregivers
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "caregivers_view_all" ON public.caregivers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "caregivers_insert_own" ON public.caregivers
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "caregivers_update_own" ON public.caregivers
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================
-- Service Types Policies
-- ============================================

CREATE POLICY "service_types_view_all" ON public.service_types
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "service_types_admin_all" ON public.service_types
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Bookings Policies
-- ============================================

CREATE POLICY "bookings_admin_all" ON public.bookings
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "bookings_caregiver_view" ON public.bookings
  FOR SELECT
  TO authenticated
  USING (
    caregiver_id IN (SELECT id FROM public.caregivers WHERE user_id = auth.uid())
  );

CREATE POLICY "bookings_client_view" ON public.bookings
  FOR SELECT
  TO authenticated
  USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

CREATE POLICY "bookings_client_create" ON public.bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

CREATE POLICY "bookings_update" ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (
    public.is_admin()
    OR client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
    OR caregiver_id IN (SELECT id FROM public.caregivers WHERE user_id = auth.uid())
  );

-- ============================================
-- Timesheets Policies
-- ============================================

CREATE POLICY "timesheets_admin_all" ON public.timesheets
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "timesheets_caregiver_all" ON public.timesheets
  FOR ALL
  TO authenticated
  USING (
    caregiver_id IN (SELECT id FROM public.caregivers WHERE user_id = auth.uid())
  )
  WITH CHECK (
    caregiver_id IN (SELECT id FROM public.caregivers WHERE user_id = auth.uid())
  );

CREATE POLICY "timesheets_client_view" ON public.timesheets
  FOR SELECT
  TO authenticated
  USING (
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
  );

-- ============================================
-- Course Categories Policies
-- ============================================

CREATE POLICY "course_categories_view_all" ON public.course_categories
  FOR SELECT
  USING (true);

CREATE POLICY "course_categories_admin_all" ON public.course_categories
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Courses Policies
-- ============================================

CREATE POLICY "courses_view_published" ON public.courses
  FOR SELECT
  USING (is_published = true OR public.is_admin() OR instructor_id = auth.uid());

CREATE POLICY "courses_admin_all" ON public.courses
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "courses_instructor_manage" ON public.courses
  FOR ALL
  TO authenticated
  USING (instructor_id = auth.uid())
  WITH CHECK (instructor_id = auth.uid());

-- ============================================
-- Lessons Policies
-- ============================================

CREATE POLICY "lessons_view_published" ON public.lessons
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = lessons.course_id 
      AND (courses.is_published = true OR public.is_admin() OR courses.instructor_id = auth.uid())
    )
  );

CREATE POLICY "lessons_admin_all" ON public.lessons
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "lessons_instructor_manage" ON public.lessons
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = lessons.course_id 
      AND courses.instructor_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = lessons.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- ============================================
-- Resources Policies
-- ============================================

CREATE POLICY "resources_view_enrolled" ON public.resources
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.lessons
      JOIN public.courses ON courses.id = lessons.course_id
      WHERE lessons.id = resources.lesson_id
      AND (
        courses.is_published = true
        OR public.is_admin()
        OR courses.instructor_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.enrollments
          WHERE enrollments.course_id = courses.id
          AND enrollments.user_id = auth.uid()
          AND enrollments.payment_status = 'paid'
        )
      )
    )
    OR
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = resources.course_id
      AND (
        courses.is_published = true
        OR public.is_admin()
        OR courses.instructor_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM public.enrollments
          WHERE enrollments.course_id = courses.id
          AND enrollments.user_id = auth.uid()
          AND enrollments.payment_status = 'paid'
        )
      )
    )
  );

CREATE POLICY "resources_admin_all" ON public.resources
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Course Resources Policies
-- ============================================

CREATE POLICY "course_resources_view_published" ON public.course_resources
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = course_resources.course_id 
      AND courses.is_published = true
    )
  );

CREATE POLICY "course_resources_admin_all" ON public.course_resources
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "course_resources_instructor_manage" ON public.course_resources
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = course_resources.course_id 
      AND courses.instructor_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = course_resources.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- ============================================
-- Enrollments Policies
-- ============================================

CREATE POLICY "enrollments_view_own" ON public.enrollments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "enrollments_insert_own" ON public.enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "enrollments_update_own" ON public.enrollments
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "enrollments_admin_all" ON public.enrollments
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Quizzes Policies
-- ============================================

CREATE POLICY "quizzes_view_enrolled" ON public.quizzes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.lessons
      JOIN public.courses ON courses.id = lessons.course_id
      WHERE lessons.id = quizzes.lesson_id
      AND (
        courses.is_published = true
        OR public.is_admin()
        OR courses.instructor_id = auth.uid()
      )
    )
  );

CREATE POLICY "quizzes_admin_all" ON public.quizzes
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Course Quizzes Policies
-- ============================================

CREATE POLICY "course_quizzes_view_published" ON public.course_quizzes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = course_quizzes.course_id 
      AND courses.is_published = true
    )
  );

CREATE POLICY "course_quizzes_admin_all" ON public.course_quizzes
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "course_quizzes_instructor_manage" ON public.course_quizzes
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = course_quizzes.course_id 
      AND courses.instructor_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.courses 
      WHERE courses.id = course_quizzes.course_id 
      AND courses.instructor_id = auth.uid()
    )
  );

-- ============================================
-- Quiz Attempts Policies
-- ============================================

CREATE POLICY "quiz_attempts_view_own" ON public.quiz_attempts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "quiz_attempts_insert_own" ON public.quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "quiz_attempts_admin_all" ON public.quiz_attempts
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- ============================================
-- Course Quiz Attempts Policies
-- ============================================

CREATE POLICY "course_quiz_attempts_view_own" ON public.course_quiz_attempts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "course_quiz_attempts_insert_own" ON public.course_quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "course_quiz_attempts_admin_all" ON public.course_quiz_attempts
  FOR ALL
  TO authenticated
  USING (public.is_admin());

-- ============================================
-- Certificates Policies
-- ============================================

CREATE POLICY "certificates_view_own" ON public.certificates
  FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "certificates_admin_all" ON public.certificates
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Course Announcements Policies
-- ============================================

CREATE POLICY "announcements_view_enrolled" ON public.course_announcements
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE enrollments.course_id = course_announcements.course_id
      AND enrollments.user_id = auth.uid()
    )
    OR public.is_admin()
  );

CREATE POLICY "announcements_admin_all" ON public.course_announcements
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- System Settings Policies
-- ============================================

CREATE POLICY "system_settings_view_all" ON public.system_settings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "system_settings_admin_all" ON public.system_settings
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Payments Policies
-- ============================================

CREATE POLICY "payments_view_own" ON public.payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "payments_insert_own" ON public.payments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "payments_update_own" ON public.payments
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "payments_admin_all" ON public.payments
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================
-- Notifications Policies
-- ============================================

CREATE POLICY "notifications_view_own" ON public.notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "notifications_insert_all" ON public.notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "notifications_delete_own" ON public.notifications
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- ============================================
-- SECTION 7: STORAGE BUCKETS SETUP
-- ============================================

-- Create course-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-images',
  'course-images',
  true,
  5242880,
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']::text[];

-- Create course-payments bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-payments',
  'course-payments',
  true,
  10485760,
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'application/pdf']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'application/pdf']::text[];

-- Create course-files bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-files',
  'course-files',
  true,
  20971520,
  ARRAY['application/pdf', 'application/zip', 'image/png', 'image/jpeg', 'video/mp4']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 20971520,
  allowed_mime_types = ARRAY['application/pdf', 'application/zip', 'image/png', 'image/jpeg', 'video/mp4']::text[];

-- ============================================
-- SECTION 8: STORAGE POLICIES
-- ============================================

-- Drop existing storage policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname 
              FROM pg_policies 
              WHERE schemaname = 'storage' AND tablename = 'objects') 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
    END LOOP;
END $$;

-- Course images policies
CREATE POLICY "storage_course_images_upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'course-images');

CREATE POLICY "storage_course_images_view"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-images');

CREATE POLICY "storage_course_images_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'course-images');

CREATE POLICY "storage_course_images_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'course-images');

-- Course payments policies
CREATE POLICY "storage_course_payments_upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'course-payments');

CREATE POLICY "storage_course_payments_view"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'course-payments');

CREATE POLICY "storage_course_payments_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'course-payments');

CREATE POLICY "storage_course_payments_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'course-payments');

-- Course files policies
CREATE POLICY "storage_course_files_upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'course-files');

CREATE POLICY "storage_course_files_view"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-files');

CREATE POLICY "storage_course_files_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'course-files');

CREATE POLICY "storage_course_files_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'course-files');

-- ============================================
-- SECTION 9: SEED DEFAULT DATA
-- ============================================

-- Insert default system settings
INSERT INTO public.system_settings (setting_key, setting_value, description)
VALUES 
  ('payment_bank_name', 'Bank of Kigali', 'Default bank name for payments'),
  ('payment_bank_account', '1234567890', 'Bank account number'),
  ('payment_bank_account_name', 'AGCC Platform', 'Bank account holder name'),
  ('payment_momo_number', '+250788123456', 'Mobile money number'),
  ('payment_momo_name', 'AGCC Platform', 'Mobile money account name')
ON CONFLICT (setting_key) DO NOTHING;

-- Insert default course categories
INSERT INTO public.course_categories (name, description, icon, order_index)
VALUES 
  ('Healthcare', 'Healthcare and medical training courses', 'heart-pulse', 1),
  ('Caregiving', 'Professional caregiving and support courses', 'users', 2),
  ('First Aid', 'First aid and emergency response training', 'first-aid-kit', 3),
  ('Nursing', 'Nursing skills and specialized care', 'stethoscope', 4),
  ('Mental Health', 'Mental health awareness and support', 'brain', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert default service types
INSERT INTO public.service_types (name, description, base_price, duration_minutes, icon)
VALUES 
  ('Home Care', 'Basic home care services', 50.00, 120, 'home'),
  ('Medical Care', 'Professional medical care', 100.00, 60, 'stethoscope'),
  ('Companion Care', 'Companionship and social support', 40.00, 180, 'users'),
  ('Personal Care', 'Personal hygiene and daily living assistance', 60.00, 90, 'heart'),
  ('Respite Care', 'Temporary relief for primary caregivers', 80.00, 240, 'clock')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- SECTION 10: VERIFICATION QUERIES
-- ============================================

-- Count tables
SELECT 
  'Tables Created' as info,
  COUNT(*) as count
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';

-- Count policies
SELECT 
  'RLS Policies Created' as info,
  COUNT(*) as count
FROM pg_policies
WHERE schemaname = 'public';

-- Count storage buckets
SELECT 
  'Storage Buckets Created' as info,
  COUNT(*) as count
FROM storage.buckets
WHERE id IN ('course-images', 'course-payments', 'course-files');

-- Count storage policies
SELECT 
  'Storage Policies Created' as info,
  COUNT(*) as count
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects';

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

SELECT 
  '✅ MIGRATION COMPLETED SUCCESSFULLY!' as status,
  'Database schema is ready for use' as message,
  NOW() as completed_at;
