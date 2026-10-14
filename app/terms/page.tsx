import FooterSection from '@/components/footer';

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            All Generations Care and Companionship Rwanda (AGCC)
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to All Generations Care and Companionship Rwanda (AGCC). By booking our caregiving 
              services, you agree to be bound by these Terms and Conditions. Please read them carefully 
              before proceeding with your booking.
            </p>
          </div>

          {/* Service Agreement */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Service Agreement</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              1.1. AGCC provides professional caregiving services including in-home care, hospital support, 
              companionship, patient escort, and specialized care for seniors and children.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              1.2. All services are subject to caregiver availability and medical assessment.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              1.3. Each caregiver relationship is governed by a confidential contract between the client and AGCC.
            </p>
          </div>

          {/* Booking and Payment */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Booking and Payment</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              2.1. All bookings must be made through our official website or authorized channels.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              2.2. Payment must be completed before service confirmation. We accept payments via Mobile Money 
              (MTN MoMo and Airtel Money) and Bank Transfer.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              2.3. Payment proof must be uploaded at the time of booking for verification.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              2.4. Service rates are determined based on service type, duration, and specific care requirements.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              2.5. AGCC reserves the right to adjust pricing with reasonable notice to clients.
            </p>
          </div>

          {/* Cancellation and Refund Policy */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cancellation and Refund Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              3.1. <strong>Client Cancellations:</strong>
            </p>
            <ul className="ml-6 mb-3 text-gray-600 space-y-2">
              <li>• Cancellations made more than 48 hours before the scheduled service: Full refund minus 10% administrative fee</li>
              <li>• Cancellations made 24-48 hours before service: 50% refund</li>
              <li>• Cancellations made less than 24 hours before service: No refund</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3">
              3.2. <strong>AGCC Cancellations:</strong> If we cannot fulfill a confirmed booking due to caregiver 
              unavailability or unforeseen circumstances, we will provide a full refund or reschedule at no additional cost.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              3.3. Emergency cancellations due to hospitalization or death will be reviewed on a case-by-case basis.
            </p>
          </div>

          {/* Caregiver Responsibilities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Caregiver Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              4.1. All AGCC caregivers are certified, trained, and vetted professionals.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              4.2. Caregivers will provide services as outlined in the service agreement and based on 
              medical assessments where applicable.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              4.3. Caregivers are required to maintain professional conduct and respect client privacy at all times.
            </p>
          </div>

          {/* Client Responsibilities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Client Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              5.1. Clients must provide accurate and complete medical information relevant to the care needed.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              5.2. Clients must ensure a safe working environment for caregivers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              5.3. Clients agree to treat caregivers with respect and professionalism.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              5.4. Any changes to care requirements must be communicated to AGCC promptly.
            </p>
          </div>

          {/* Confidentiality and Privacy */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Confidentiality and Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              6.1. AGCC is committed to protecting your personal and medical information.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              6.2. All information provided will be kept confidential and used only for service delivery purposes.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              6.3. We comply with applicable data protection laws and regulations in Rwanda.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              6.4. Information may be shared with caregivers only to the extent necessary to provide quality care.
            </p>
          </div>

          {/* Liability and Insurance */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Liability and Insurance</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              7.1. AGCC maintains appropriate insurance coverage for our caregiving services.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              7.2. While we strive for excellence, AGCC is not liable for medical outcomes beyond the scope 
              of caregiving services provided.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              7.3. Emergency medical situations require immediate contact with medical professionals. 
              Caregivers will assist but are not substitutes for emergency medical services.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              7.4. Clients are responsible for any damage or harm caused to caregivers while on duty.
            </p>
          </div>

          {/* Service Modifications */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Modifications</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              8.1. AGCC reserves the right to modify service offerings, rates, and terms with reasonable notice.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              8.2. Clients will be notified of any significant changes that affect their ongoing service agreements.
            </p>
          </div>

          {/* Dispute Resolution */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              9.1. Any disputes arising from these terms or service delivery should first be addressed 
              through direct communication with AGCC management.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              9.2. If resolution cannot be reached, disputes will be handled in accordance with Rwandan law.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              For questions about these Terms and Conditions or our services, please contact us:
            </p>
            <ul className="ml-6 mb-3 text-gray-600 space-y-2">
              <li>• Email: info@agccr.com</li>
              <li>• Phone: +250 788 123 456</li>
              <li>• Address: Kigali, Rwanda</li>
            </ul>
          </div>

          {/* Acceptance */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              By booking our services, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms and Conditions.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>Last Updated:</strong> October 2026
            </p>
          </div>

        </div>
      </section>
      
      {/* Footer */}
      <FooterSection />
    </main>
  );
}
