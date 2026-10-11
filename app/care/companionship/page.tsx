import Link from 'next/link';
import { ArrowRight, Heart, MessageCircle, Users, Coffee } from 'lucide-react';
import FooterSection from '@/components/footer';

export default function CompanionshipPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Companionship Services
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Emotional support and meaningful social interaction
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-600 leading-relaxed text-center">
            Loneliness can significantly impact physical and mental health. AGCR's companionship services 
            provide emotional support, social interaction, and engaging activities for residents at our 
            retirement house, as well as for clients receiving care at home or in hospital. 
            These services enhance quality of life for individuals of all ages.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <MessageCircle className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Meaningful Conversations</h3>
            <p className="text-gray-600">
              Friendly, engaging discussions and active listening to provide emotional 
              support and combat feelings of isolation.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Coffee className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Social Activities</h3>
            <p className="text-gray-600">
              Outings, hobbies, games, reading, and other activities tailored to 
              individual interests and preferences.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Users className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Connection</h3>
            <p className="text-gray-600">
              Assistance with technology to connect with family members, and support 
              for maintaining relationships with loved ones.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-lg transition-shadow">
            <Heart className="w-8 h-8 mb-4" style={{ color: '#267ABA' }} />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Emotional Well-being</h3>
            <p className="text-gray-600">
              Compassionate presence, encouragement, and support to promote 
              positive mental health and overall well-being.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 rounded-2xl bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Companionship Services</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Help your loved one feel connected, engaged, and supported with our 
            professional companionship services.
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
