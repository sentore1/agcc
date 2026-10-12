import Link from 'next/link';
import { ArrowRight, Baby, Heart, Shield, Smile } from 'lucide-react';
import FooterSection from '@/components/footer';

export default function ChildrenCarePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Child & Family Care
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Qualified support for children and families
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-600 leading-relaxed text-center">
            AGCC provides specialized care for children with medical conditions and special needs. 
            Our caregivers are trained to support children at home, in hospital, or at our care center, 
            delivering compassionate assistance tailored to each child's health requirements. 
            All services are secured through a confidential contract with families.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Child Care Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Baby className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Special Needs Support</h3>
            <p className="text-gray-600">
              Trained caregivers provide specialized care for children with developmental, 
              physical, or medical needs, ensuring safety and promoting development.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Care</h3>
            <p className="text-gray-600">
              Professional medical monitoring, medication administration, and coordination 
              with healthcare providers for children with chronic conditions.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Heart className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Support</h3>
            <p className="text-gray-600">
              Respite care for parents and comprehensive support services to help 
              families navigate the challenges of caring for children with special needs.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Smile className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Developmental Activities</h3>
            <p className="text-gray-600">
              Age-appropriate activities and therapies designed to promote physical, 
              cognitive, and emotional development in a safe, nurturing environment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Child Care Services</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Give your child the specialized care and support they need with our 
            qualified and compassionate caregivers.
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
