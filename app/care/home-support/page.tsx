import Link from 'next/link';
import { ArrowRight, Home as HomeIcon, Utensils, ShoppingBag, Shirt } from 'lucide-react';
import FooterSection from '@/components/footer';

export default function HomeSupportPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Home Support Services
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Assistance with daily household tasks and activities
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-600 leading-relaxed text-center">
            AGCR's home support services help individuals maintain independence and quality of life 
            by providing professional assistance with everyday household tasks, personal care, and medical support. 
            Our caregivers visit your home to deliver personalized care based on your medical condition and daily needs.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Services We Provide</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <HomeIcon className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Light Housekeeping</h3>
            <p className="text-gray-600">
              Cleaning, organizing, laundry, and maintaining a safe, comfortable 
              living environment tailored to individual needs.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Utensils className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Meal Preparation</h3>
            <p className="text-gray-600">
              Planning, shopping, and preparing nutritious meals according to dietary 
              requirements and personal preferences.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <ShoppingBag className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Errands & Shopping</h3>
            <p className="text-gray-600">
              Grocery shopping, pharmacy visits, and running essential errands to 
              ensure all household needs are met.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Shirt className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Care Assistance</h3>
            <p className="text-gray-600">
              Help with grooming, bathing, dressing, and other personal care activities 
              to maintain dignity and comfort.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Home Support Services</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Maintain independence at home with professional support for daily tasks 
            and household activities.
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
