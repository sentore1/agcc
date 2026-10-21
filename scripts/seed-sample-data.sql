-- ============================================
-- Sample Data Seeder for Care & Igeno Platform
-- Run this in Supabase SQL Editor
-- This adds sample categories and courses for testing
-- ============================================

-- STEP 1: Create sample categories with colors (if they don't exist)
-- ============================================

INSERT INTO public.course_categories (name, description, color, order_index, is_active)
VALUES 
  ('Caregiver Training', 'Essential training for caregivers providing quality care', '#7C3AED', 1, true),
  ('Nursing Skills', 'Advanced nursing techniques and medical procedures', '#2563EB', 2, true),
  ('Health & Safety', 'Critical health and safety protocols for healthcare workers', '#DC2626', 3, true),
  ('Communication', 'Effective communication skills in healthcare settings', '#16A34A', 4, true),
  ('Specialized Care', 'Specialized training for specific patient populations', '#EA580C', 5, true),
  ('Career Development', 'Professional growth and career advancement resources', '#DB2777', 6, true)
ON CONFLICT (name) DO NOTHING;

-- STEP 2: Get the first admin user ID (or create a placeholder)
-- ============================================

DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Try to find an admin user
  SELECT id INTO admin_user_id 
  FROM public.profiles 
  WHERE role = 'admin' 
  LIMIT 1;
  
  -- If no admin exists, we'll use NULL (Supabase will require manual update later)
  IF admin_user_id IS NULL THEN
    RAISE NOTICE 'No admin user found. Courses will be created without instructor_id. Please update manually.';
  END IF;

  -- STEP 3: Insert sample courses
  -- ============================================

  INSERT INTO public.courses (
    title, 
    description, 
    introduction,
    category, 
    duration_hours, 
    is_published, 
    instructor_id,
    price,
    youtube_url
  ) VALUES
    (
      'Introduction to Caregiving',
      '<p>Learn the fundamentals of providing quality care to clients. This comprehensive course covers basic caregiving principles, communication skills, and safety procedures.</p><p>Perfect for beginners entering the caregiving profession.</p>',
      'Welcome to Introduction to Caregiving! This course will teach you the essential skills needed to provide compassionate, professional care.',
      'Caregiver Training',
      8,
      true,
      admin_user_id,
      0,
      'https://www.youtube.com/watch?v=sample'
    ),
    (
      'Advanced Nursing Skills',
      '<p>Master advanced nursing techniques including wound care, medication administration, and patient monitoring. Ideal for nurses looking to expand their skill set.</p>',
      'Enhance your nursing expertise with advanced clinical skills and evidence-based practices.',
      'Nursing Skills',
      12,
      true,
      admin_user_id,
      15000,
      null
    ),
    (
      'Health and Safety Essentials',
      '<p>Critical health and safety training covering infection control, emergency response, and workplace safety. Required for all healthcare workers.</p>',
      'Learn essential safety protocols to protect yourself and your patients in healthcare environments.',
      'Health & Safety',
      6,
      true,
      admin_user_id,
      0,
      null
    ),
    (
      'Effective Communication in Healthcare',
      '<p>Develop strong communication skills for interacting with patients, families, and healthcare teams. Learn active listening and conflict resolution.</p>',
      'Build the communication skills that are essential for providing excellent patient care.',
      'Communication',
      4,
      true,
      admin_user_id,
      8000,
      null
    ),
    (
      'Dementia Care Specialist',
      '<p>Specialized training in caring for patients with dementia and Alzheimer''s disease. Covers behavioral management and person-centered care.</p>',
      'Become a specialist in dementia care with evidence-based strategies and compassionate approaches.',
      'Specialized Care',
      10,
      true,
      admin_user_id,
      20000,
      null
    ),
    (
      'Career Development for Healthcare Professionals',
      '<p>Plan and advance your healthcare career. Topics include resume building, interview skills, and continuing education opportunities.</p>',
      'Take control of your career path with practical strategies for professional growth.',
      'Career Development',
      5,
      true,
      admin_user_id,
      0,
      null
    ),
    (
      'Pediatric Care Fundamentals',
      '<p>Learn to provide safe and effective care for children of all ages. Covers developmental stages, common illnesses, and family-centered care.</p>',
      'Gain the specialized knowledge needed to care for infants, children, and adolescents.',
      'Specialized Care',
      8,
      true,
      admin_user_id,
      18000,
      null
    ),
    (
      'Medication Management',
      '<p>Comprehensive course on safe medication administration, storage, and documentation. Essential for caregivers and nurses.</p>',
      'Master the critical skill of safe and accurate medication management.',
      'Nursing Skills',
      6,
      true,
      admin_user_id,
      12000,
      null
    ),
    (
      'End-of-Life Care',
      '<p>Compassionate care for patients in their final stages. Covers pain management, emotional support, and family counseling.</p>',
      'Provide dignified, compassionate care during life''s final journey.',
      'Specialized Care',
      8,
      false,
      admin_user_id,
      15000,
      null
    ),
    (
      'Physical Therapy Assistance',
      '<p>Learn basic physical therapy techniques to help patients with mobility, strength building, and recovery exercises.</p>',
      'Support patient rehabilitation with safe and effective physical therapy assistance.',
      'Caregiver Training',
      10,
      true,
      admin_user_id,
      16000,
      null
    )
  ON CONFLICT (id) DO NOTHING;

END $$;

-- ============================================
-- Success message
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✓ Sample categories and courses have been added successfully!';
  RAISE NOTICE '✓ Total courses created: 10';
  RAISE NOTICE '✓ Total categories created: 6';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Go to Admin > Courses to view your sample courses';
  RAISE NOTICE '2. Add lessons, resources, and quizzes to each course';
  RAISE NOTICE '3. Update instructor_id if needed (currently set to first admin user)';
END $$;
