import Link from 'next/link';
import { ArrowRight, Heart, Home as HomeIcon, Clock, Shield } from 'lucide-react';
import FooterSection from '@/components/footer';

export default function SeniorsCarePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Care for Seniors
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Compassionate, professional care for elderly individuals
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-600 leading-relaxed text-center">
            AGCC is a retirement house and care center providing comprehensive services for elderly individuals. 
            Our facility offers residential care with 24/7 medical monitoring, or we can provide in-home and hospital 
            caregiving tailored to your loved one's medical condition. All services are secured through a confidential 
            contract between the family and AGCC.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Senior Care Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <HomeIcon className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Residential Care at AGCC</h3>
            <p className="text-gray-600">
              Our retirement house provides a safe, comfortable environment with round-the-clock care, 
              daily activities, meal preparation, and personalized assistance based on each resident's medical needs.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Monitoring & Support</h3>
            <p className="text-gray-600">
              24/7 medical monitoring, medication management, vital signs tracking, and coordination 
              with healthcare providers for residents and in-home/hospital clients.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Heart className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">In-Home & Hospital Care</h3>
            <p className="text-gray-600">
              Professional caregivers can provide assistance at your home or hospital, including 
              personal care, companionship, and medical support tailored to the patient's condition.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Care Plans</h3>
            <p className="text-gray-600">
              Daily, weekly, or monthly care schedules available. Choose between residential care 
              at our facility or flexible home/hospital caregiving services.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Senior Care Services</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help your loved one maintain independence and dignity with professional, 
            compassionate care tailored to their needs.
          </p>
          <Link
            href="/care/booking"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: '#267ABA' }}
          >
            <span>Request a Caregiver</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <FooterSection />
    </main>
  );
}
