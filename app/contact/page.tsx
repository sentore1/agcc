'use client';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import FooterSection from '@/components/footer';
import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Contact AGCC
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get in touch with our professional caregiving team
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href="tel:+250781204548" className="text-gray-600 hover:text-gray-900">
                    +250 781 204 548
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                  <a 
                    href="https://wa.me/250781204548" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:shadow-md"
                    style={{ backgroundColor: '#25D366', color: 'white' }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:info@agccr.com" className="text-gray-600 hover:text-gray-900 block">
                    info@agccr.com
                  </a>
                  <a href="mailto:agccrwanda@gmail.com" className="text-gray-600 hover:text-gray-900 block mt-1">
                    agccrwanda@gmail.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-900 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <a 
                    href="https://maps.app.goo.gl/eznXzRTGoed47m939" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 hover:underline"
                  >
                    8 KK 569 St, All Generations Care and Companionship (AGCC) Ltd
                  </a>
                  <p className="text-gray-600 mt-1">Kigali, Rwanda</p>
                  <p className="text-xs text-gray-500 mt-2">Services available at our facility, at home, and in hospital</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Link 
                  href="https://www.instagram.com/agccrwanda" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram - agccrwanda"
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#267ABA' }}
                >
                  <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                  </svg>
                </Link>
                <Link 
                  href="https://www.linkedin.com/company/all-generations-care-and-companionship-agcc" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn - AGCC"
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#267ABA' }}
                >
                  <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                  </svg>
                </Link>
                <Link 
                  href="https://www.youtube.com/@agccrwanda" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube - agccrwanda"
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#267ABA' }}
                >
                  <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73" />
                  </svg>
                </Link>
                <Link 
                  href="https://www.facebook.com/agccrwanda" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook - agccrwanda"
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#267ABA' }}
                >
                  <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
                  </svg>
                </Link>
                <Link 
                  href="https://x.com/agccrwanda" 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X/Twitter - agccrwanda"
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#267ABA' }}
                >
                  <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl" style={{ backgroundColor: '#5CA3D6' }}>
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              setStatus('loading');
              const form = e.currentTarget;
              const data = {
                name: (form.elements.namedItem('name') as HTMLInputElement).value,
                email: (form.elements.namedItem('email') as HTMLInputElement).value,
                phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
                message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
              };
              const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
              setStatus(res.ok ? 'success' : 'error');
              if (res.ok) form.reset();
            }}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="+250 XXX XXX XXX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-60"
                style={{ backgroundColor: '#267ABA' }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-white text-sm text-center">✓ Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-200 text-sm text-center">Failed to send. Please try again.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/care/booking"
              className="inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: '#267ABA' }}
            >
              Request a Caregiver
            </Link>
            <Link
              href="/careers/apply"
              className="inline-flex items-center justify-center px-8 py-3 text-gray-700 font-semibold rounded-lg border-2 transition-all hover:shadow-lg"
              style={{ borderColor: '#267ABA' }}
            >
              Become a Caregiver
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <FooterSection />
    </main>
  );
}
