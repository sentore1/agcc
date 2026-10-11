import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { userId, fullName, email, booking } = await request.json();

    if (!userId || !booking) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get or create client record for this specific user
    let clientId: string | null = null;

    const { data: existingClient } = await supabaseAdmin
      .from('clients')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingClient) {
      clientId = existingClient.id;
    } else {
      const { data: newClient, error: clientError } = await supabaseAdmin
        .from('clients')
        .insert({ user_id: userId, full_name: fullName, email, phone: '' })
        .select()
        .single();

      if (clientError) {
        return NextResponse.json({ error: clientError.message }, { status: 500 });
      }
      clientId = newClient!.id;
    }

    // Resolve service name from ID if it looks like a UUID
    let serviceTypeName = booking.serviceType;
    if (booking.serviceType && booking.serviceType.includes('-')) {
      const { data: serviceData } = await supabaseAdmin
        .from('service_types')
        .select('name')
        .eq('id', booking.serviceType)
        .single();
      if (serviceData) serviceTypeName = serviceData.name;
    }

    const { error: bookingError } = await supabaseAdmin.from('bookings').insert({
      client_id: clientId,
      service_type: serviceTypeName,
      scheduled_date: booking.scheduledDate,
      scheduled_time: booking.scheduledTime,
      duration: booking.durationType === 'days'
        ? parseInt(booking.duration) * 480
        : parseInt(booking.duration),
      notes: booking.notes || '',
      status: 'pending',
      payment_status: 'pending',
    });

    if (bookingError) {
      return NextResponse.json({ error: bookingError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
