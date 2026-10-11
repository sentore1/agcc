-- Create caregiver_requests table to store form submissions from homepage
CREATE TABLE IF NOT EXISTS public.caregiver_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  contacted_by UUID REFERENCES auth.users(id),
  contacted_at TIMESTAMPTZ
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_caregiver_requests_status ON public.caregiver_requests(status);
CREATE INDEX IF NOT EXISTS idx_caregiver_requests_created_at ON public.caregiver_requests(created_at DESC);

-- Enable RLS
ALTER TABLE public.caregiver_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit form)
CREATE POLICY "Anyone can submit caregiver request"
  ON public.caregiver_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Only admins can view all requests
CREATE POLICY "Admins can view all caregiver requests"
  ON public.caregiver_requests
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policy: Only admins can update requests
CREATE POLICY "Admins can update caregiver requests"
  ON public.caregiver_requests
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

-- Policy: Only admins can delete requests
CREATE POLICY "Admins can delete caregiver requests"
  ON public.caregiver_requests
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_caregiver_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_caregiver_requests_updated_at
  BEFORE UPDATE ON public.caregiver_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_caregiver_requests_updated_at();

COMMENT ON TABLE public.caregiver_requests IS 'Stores caregiver requests submitted through the homepage form';
