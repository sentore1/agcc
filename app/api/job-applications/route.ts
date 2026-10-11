import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    // Use service role key for inserting without authentication
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const formData = await request.formData();

    // Extract form fields
    const full_name = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const date_of_birth = formData.get('date_of_birth') as string;
    const address = formData.get('address') as string;
    const education_level = formData.get('education_level') as string;
    const experience_years = formData.get('experience_years') as string;
    const previous_experience = formData.get('previous_experience') as string;
    const certifications = formData.get('certifications') as string;
    const availability = formData.get('availability') as string;
    const cv_file = formData.get('cv_file') as File;

    // Validate required fields
    if (!full_name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name, email, phone' },
        { status: 400 }
      );
    }

    let cv_file_path = null;
    let cv_file_name = null;

    // Upload CV file if provided
    if (cv_file && cv_file.size > 0) {
      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedName = cv_file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}_${sanitizedName}`;

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('caregiver-cvs')
        .upload(fileName, cv_file, {
          contentType: cv_file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('File upload error:', uploadError);
        return NextResponse.json(
          { error: 'Failed to upload CV file' },
          { status: 500 }
        );
      }

      cv_file_path = uploadData.path;
      cv_file_name = cv_file.name;
    }

    // Insert application into database
    const { data, error } = await supabase
      .from('caregiver_applications')
      .insert({
        full_name,
        email,
        phone,
        date_of_birth: date_of_birth || null,
        address: address || null,
        education_level: education_level || null,
        experience_years: experience_years ? parseInt(experience_years) : null,
        previous_experience: previous_experience || null,
        certifications: certifications || null,
        availability: availability || null,
        cv_file_path,
        cv_file_name,
        application_status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      
      // If database insert fails, delete the uploaded file
      if (cv_file_path) {
        await supabase.storage.from('caregiver-cvs').remove([cv_file_path]);
      }
      
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data,
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for admin to retrieve applications
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    // Build query
    let query = supabase
      .from('caregiver_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('application_status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH endpoint for admin to update application status
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await request.json();
    const { id, application_status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Update application
    const updateData: any = {};
    if (application_status) updateData.application_status = application_status;
    if (notes !== undefined) updateData.notes = notes;

    const { data, error } = await supabase
      .from('caregiver_applications')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Application updated successfully',
      data,
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
