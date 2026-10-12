import Link from 'next/link';
import { ArrowRight, Heart, Clock, Users, Shield } from 'lucide-react';
import FooterSection from '@/components/footer';

export default function HospitalSupportPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Hospital Support Services
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Professional bedside care and compassionate support during hospital stays
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-600 leading-relaxed text-center">
            AGCC's hospital support services provide compassionate care and reliable assistance during 
            hospital stays and medical treatments. Our trained caregivers ensure patients receive the 
            support they need while maintaining dignity, comfort, and safety throughout their 
            hospitalization journey.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Services We Provide</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Heart className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Bedside Care</h3>
            <p className="text-gray-600">
              Round-the-clock or scheduled support during hospital stays, including personal care, 
              companionship, and assistance with meals and comfort needs.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Users className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Patient Companionship</h3>
            <p className="text-gray-600">
              Emotional support and companionship during hospital stays, reducing anxiety and 
              providing comfort through difficult times.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Hospital Stay Monitoring</h3>
            <p className="text-gray-600">
              Continuous monitoring of patient needs, coordinating with hospital staff, and ensuring 
              timely assistance with personal care and comfort requirements.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Post-Surgery Hospital Care</h3>
            <p className="text-gray-600">
              Specialized bedside support following surgical procedures, ensuring proper recovery, 
              medication management, and patient comfort during hospitalization.
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 p-8 rounded-2xl bg-gray-50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Hospital Support Services?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Trained Healthcare Assistants</h4>
              <p className="text-gray-600 text-sm">
                Our caregivers are trained in hospital protocols and patient care procedures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ 24/7 Availability</h4>
              <p className="text-gray-600 text-sm">
                Flexible scheduling including overnight care and emergency support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Family Peace of Mind</h4>
              <p className="text-gray-600 text-sm">
                Regular updates to family members about patient condition and care provided.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Cultural Sensitivity</h4>
              <p className="text-gray-600 text-sm">
                Respectful care that honors individual preferences, beliefs, and dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Hospital Support Services</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ensure your loved one receives compassionate care and support during hospital stays 
            and medical appointments with our professional caregivers.
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
