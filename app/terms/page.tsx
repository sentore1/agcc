import FooterSection from '@/components/footer';

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="py-20 pt-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions of Service
          </h1>
          <p className="text-lg text-gray-600">
            All Generations Care and Companionship Rwanda (AGCC)
          </p>
          <p className="text-sm text-gray-400 mt-2">Last Updated: October 2026</p>
        </div>
      </section>

      <section className="pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-10">

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introduction and Scope of Services</h2>
            <p>All Generations Care and Companionship Rwanda (AGCC), hereinafter referred to as "AGCC," provides professional caregiving, companionship, and support services to individuals and families in Rwanda.</p>
            <p className="mt-3">Our services may include:</p>
            <ul className="mt-2 space-y-1 list-disc ml-6">
              <li>In-home care and daily living assistance</li>
              <li>Hospital support and bedside companionship</li>
              <li>Patient escort and assistance with appointments</li>
              <li>Elderly care and specialized support for children and adults</li>
              <li>Companionship and non-medical personal assistance</li>
              <li>Other caregiving services agreed upon in writing</li>
            </ul>
            <p className="mt-3">All services are subject to caregiver availability, an assessment of the client's needs, and the suitability of the requested services. Specialized care may require additional qualifications, medical guidance, or professional referrals.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Booking and Service Confirmation</h2>
            <p>All service requests must be submitted through AGCC's official website or another booking channel expressly authorized by AGCC.</p>
            <p className="mt-3">Submitting a booking request does not automatically guarantee service availability. A booking is confirmed only after AGCC has reviewed the request, confirmed caregiver availability, agreed on the service arrangements and applicable fees, and verified the required payment.</p>
            <p className="mt-3">AGCC reserves the right to request additional information or an assessment before accepting a booking.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Fees and Payment</h2>
            <p>Clients must pay the agreed service fees before their bookings are confirmed, unless AGCC expressly agrees otherwise in writing.</p>
            <p className="mt-3">Accepted payment methods include MTN Mobile Money (MoMo), Airtel Money, and bank transfer. Clients must submit valid proof of payment through the designated booking process.</p>
            <p className="mt-3">Any additional charges, including extended hours, transport, special requirements, or changes to the agreed service, must be communicated to and agreed upon by the Client before the additional charges are incurred, except where an urgent arrangement is necessary to protect the client's safety and applicable law permits it.</p>
            <p className="mt-3">AGCC will communicate the applicable rates and payment requirements before confirming the booking.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Cancellation, Rescheduling and Refund Policy</h2>
            <p>Clients may cancel a confirmed booking subject to the following policy:</p>
            <ul className="mt-3 space-y-2 list-disc ml-6">
              <li><strong>48 hours or more before the scheduled start:</strong> A refund of the amount paid, less a 10% administrative fee.</li>
              <li><strong>At least 24 hours but less than 48 hours before the scheduled start:</strong> A refund of 50% of the amount paid.</li>
              <li><strong>Less than 24 hours before the scheduled start:</strong> No refund, subject to applicable law and any exceptional circumstances approved by AGCC.</li>
            </ul>
            <p className="mt-3">Cancellation requests must be submitted through an official AGCC communication channel. The applicable notice period will be calculated using the scheduled service start time and the time AGCC receives the cancellation request.</p>
            <p className="mt-3">If AGCC cancels a confirmed booking because it cannot provide the agreed service, the Client may choose either a full refund of the amount paid for the affected service or rescheduling without an additional booking fee.</p>
            <p className="mt-3">Requests involving hospitalization, death, or other serious emergencies will be reviewed individually. AGCC may offer a refund, partial refund, or rescheduling, taking into account the circumstances and applicable law.</p>
            <p className="mt-3">Refunds will be processed through the original payment method where reasonably possible. Where that is not possible, an alternative method may be agreed upon with the Client. Processing times may depend on the relevant payment provider or bank.</p>
            <p className="mt-3">Nothing in this policy excludes any refund or other right that cannot lawfully be excluded.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Caregiver Qualifications and Responsibilities</h2>
            <p>AGCC will take reasonable steps to verify caregiver identity, references, qualifications, experience, and suitability for assigned duties.</p>
            <p className="mt-3">Where a service requires certification, professional registration, or specialized training, AGCC will take reasonable steps to ensure that the assigned caregiver meets the applicable requirements.</p>
            <p className="mt-3">Caregivers are expected to:</p>
            <ul className="mt-2 space-y-1 list-disc ml-6">
              <li>Treat clients with dignity, patience, and respect</li>
              <li>Protect client privacy and confidential information</li>
              <li>Perform only duties within their qualifications, training, and agreed responsibilities</li>
              <li>Follow the agreed care plan and applicable safety procedures</li>
              <li>Communicate relevant concerns, incidents, or changes in the client's condition promptly</li>
              <li>Maintain professional boundaries and avoid unauthorized use of client property or funds</li>
              <li>Comply with applicable laws, safeguarding requirements, and AGCC policies</li>
            </ul>
            <p className="mt-3">AGCC will make reasonable efforts to provide a suitable replacement if an assigned caregiver becomes unavailable. Replacement arrangements remain subject to availability and the nature of the requested service.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Client and Family Responsibilities</h2>
            <p>Clients, their families, or their authorized representatives must:</p>
            <ul className="mt-2 space-y-1 list-disc ml-6">
              <li>Provide accurate and complete information about relevant medical conditions, allergies, medications, mobility limitations, behavioral concerns, and care requirements</li>
              <li>Inform AGCC promptly of changes in the client's health or circumstances</li>
              <li>Provide a reasonably safe working environment for caregivers</li>
              <li>Disclose known risks that may affect the safety of the client or caregiver</li>
              <li>Treat caregivers respectfully and refrain from harassment, abuse, discrimination, or unsafe conduct</li>
              <li>Ensure that agreed fees are paid on time</li>
              <li>Provide necessary instructions, emergency contacts, and relevant care documentation</li>
              <li>Obtain any necessary consent or authorization for care, information sharing, and decisions made on behalf of the client</li>
            </ul>
            <p className="mt-3">AGCC may suspend, modify, or decline a service where essential information is withheld, the environment presents an unacceptable risk, or the requested duties fall outside the agreed scope of care.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Medical Limitations and Emergencies</h2>
            <p>AGCC provides caregiving and support services within the agreed scope of each booking. Unless expressly provided by appropriately qualified and authorized healthcare professionals, these services do not constitute medical diagnosis, treatment, or emergency medical care.</p>
            <p className="mt-3">Caregivers must not undertake medical procedures, administer treatments, or perform other regulated clinical duties beyond their qualifications and legal authorization.</p>
            <p className="mt-3">Caregivers do not replace doctors, nurses, ambulance services, or other emergency responders. If a client experiences a medical emergency, the caregiver or responsible person should contact the appropriate emergency services and notify the Client's designated contact as soon as reasonably possible.</p>
            <p className="mt-3">AGCC does not guarantee any particular medical outcome or recovery. This does not exclude responsibility for negligence, misconduct, or other liability that cannot lawfully be excluded.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Confidentiality and Data Protection</h2>
            <p>AGCC recognizes that caregiving may involve sensitive personal, family, and medical information.</p>
            <p className="mt-3">AGCC will collect, use, store, and disclose personal information only for legitimate purposes connected with service delivery, safety, administration, legal compliance, or other lawful purposes.</p>
            <p className="mt-3">AGCC will take reasonable technical and organizational measures to protect personal information against unauthorized access, disclosure, alteration, loss, or misuse.</p>
            <p className="mt-3">Personal and medical information will be shared only where necessary for care delivery, with appropriate authorization, or where disclosure is otherwise permitted or required by law.</p>
            <p className="mt-3">AGCC will handle personal data in accordance with applicable Rwandan data protection and privacy laws, including Law No. 058/2021 relating to the protection of personal data and privacy, as applicable. Clients may exercise their applicable data protection rights by contacting AGCC through its official contact details.</p>
            <p className="mt-3">AGCC personnel and caregivers must respect confidentiality during and after their engagement, subject to lawful disclosure obligations and circumstances requiring appropriate action to protect life or safety.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Safeguarding and Protection of Clients</h2>
            <p>AGCC is committed to protecting clients from abuse, neglect, exploitation, harassment, and inappropriate treatment.</p>
            <p className="mt-3">Any reasonable concern about the conduct of a caregiver or the safety of a client should be reported to AGCC promptly.</p>
            <p className="mt-3">AGCC will assess reported concerns and take appropriate action, which may include investigating the matter, changing the caregiver, suspending services, or notifying the relevant authorities where required by law.</p>
            <p className="mt-3">Clients and their representatives must not subject caregivers to abuse, threats, exploitation, or unsafe working conditions.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Liability and Insurance</h2>
            <p>AGCC will take reasonable care in arranging and delivering the services it has agreed to provide.</p>
            <p className="mt-3">AGCC maintains insurance intended to cover relevant business risks, subject to the terms, limits, exclusions, and conditions of its insurance policies. The existence of insurance does not guarantee that every incident or claim will be covered.</p>
            <p className="mt-3">AGCC is not responsible for outcomes arising solely from circumstances outside its reasonable control or from services that fall outside the agreed scope of care, subject to applicable law.</p>
            <p className="mt-3">Nothing in these Terms excludes or limits liability for fraud, wilful misconduct, negligence, personal injury, or any other matter where such exclusion or limitation is prohibited by applicable law.</p>
            <p className="mt-3">Clients are responsible for providing accurate information and complying with the agreed care arrangements. Liability arising from inaccurate information, undisclosed risks, or failure to follow reasonable safety instructions will be assessed according to the circumstances and applicable law.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Changes to Services and Rates</h2>
            <p>AGCC may propose reasonable changes to service arrangements, availability, or rates where necessary because of operational requirements, changes in care needs, or other legitimate circumstances.</p>
            <p className="mt-3">AGCC will provide reasonable advance notice of changes to rates or ongoing service arrangements whenever practicable.</p>
            <p className="mt-3">Changes affecting an existing booking, including additional fees or material changes to the scope of care, must be communicated to the Client and agreed upon before implementation, except where immediate action is reasonably necessary to protect safety or comply with the law.</p>
            <p className="mt-3">If the parties cannot agree on a proposed material change, either party may seek to terminate the affected service arrangement in accordance with these Terms and applicable law.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">12. Service Suspension and Termination</h2>
            <p>AGCC or the Client may request the termination of an ongoing service arrangement by providing reasonable notice, subject to any separately agreed service contract and applicable law.</p>
            <p className="mt-3">AGCC may suspend or terminate services where:</p>
            <ul className="mt-2 space-y-1 list-disc ml-6">
              <li>The Client's needs exceed the available caregiver's qualifications or the agreed service scope</li>
              <li>The working environment presents a serious safety risk</li>
              <li>Required payments remain outstanding</li>
              <li>There is serious misconduct, abuse, or a material breach of these Terms</li>
              <li>Continuing the service would violate applicable law</li>
            </ul>
            <p className="mt-3">Where reasonably practicable, AGCC will notify the Client of the reason for suspension or termination and discuss suitable alternatives.</p>
            <p className="mt-3">Any refund following termination will be determined in accordance with the cancellation policy, the terms of the relevant booking, and applicable law.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">13. Complaints and Dispute Resolution</h2>
            <p>Clients are encouraged to report concerns or complaints directly to AGCC using the contact details below.</p>
            <p className="mt-3">AGCC will make reasonable efforts to review complaints promptly and seek a fair resolution through direct communication.</p>
            <p className="mt-3">If a dispute cannot be resolved through direct communication, the parties may pursue mediation or other lawful dispute resolution procedures where appropriate.</p>
            <p className="mt-3">Any unresolved dispute will be handled in accordance with the applicable laws of the Republic of Rwanda and by a competent Rwandan court or other legally authorized forum. Nothing in this section prevents either party from seeking urgent legal relief where necessary.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">14. Amendments to These Terms</h2>
            <p>AGCC may update these Terms from time to time to reflect changes in its services, operational practices, or applicable laws.</p>
            <p className="mt-3">The latest version will be published through AGCC's official website, together with the date of the latest revision.</p>
            <p className="mt-3">Material changes affecting existing bookings will be communicated to affected Clients where reasonably practicable. Changes to an existing agreement will be subject to any applicable contractual requirements and legal protections.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">15. General Provisions</h2>
            <p>These Terms, together with the confirmed booking details and any separate written service agreement, govern the relationship between AGCC and the Client.</p>
            <p className="mt-3">If any provision is found to be invalid or unenforceable, the remaining provisions will continue to apply to the extent permitted by law.</p>
            <p className="mt-3">Failure to enforce a provision on one occasion does not constitute a permanent waiver of that provision.</p>
            <p className="mt-3">Nothing in these Terms creates an employment relationship between the Client and AGCC, or between the Client and an individual caregiver, unless such a relationship arises under applicable law.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">16. Contact Information</h2>
            <p>All Generations Care and Companionship Rwanda (AGCC)</p>
            <ul className="mt-3 space-y-1 list-disc ml-6">
              <li>Email: <a href="mailto:info@agccr.com" className="text-[#267ABA] hover:underline">info@agccr.com</a></li>
              <li>Telephone: <a href="tel:+250783215763" className="text-[#267ABA] hover:underline">+250 783 215 763</a></li>
              <li>Location: 8 KK 569 St, All Generations Care and Companionship (AGCC) Ltd, Kigali, Rwanda</li>
            </ul>
            <p className="mt-3">Clients may use these contact details for bookings, cancellation requests, complaints, privacy-related requests, and other service inquiries.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">17. Acceptance of Terms</h2>
            <p>By submitting a booking request and proceeding with a confirmed service, the Client acknowledges that they have had the opportunity to review these Terms and agrees to the provisions applicable to their booking, subject to applicable law.</p>
            <p className="mt-3">Where the Client is acting through a family member or authorized representative, that person must have the necessary authority to make the booking and provide any required consent.</p>
            <p className="mt-4 text-sm text-gray-400">AGCC Terms and Conditions of Service — Last updated: October 2026</p>
          </div>

        </div>
      </section>

      <FooterSection />
    </main>
  );
}
