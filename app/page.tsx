'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatsSection from '@/components/sections/StatsSection';
import ContentSection from '@/components/sections/ContentSection';
import FaqsSection from '@/components/sections/FaqsSection';
import FooterSection from '@/components/footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Heart, Home as HomeIcon, Users, Baby, Clock, Shield } from 'lucide-react';

interface ServiceType {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    loadServiceTypes();
  }, []);

  const loadServiceTypes = async () => {
    try {
      console.log('Loading service types...');
      const response = await fetch('/api/service-types');
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok && data.data) {
        console.log('Service types loaded:', data.data.length);
        setServiceTypes(data.data);
      } else {
        console.error('Failed to load service types:', data);
      }
    } catch (error) {
      console.error('Failed to load service types:', error);
    } finally {
      setLoadingServices(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/caregiver-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.name,
          phone: formData.phone,
          service_type: formData.service,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✓ Request submitted successfully! We will contact you soon.');
        setFormData({ name: '', phone: '', service: '' });
      } else {
        setMessage('✗ Failed to submit request. Please try again.');
      }
    } catch (error) {
      setMessage('✗ An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section - Full Width */}
      <HeroSection />

      {/* About AGCC Section - Below Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-100 to-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-16">
              {/* Left Content */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  Professional Care,<br />
                  Genuine Compassion,<br />
                  Family You Can Trust
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  All Generations Care and Companionship Rwanda (AGCC) provides comprehensive caregiving services 
                  for elderly individuals, children, and families. Our professional caregivers offer support at your home, 
                  in hospitals, or at our care center—tailored to each patient's medical condition and needs. 
                  Every service is secured through a confidential contract.
                </p>

                {/* Request Caregiver Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+250 XXX XXX XXX"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Service Type
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 bg-white text-sm"
                      required
                      disabled={loadingServices}
                    >
                      <option value="">
                        {loadingServices ? 'Loading services...' : 'Choose a service'}
                      </option>
                      {serviceTypes.map((serviceType) => (
                        <option key={serviceType.id} value={serviceType.name}>
                          {serviceType.name}
                        </option>
                      ))}
                    </select>
                    {!loadingServices && serviceTypes.length === 0 && (
                      <p className="mt-1 text-xs text-red-600">
                        No services available. Please contact support.
                      </p>
                    )}
                  </div>

                  {message && (
                    <div className={`p-3 rounded-lg text-xs sm:text-sm font-semibold ${
                      message.startsWith('✓') 
                        ? 'bg-green-600 text-white' 
                        : 'bg-red-600 text-white'
                    }`}>
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#267ABA' }}
                  >
                    <span>{submitting ? 'Submitting...' : 'Request a Caregiver'}</span>
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </div>

              {/* Right Content - Image Card with Features */}
              <div className="relative h-[400px] sm:h-[450px] lg:h-[500px]">
                {/* Background Image Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-full">
                  <div className="relative h-full bg-gradient-to-br from-blue-50 to-blue-100">
                    <Image
                      src="/second-section-image.jpg"
                      alt="Professional caregiver with elderly person"
                      fill
                      className="object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>

                {/* Info Card - Top Right */}
                <div className="absolute top-4 sm:top-6 lg:top-8 right-2 sm:right-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl max-w-[150px] sm:max-w-[180px] lg:max-w-[200px]">
                  <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">Our Care Services</h3>
                  <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-gray-600">
                    <li className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                      <span>Personal Care</span>
                    </li>
                    <li className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                      <span>Companionship</span>
                    </li>
                    <li className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded" style={{ backgroundColor: '#267ABA' }}>
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white flex-shrink-0" />
                      <span className="font-semibold text-white">24/7 Monitoring</span>
                    </li>
                    <li className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                      <span>Home Activities</span>
                    </li>
                    <li className="flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                      <span>Medical Support</span>
                    </li>
                  </ul>
                </div>

                {/* Location Badge - Bottom Left */}
                <div className="absolute bottom-3 sm:bottom-4 left-2 sm:left-4 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                    Care Services<br />Available
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                      <HomeIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#267ABA' }} />
                      <span className="font-semibold">At Home</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#267ABA' }} />
                      <span className="font-semibold">In Hospital</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose a Service - Care Options */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 sm:mb-3" style={{ color: '#267ABA' }}>
              Our Services
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose a Service
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Professional care tailored to your needs - from elderly care to child support, 
              companionship to post-hospital recovery. We're here for all generations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-12 lg:mb-16">
            {/* Card 1: Elderly Care - Darkest Blue #267ABA */}
            <Link href="/care/booking" className="group">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden text-left h-full transition-all hover:shadow-xl" style={{ backgroundColor: '#267ABA' }}>
                <div className="p-6 sm:p-7 lg:p-8">
                  <Users className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Elderly Care</h3>
                  <p className="text-xs sm:text-sm text-white/90">
                    Specialized care for seniors with medical monitoring, companionship, 
                    and assistance with daily activities to maintain independence and dignity.
                  </p>
                </div>
                <div className="relative h-48">
                  <Image src="/images/elderly-care.jpg" alt="Elderly Care" fill className="object-cover" />
                </div>
              </div>
            </Link>

            {/* Card 2: Home Care - Blue Bell #5CA3D6 */}
            <Link href="/care/booking" className="group">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden text-left h-full transition-all hover:shadow-xl" style={{ backgroundColor: '#5CA3D6' }}>
                <div className="p-6 sm:p-7 lg:p-8">
                  <HomeIcon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Home Care</h3>
                  <p className="text-xs sm:text-sm text-white/90">
                    Professional in-home support including personal care, meal preparation, 
                    medication reminders, and household assistance.
                  </p>
                </div>
                <div className="relative h-48">
                  <Image src="/images/home-care.jpg" alt="Home Care" fill className="object-cover" />
                </div>
              </div>
            </Link>

            {/* Card 3: Companionship - Cool Sky #77B7E4 */}
            <Link href="/care/booking" className="group">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden text-left h-full transition-all hover:shadow-xl" style={{ backgroundColor: '#77B7E4' }}>
                <div className="p-6 sm:p-7 lg:p-8">
                  <Heart className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Companionship</h3>
                  <p className="text-xs sm:text-sm text-white/90">
                    Emotional support and social interaction to combat loneliness, 
                    with engaging activities and meaningful conversations.
                  </p>
                </div>
                <div className="relative h-48">
                  <Image src="/images/companionship.jpg" alt="Companionship" fill className="object-cover" />
                </div>
              </div>
            </Link>

            {/* Card 4: Child Care - Sky Blue #91CBF1 */}
            <Link href="/care/booking" className="group">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden text-left h-full transition-all hover:shadow-xl" style={{ backgroundColor: '#91CBF1' }}>
                <div className="p-6 sm:p-7 lg:p-8">
                  <Baby className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-gray-800 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Child Care</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Qualified caregivers for children with special needs or requiring 
                    additional support, ensuring safety and development.
                  </p>
                </div>
                <div className="relative h-48">
                  <Image src="/images/child-care.jpg" alt="Child Care" fill className="object-cover" />
                </div>
              </div>
            </Link>

            {/* Card 5: Personal Assistance - Icy Blue #A9D8F5 */}
            <Link href="/care/booking" className="group">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden text-left h-full transition-all hover:shadow-xl" style={{ backgroundColor: '#A9D8F5' }}>
                <div className="p-6 sm:p-7 lg:p-8">
                  <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-gray-800 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Personal Assistance</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Help with daily tasks, errands, transportation, and personal care 
                    to maintain independence and quality of life.
                  </p>
                </div>
                <div className="relative h-48">
                  <Image src="/images/personal-assistance.webp" alt="Personal Assistance" fill className="object-cover" />
                </div>
              </div>
            </Link>

            {/* Card 6: Post Hospital Recovery - Pale Sky #C1E4F8 (Lightest) */}
            <Link href="/care/booking" className="group">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden text-left h-full transition-all hover:shadow-xl" style={{ backgroundColor: '#C1E4F8' }}>
                <div className="p-6 sm:p-7 lg:p-8">
                  <Clock className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-gray-800 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">Post Hospital Recovery</h3>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Specialized post-surgical and recovery care at home with medical 
                    monitoring and rehabilitation support.
                  </p>
                </div>
                <div className="relative h-48">
                  <Image src="/images/post-hospital-recovery.jpg" alt="Post Hospital Recovery" fill className="object-cover" />
                </div>
              </div>
            </Link>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link
              href="/care/booking"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-white font-semibold rounded-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: '#267ABA' }}
            >
              <span>Request a Caregiver Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Caregivers Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide mb-2 sm:mb-3" style={{ color: '#267ABA' }}>
              About AGCC
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Compassionate Care<br />When You Need It Most
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Our certified caregivers are dedicated to improving quality of life through personalized support. 
              From daily assistance and companionship to specialized medical care, we're here to help you and 
              your loved ones maintain independence, dignity, and comfort.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {/* Care for Seniors Card */}
            <div className="rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 text-left" style={{ backgroundColor: '#267ABA' }}>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                Care Services at AGCC
              </h3>
              <p className="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6">
                We provide comprehensive care services with 24/7 medical monitoring, 
                daily activities, nutritious meals, and compassionate support tailored to each person's medical condition 
                and care needs.
              </p>
              <Link
                href="/care/seniors"
                className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow inline-block"
                style={{ color: '#267ABA' }}
              >
                Learn More
              </Link>
            </div>

            {/* Why Choose AGCC */}
            <div className="rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8" style={{ backgroundColor: '#91CBF1' }}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Why Choose Us?</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" style={{ color: '#267ABA' }} />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">Certified Caregivers</p>
                    <p className="text-[10px] sm:text-xs text-gray-700">Fully trained and qualified professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" style={{ color: '#267ABA' }} />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">Genuine Compassion</p>
                    <p className="text-[10px] sm:text-xs text-gray-700">Care with empathy and respect</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" style={{ color: '#267ABA' }} />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">24/7 Availability</p>
                    <p className="text-[10px] sm:text-xs text-gray-700">Round-the-clock support when needed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Become a Caregiver Card */}
            <div className="rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 text-left" style={{ backgroundColor: '#C1E4F8' }}>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Become a Caregiver
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
                Join our team of professional caregivers. Make a difference in people's lives 
                while building a rewarding career in healthcare.
              </p>
              <Link
                href="/careers/apply"
                className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg hover:shadow-md transition-shadow inline-block"
                style={{ backgroundColor: '#267ABA', color: 'white' }}
              >
                Apply Now
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Content Section */}
      <ContentSection />

      {/* FAQs Section */}
      <FaqsSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
