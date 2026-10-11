-- Create caregiver_applications table for job applications
CREATE TABLE IF NOT EXISTS public.caregiver_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date_of_birth DATE,
    address TEXT,
    education_level TEXT,
    experience_years INTEGER,
    previous_experience TEXT,
    certifications TEXT,
    availability TEXT,
    cv_file_path TEXT, -- Path to CV file in Supabase storage
    cv_file_name TEXT, -- Original filename
    application_status TEXT DEFAULT 'pending', -- pending, reviewing, approved, rejected
    notes TEXT, -- Admin notes
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for CVs
INSERT INTO storage.buckets (id, name, public)
VALUES ('caregiver-cvs', 'caregiver-cvs', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.caregiver_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit application)
CREATE POLICY "Anyone can submit application"
ON public.caregiver_applications
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Admins can view all applications
CREATE POLICY "Admins can view all applications"
ON public.caregiver_applications
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- Policy: Admins can update applications
CREATE POLICY "Admins can update applications"
ON public.caregiver_applications
FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- Storage policies for caregiver-cvs bucket

-- Policy: Anyone can upload CVs
CREATE POLICY "Anyone can upload CVs"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'caregiver-cvs');

-- Policy: Admins can view CVs
CREATE POLICY "Admins can view CVs"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'caregiver-cvs' AND
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_caregiver_applications_status 
ON public.caregiver_applications(application_status);

CREATE INDEX IF NOT EXISTS idx_caregiver_applications_created_at 
ON public.caregiver_applications(created_at DESC);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_caregiver_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_caregiver_applications_updated_at
BEFORE UPDATE ON public.caregiver_applications
FOR EACH ROW
EXECUTE FUNCTION update_caregiver_applications_updated_at();

COMMENT ON TABLE public.caregiver_applications IS 'Stores caregiver job applications with CV uploads';
