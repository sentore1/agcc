'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Users, Clock, Shield } from 'lucide-react';

export default function ContentSection() {
  const services = [
    {
      icon: Heart,
      category: 'Elderly Care',
      title: 'Compassionate Senior Care Services',
      excerpt: 'Professional elderly care support ensuring comfort, safety, and dignity for your loved ones.',
      color: '#267ABA',
      href: '/care/seniors',
    },
    {
      icon: Users,
      category: 'Home Care',
      title: 'In-Home Healthcare Support',
      excerpt: 'Comprehensive home care services providing medical monitoring and daily living assistance.',
      color: '#5CA3D6',
      href: '/care/home-support',
    },
    {
      icon: Clock,
      category: '24/7 Support',
      title: 'Round-the-Clock Care Availability',
      excerpt: 'Continuous care and monitoring available whenever you need us, day or night.',
      color: '#77B7E4',
      href: '/care/booking',
    },
    {
      icon: Shield,
      category: 'Specialized Care',
      title: 'Expert Dementia & Memory Care',
      excerpt: 'Specialized support for individuals with dementia, Alzheimer\'s, and memory challenges.',
      color: '#91CBF1',
      href: '/care/companionship',
    },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#267ABA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-sm font-semibold mb-2 text-white">
              Our Services
            </p>
            <h2 className="text-4xl font-bold text-white">
              Professional Care Services<br />Tailored to Your Needs
            </h2>
          </div>
          <Link
            href="/care"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-white font-semibold rounded-xl transition-all hover:shadow-lg"
            style={{ color: '#267ABA' }}
          >
            <span>View All Services</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="group bg-white overflow-hidden transition-all hover:shadow-xl"
                style={{ borderRadius: '19px' }}
              >
                {/* Icon Section with gradient */}
                <div 
                  className="aspect-video relative overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)` }}
                >
                  <IconComponent className="w-16 h-16 text-white" strokeWidth={1.5} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-white text-gray-900 rounded-full">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#267ABA] transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {service.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-gray-900">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/care"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white font-semibold rounded-xl transition-all"
            style={{ color: '#267ABA' }}
          >
            <span>View All Services</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
