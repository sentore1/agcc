'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/images4.jpg',
    '/hero-section-image.jpg',
    '/other-images.jpg',
  ];

  useEffect(() => {
    setMounted(true);
    
    // Auto-advance slider every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative bg-white pt-32 pb-0">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Content - Text Section */}
        <div className="grid lg:grid-cols-2 gap-12 pb-12">
          {/* Left - Heading */}
          <div className="pt-8">
            <h1 
              className={`text-4xl sm:text-5xl lg:text-[3rem] font-normal leading-[1.1] text-gray-900 ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}
            >
              All Generations<br />
              <span className="font-semibold">Care & Companionship</span>
            </h1>
          </div>

          {/* Right - Description & CTA */}
          <div className="pt-8 flex flex-col justify-start">
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md">
              Professional care services for seniors, children, and families in Rwanda. 
              Compassionate support at home or in hospital, tailored to your loved one's medical condition and needs.
            </p>
            <Link
              href="/care/booking"
              className="group inline-flex items-center justify-center gap-2 w-fit rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all"
              style={{ backgroundColor: '#267ABA' }}
            >
              <span>Request a Caregiver</span>
              <div className="flex items-center justify-center w-6 h-6 bg-white rounded-md">
                <ArrowRight className="w-3.5 h-3.5 text-gray-900 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom - Full Width Image Section with Overlaid Card */}
        <div className="relative">
          {/* Large Background Image Card with Slider */}
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden shadow-xl">
            <div className="aspect-[21/9] relative">
              {/* Slider Images */}
              {slides.map((slide, index) => (
                <div
                  key={slide}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={slide}
                    alt={`Professional caregiver providing care - slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Overlay for better card visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />

              {/* Slider Dots */}
              <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? 'w-8 bg-white'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Overlaid Stats Card - Left Side */}
          <div 
            className={`absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s', width: '320px' }}
          >
            {/* Avatars with expand icon */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-3">
                <div className="w-11 h-11 rounded-full border-3 border-white shadow-sm overflow-hidden" style={{ backgroundColor: '#267ABA' }}>
                  <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                    A
                  </div>
                </div>
                <div className="w-11 h-11 rounded-full border-3 border-white shadow-sm overflow-hidden" style={{ backgroundColor: '#5CA3D6' }}>
                  <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                    G
                  </div>
                </div>
                <div className="w-11 h-11 rounded-full border-3 border-white shadow-sm overflow-hidden" style={{ backgroundColor: '#77B7E4' }}>
                  <div className="w-full h-full flex items-center justify-center text-white font-semibold text-sm">
                    C
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>

            {/* Number */}
            <div className="text-6xl font-bold text-gray-900 mb-2">372+</div>
            <div className="text-sm text-gray-600 mb-8">
              families supported with<br />compassionate care services
            </div>

            {/* Enhanced Chart with Values */}
            <div className="space-y-3">
              {/* Chart Container with Gray Background */}
              <div className="bg-gray-100 rounded-xl p-4 pt-8">
                <div className="flex items-end justify-between gap-2.5 h-24 relative">
                  {[
                    { label: 'Seniors', height: '85%', value: '215' },
                    { label: 'Children', height: '45%', value: '82' },
                    { label: 'Support', height: '30%', value: '45' },
                    { label: 'Hospital', height: '55%', value: '98' },
                    { label: 'Home', height: '78%', value: '187' },
                    { label: 'Total', height: '100%', value: '372+', isActive: true },
                  ].map((bar, index) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center relative">
                      {/* Value Label - Shows only on active bar */}
                      {bar.isActive && (
                        <div 
                          className="absolute -top-10 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md z-10" 
                          style={{ backgroundColor: '#267ABA' }}
                        >
                          {bar.value}
                        </div>
                      )}
                      
                      {/* Bar */}
                      <div 
                        className="w-full rounded-t-lg min-h-[50px] transition-all"
                        style={{ 
                          height: bar.height,
                          backgroundColor: bar.isActive ? '#267ABA' : '#cbd5e1'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Service Type Labels */}
              <div className="flex justify-between text-[10px] text-gray-500 px-1">
                <span>Seniors</span>
                <span>Children</span>
                <span>Support</span>
                <span>Hospital</span>
                <span>Home</span>
                <span className="font-bold" style={{ color: '#267ABA' }}>Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
