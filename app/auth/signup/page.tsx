'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase-client';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Sign up user - profile will be created automatically by database trigger
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'client',
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        }
      });

      if (authError) throw authError;

      // Submit pending booking via API route (uses service role, not browser session)
      const submitPendingBooking = async (userId: string) => {
        const pending = sessionStorage.getItem('pendingBooking');
        if (!pending) return;
        try {
          const booking = JSON.parse(pending);
          const res = await fetch('/api/submit-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, fullName, email, booking }),
          });
          if (res.ok) sessionStorage.removeItem('pendingBooking');
        } catch (err) {
          console.error('Failed to submit pending booking:', err);
        }
      };

      if (authData.user && !authData.session) {
        // Email confirmation requiredbooking will be submitted on dashboard load
        const hasPending = !!sessionStorage.getItem('pendingBooking');
        setSuccess(
          hasPending
            ? 'booking_pending_confirmation'
            : 'email_confirmation'
        );
      } else if (authData.user && authData.session) {
        await submitPendingBooking(authData.user.id);
        setSuccess('success');
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} style={{ display: success && success !== 'success' ? 'none' : undefined }}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}
          {success === 'email_confirmation' && (
            <div className="rounded-md bg-green-50 border border-green-200 p-6 text-center">
              <div className="text-green-600 text-4xl mb-3">✓</div>
              <h3 className="font-bold text-green-800 text-lg mb-2">Account Created!</h3>
              <p className="text-sm text-green-700 mb-4">Please check your email and click the confirmation link to activate your account.</p>
              <Link href="/auth/signin" className="inline-block px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700">Go to Sign In</Link>
            </div>
          )}
          {success === 'booking_pending_confirmation' && (
            <div className="rounded-md border p-6 text-center" style={{ backgroundColor: '#F1FCFF', borderColor: '#91CBF1' }}>
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Almost there!</h3>
              <p className="text-sm text-gray-700 mb-2">Your account has been created and your <strong>booking request has been saved</strong>.</p>
              <p className="text-sm text-gray-600 mb-4">Check your email, confirm your account, and your booking will be automatically submitted when you sign in.</p>
              <Link href="/auth/signin" className="inline-block px-4 py-2 text-white rounded-md text-sm font-semibold" style={{ backgroundColor: '#267ABA' }}>Go to Sign In</Link>
            </div>
          )}
          {success === 'success' && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-800">Account created successfully! Redirecting...</div>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
