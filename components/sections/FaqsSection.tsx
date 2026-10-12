'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'What is AGCC Rwanda?',
    a: 'AGCC (Association Generale des Cadres Consultants) Rwanda is an integrated platform combining professional care management services with comprehensive training programs. We provide quality healthcare services and caregiver training all under one organization.',
  },
  {
    q: 'Who can benefit from AGCC services?',
    a: 'AGCC serves healthcare organizations, professional caregivers, families seeking care services, training providers, and individuals seeking certification in the care sector across Rwanda.',
  },
  {
    q: 'Can I access both care services and training?',
    a: 'Yes. Both divisions are independently accessible. You can use only the care services, only the training academy, or bothyour account gives you access to whichever services your role permits.',
  },
  {
    q: 'How does caregiver assignment work?',
    a: 'When you book a care service, our system matches available caregivers based on skills, location, and schedule. Our team can also manually assign caregivers and manage the full booking lifecycle to ensure quality care.',
  },
  {
    q: 'Are the training certificates recognized?',
    a: 'Certificates issued through AGCC Rwanda Academy are generated upon successful course completion and assessment. Our training programs follow professional standards for caregiver certification in Rwanda.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Our platform is built with enterprise-grade security, encrypted connections, and role-based access controls. We follow industry best practices to keep your data private and protected.',
  },
  {
    q: 'How do I get started?',
    a: 'Simply create a free account using the Sign Up button. You will be guided through selecting your role and accessing the relevant services. No payment is required to start exploring our platform.',
  },
];

export default function FaqsSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3" style={{ color: '#156CAF' }}>
            FAQs
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Frequently asked questions</h2>
          <p className="text-sm sm:text-base text-gray-500 px-4">Everything you need to know about AGCC Rwanda. Can&apos;t find an answer? Contact our support team.</p>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 sm:px-5 lg:px-6 py-4 sm:py-5 text-left"
              >
                <span className="text-xs sm:text-sm font-semibold text-gray-900 pr-3 sm:pr-4">{faq.q}</span>
                <span 
                  className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center transition-all ${open === i ? 'rotate-45 text-white' : 'border-gray-200'}`}
                  style={open === i ? { backgroundColor: '#156CAF', borderColor: '#156CAF' } : {}}
                >
                  <svg className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${open === i ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3 sm:pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
