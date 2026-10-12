import Link from 'next/link';
import { ArrowRight, Car, Shield, Clock, MapPin, FileText, Heart } from 'lucide-react';
import FooterSection from '@/components/footer';

export default function PatientEscortPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Patient Escort Services
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Safe and reliable accompaniment to medical appointments, treatments, and healthcare facilities
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-600 leading-relaxed text-center">
            AGCC's patient escort services provide professional accompaniment and support for patients 
            traveling to and from medical appointments, treatments, and healthcare facilities. Our trained 
            caregivers ensure safe transportation, reliable assistance, and compassionate care throughout 
            the entire journey.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Services We Provide</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Car className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Appointment Transportation</h3>
            <p className="text-gray-600">
              Door-to-door accompaniment to doctor visits, specialist appointments, diagnostic tests, 
              and routine medical check-ups with professional caregivers.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Shield className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Treatment & Therapy Escort</h3>
            <p className="text-gray-600">
              Safe accompaniment to chemotherapy, dialysis, physical therapy sessions, and other 
              recurring medical treatments requiring regular visits.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Heart className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Post-Discharge Transport</h3>
            <p className="text-gray-600">
              Assistance with safe transportation from hospital to home after discharge, including 
              help with belongings, medications, and settling in at home.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Appointment Support & Documentation</h3>
            <p className="text-gray-600">
              Help with understanding medical instructions, remembering key information, and 
              communicating healthcare provider recommendations to family members.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <MapPin className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Medical Visits</h3>
            <p className="text-gray-600">
              Rapid response escort services for urgent medical situations, emergency room visits, 
              and unexpected healthcare needs requiring immediate attention.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Scheduled & On-Demand Services</h3>
            <p className="text-gray-600">
              Flexible scheduling for regular appointments or last-minute escort needs, available 
              24/7 to accommodate any healthcare schedule.
            </p>
          </div>
        </div>

        {/* What's Included */}
        <div className="mt-16 p-8 rounded-2xl bg-gray-50">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Included in Our Escort Service</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Door-to-Door Assistance</h4>
              <p className="text-gray-600 text-sm">
                From home to healthcare facility and back, with help getting in and out of vehicles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Waiting Room Support</h4>
              <p className="text-gray-600 text-sm">
                Companionship during waiting periods and assistance with check-in procedures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Medication & Prescription Pickup</h4>
              <p className="text-gray-600 text-sm">
                Help collecting prescriptions and ensuring proper medication understanding.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Communication with Family</h4>
              <p className="text-gray-600 text-sm">
                Regular updates to family members about appointment outcomes and care instructions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Mobility Assistance</h4>
              <p className="text-gray-600 text-sm">
                Support for patients with limited mobility, using wheelchairs, walkers, or other aids.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✓ Trained Professional Caregivers</h4>
              <p className="text-gray-600 text-sm">
                Experienced staff trained in patient care, safety protocols, and medical sensitivity.
              </p>
            </div>
          </div>
        </div>

        {/* Who Benefits Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Who Benefits from Patient Escort Services?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-2xl">👴</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Elderly Patients</h4>
              <p className="text-gray-600 text-sm">
                Seniors who need reliable transportation and support for medical appointments
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-2xl">♿</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Limited Mobility Patients</h4>
              <p className="text-gray-600 text-sm">
                Individuals requiring physical assistance or wheelchair support during travel
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Chronic Condition Patients</h4>
              <p className="text-gray-600 text-sm">
                Those with ongoing treatments requiring regular medical facility visits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Patient Escort Service</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ensure safe, reliable transportation and professional support for all medical appointments 
            and healthcare visits with our experienced patient escort caregivers.
          </p>
          <Link
            href="/care/booking"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-semibold rounded-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: '#267ABA' }}
          >
            <span>Request an Escort Caregiver</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <FooterSection />
    </main>
  );
}
