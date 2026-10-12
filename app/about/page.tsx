import Link from 'next/link';
import { ArrowRight, Heart, Shield, Users, Award } from 'lucide-react';
import FooterSection from '@/components/footer';

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About AGCC
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            All Generations Care and Companionship Rwanda
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            All Generations Care and Companionship Rwanda (AGCC) is a retirement house and care center 
            providing comprehensive caregiving services for all generations in Rwanda. We offer specialized 
            residential care in our retirement facility, as well as professional in-home and hospital caregiving 
            services tailored to each patient's medical condition and needs.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Whether caring for elderly individuals, children with special needs, or providing post-hospital 
            recovery support, our certified caregivers deliver compassionate, personalized care based on 
            medical assessments. Services are available at our care center, in your home, or at the hospital
            ensuring continuous support wherever you need it.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe in professional care, genuine compassion, and building trust with families. 
            Our team is dedicated to ensuring comfort, safety, and dignity for every person we serve. 
            Each caregiver relationship is governed by a confidential contract between the client and AGCC, 
            protecting privacy and establishing clear expectations.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compassion</h3>
              <p className="text-sm text-gray-600">Genuine care with empathy and respect</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-sm text-gray-600">Reliable and confidential service</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <Award className="w-10 h-10 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">Certified, trained professionals</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <Users className="w-10 h-10 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600">Supporting families across Rwanda</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8">
          Request a caregiver today or join our team of professional caregivers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/care/booking"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: '#267ABA' }}
          >
            <span>Request a Caregiver</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/careers/apply"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-gray-700 font-semibold rounded-lg border-2 transition-all hover:shadow-lg"
            style={{ borderColor: '#267ABA' }}
          >
            <span>Become a Caregiver</span>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <FooterSection />
    </main>
  );
}
