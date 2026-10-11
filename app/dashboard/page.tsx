'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase-client';
import { User, Booking, Enrollment } from '@/lib/types';

type TabType = 'bookings' | 'courses';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('bookings');
  const router = useRouter();
  const supabase = createBrowserClient();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        router.push('/auth/signin');
        return;
      }

      // Load profile
      let { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // Auto-create profile if missing
      if (!profile) {
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || session.user.email || 'User',
            role: session.user.user_metadata?.role || 'client',
          })
          .select()
          .single();
        profile = newProfile;
      }

      if (!profile) {
        router.push('/auth/signin');
        return;
      }

      setUser(profile);

      // Submit pending booking if exists (from pre-signup booking flow)
      const pending = sessionStorage.getItem('pendingBooking');
      if (pending) {
        try {
          const booking = JSON.parse(pending);
          const res = await fetch('/api/submit-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: session.user.id,
              fullName: profile.full_name,
              email: profile.email,
              booking,
            }),
          });
          if (res.ok) sessionStorage.removeItem('pendingBooking');
        } catch (err) {
          console.error('Failed to submit pending booking on dashboard load:', err);
        }
      }
      if (profile.role === 'caregiver') {
        router.push('/dashboard/caregiver');
        return;
      }

      if (['client', 'caregiver', 'nurse'].includes(profile.role)) {
        loadBookings(session.user.id, profile.role);
      }

      loadEnrollments(session.user.id);
      loadAvailableCourses();
      setLoading(false);
    } catch (error) {
      console.error('Dashboard load error:', error);
      setLoading(false);
    }
  };

  const loadBookings = async (userId: string, role: string) => {
    let query = supabase.from('bookings').select('*');

    if (role === 'client') {
      const { data: client } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', userId)
        .single();
      if (client) query = query.eq('client_id', client.id);
    } else if (role === 'caregiver') {
      const { data: caregiver } = await supabase
        .from('caregivers')
        .select('id')
        .eq('user_id', userId)
        .single();
      if (caregiver) query = query.eq('caregiver_id', caregiver.id);
    }

    const { data } = await query.order('created_at', { ascending: false }).limit(5);
    if (!data) return;

    // Resolve UUIDs to service names for old records
    const { data: serviceTypes } = await supabase.from('service_types').select('id, name');
    const resolved = data.map((b: any) => {
      const match = serviceTypes?.find((s: any) => s.id === b.service_type);
      return { ...b, service_type: match ? match.name : b.service_type };
    });
    setBookings(resolved);
  };

  const loadEnrollments = async (userId: string) => {
    const { data } = await supabase
      .from('enrollments')
      .select('*, courses(*)')
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false });
    if (data) setEnrollments(data as any);
  };

  const loadAvailableCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    if (data) setAvailableCourses(data);
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.full_name}!</h1>
        <p className="text-gray-600 mt-2">Role: <span className="font-semibold capitalize">{user.role}</span></p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Bookings & Services</span>
                {bookings.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs font-semibold">
                    {bookings.length}
                  </span>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('courses')}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === 'courses'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Courses & Academy</span>
                {enrollments.length > 0 && (
                  <span className="ml-2 bg-purple-100 text-purple-600 py-0.5 px-2 rounded-full text-xs font-semibold">
                    {enrollments.length}
                  </span>
                )}
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'bookings' ? (
        <BookingsTab user={user} bookings={bookings} getStatusColor={getStatusColor} />
      ) : (
        <CoursesTab enrollments={enrollments} availableCourses={availableCourses} getStatusColor={getStatusColor} />
      )}

      {/* Admin Section - Always visible for admins */}
      {user.role === 'admin' && (
        <div className="mt-12 rounded-xl shadow-lg p-8" style={{ backgroundColor: '#5CA3D6' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Admin Quick Access</h2>
              <p className="text-sm text-white/90">Manage your platform</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/admin" className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-white">
              <svg className="w-10 h-10 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-bold text-center text-gray-900 mb-1">Admin Dashboard</h3>
              <p className="text-sm text-gray-600 text-center">Full admin panel</p>
            </Link>
            <Link href="/dashboard/admin/users" className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-white">
              <svg className="w-10 h-10 text-gray-600 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="font-bold text-center text-gray-900 mb-1">Manage Users</h3>
              <p className="text-sm text-gray-600 text-center">User management</p>
            </Link>
            <Link href="/dashboard/admin/bookings" className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-white">
              <svg className="w-10 h-10 text-gray-600 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-bold text-center text-gray-900 mb-1">Manage Bookings</h3>
              <p className="text-sm text-gray-600 text-center">Booking management</p>
            </Link>
            <Link href="/dashboard/admin/courses" className="group p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-white">
              <svg className="w-10 h-10 text-gray-600 mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="font-bold text-center text-gray-900 mb-1">Manage Courses</h3>
              <p className="text-sm text-gray-600 text-center">Course management</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Bookings Tab Component
function BookingsTab({ user, bookings, getStatusColor }: { user: User; bookings: Booking[]; getStatusColor: (status: string) => string }) {
  return (
    <div className="space-y-8">
      {/* Quick Actions for Bookings */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['client', 'caregiver', 'nurse'].includes(user.role) && (
          <Link
            href="/care/booking"
            className="group p-6 rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
            style={{ backgroundColor: '#267ABA' }}
          >
            <div className="text-white mb-3">
              <svg className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-white text-center text-lg">Book Service</h3>
            <p className="text-white/80 text-sm text-center mt-1">Schedule a care service</p>
          </Link>
        )}
        
        <Link
          href="/care"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all group transform hover:-translate-y-1"
        >
          <div className="text-green-600 mb-3">
            <svg className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-center text-lg mb-2">Care Services</h3>
          <div className="flex items-center justify-center gap-1 text-sm text-green-600 group-hover:gap-2 transition-all">
            <span>Explore Services</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          href="/care/seniors"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all group transform hover:-translate-y-1"
        >
          <div className="text-blue-600 mb-3">
            <svg className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-center text-lg mb-2">Senior Care</h3>
          <p className="text-gray-600 text-sm text-center">Elderly support services</p>
        </Link>

        <Link
          href="/care/children"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all group transform hover:-translate-y-1"
        >
          <div className="text-orange-600 mb-3">
            <svg className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-center text-lg mb-2">Child Care</h3>
          <p className="text-gray-600 text-sm text-center">Pediatric care services</p>
        </Link>
      </div>

      {/* Recent Bookings */}
      {['client', 'caregiver', 'nurse'].includes(user.role) && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Bookings</h2>
              <p className="text-sm text-gray-600 mt-1">Recent care service bookings</p>
            </div>
            <Link 
              href="/care/booking" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              New Booking
            </Link>
          </div>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border-l-4 border-blue-500 bg-gray-50 rounded-r-lg p-5 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{booking.service_type}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(booking.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {booking.scheduled_time} • {booking.duration} minutes
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 mb-4">No bookings yet</p>
              <Link 
                href="/care/booking" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book Your First Service
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Courses Tab Component
function CoursesTab({ enrollments, availableCourses, getStatusColor }: { enrollments: Enrollment[]; availableCourses: any[]; getStatusColor: (status: string) => string }) {
  return (
    <div className="space-y-8">
      {/* Quick Actions for Courses */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/academy/courses"
          className="group p-6 rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-1"
          style={{ backgroundColor: '#1992A3' }}
        >
          <div className="text-white mb-3">
            <svg className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-bold text-white text-center text-lg">Browse Courses</h3>
          <p className="text-white/80 text-sm text-center mt-1">Explore all courses</p>
        </Link>

        <Link
          href="/academy"
          className="p-6 rounded-xl shadow-md hover:shadow-2xl transition-all group transform hover:-translate-y-1"
          style={{ backgroundColor: '#F1FCFF' }}
        >
          <div className="text-orange-600 mb-3">
            <svg className="w-12 h-12 mx-auto group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="font-bold text-center text-lg mb-2 text-gray-900">Academy Home</h3>
          <div className="flex items-center justify-center gap-1 text-sm text-orange-600 group-hover:gap-2 transition-all">
            <span>Visit Academy</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <div className="p-6 rounded-xl shadow-md" style={{ backgroundColor: '#F3E5F5' }}>
          <div className="text-purple-600 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
          </div>
          <h3 className="font-bold text-center text-lg mb-1 text-purple-900">My Certificates</h3>
          <p className="text-purple-700 text-sm text-center">{enrollments.filter((e: any) => e.status === 'completed').length} earned</p>
        </div>

        <div className="p-6 rounded-xl shadow-md" style={{ backgroundColor: '#E8F5E9' }}>
          <div className="text-green-600 mb-3">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-center text-lg mb-1 text-green-900">Active Courses</h3>
          <p className="text-green-700 text-sm text-center">{enrollments.filter((e: any) => e.status === 'active').length} in progress</p>
        </div>
      </div>

      {/* My Courses */}
      {enrollments.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <p className="text-sm text-gray-600 mt-1">Continue your learning journey</p>
            </div>
            <Link href="/academy/courses" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1">
              Browse more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {enrollments.map((enrollment: any) => (
              <Link
                key={enrollment.id}
                href={`/academy/courses/${enrollment.course_id}/learn`}
                className="block border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-white rounded-r-xl p-6 hover:shadow-lg transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">{enrollment.courses?.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{enrollment.courses?.category}</p>
                  </div>
                  <span className={`ml-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(enrollment.status)}`}>
                    {enrollment.status}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">Progress</span>
                    <span className="font-bold text-purple-600">{enrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${enrollment.progress}%` }} 
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Available Courses */}
      {availableCourses.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Courses</h2>
              <p className="text-sm text-gray-600 mt-1">Expand your knowledge and skills</p>
            </div>
            <Link href="/academy/courses" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.slice(0, 6).map((course: any) => {
              const enrolled = enrollments.some((e: any) => e.course_id === course.id);
              return (
                <div key={course.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group hover:border-purple-300">
                  <div className="h-32 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">{course.category}</p>
                    <h3 className="font-bold text-base mb-2 line-clamp-2 text-gray-900 group-hover:text-purple-700 transition-colors">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration_hours}h course
                    </p>
                    {enrolled ? (
                      <Link
                        href={`/academy/courses/${course.id}/learn`}
                        className="block w-full text-center px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
                      >
                        Continue Learning
                      </Link>
                    ) : (
                      <Link
                        href={`/academy/courses/${course.id}`}
                        className="block w-full text-center px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 transition-colors"
                      >
                        Enroll Now
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {enrollments.length === 0 && availableCourses.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-xl font-semibold text-gray-900 mb-2">No courses yet</p>
          <p className="text-gray-600 mb-6">Start your learning journey today</p>
          <Link 
            href="/academy/courses" 
            className="inline-block px-8 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
}
