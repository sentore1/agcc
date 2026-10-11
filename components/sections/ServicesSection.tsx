'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase-client';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface ServiceType {
  id: string;
  name: string;
  description: string | null;
  price_per_hour: number | null;
  price_per_day: number | null;
}

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    const loadServices = async () => {
      const { data, error } = await supabase
        .from('service_types')
        .select('id, name, description')
        .eq('is_active', true)
        .order('name', { ascending: true })
        .limit(4);
      
      if (data) setServices(data);
      setLoading(false);
    };

    loadServices();
  }, []);

  const serviceNumbers = ['01', '02', '03', '04'];

  return (
    <section className="h-full py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold mb-2" style={{ color: '#156CAF' }}>
          What We Offer
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Better Living Care<br />Services
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div 
            className="h-8 w-8 animate-spin rounded-full border-3 border-t-transparent" 
            style={{ borderColor: '#98D2FA', borderTopColor: 'transparent' }}
          />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-6xl mb-4">🏥</div>
          <p className="text-gray-400">No services available yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.slice(0, 4).map((service, index) => (
            <Link
              key={service.id}
              href="/care/booking"
              className="group block bg-white rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg transition-all p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span 
                    className="text-2xl font-bold flex-shrink-0"
                    style={{ color: '#156CAF' }}
                  >
                    {serviceNumbers[index]}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-[#156CAF] transition-colors">
                      {service.name}
                    </h3>
                    
                    {service.description && (
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>

                <ChevronRight 
                  className="w-5 h-5 text-gray-400 group-hover:text-[#156CAF] group-hover:translate-x-1 transition-all flex-shrink-0" 
                />
              </div>
            </Link>
          ))}

          {/* Get In Touch Button */}
          <Link
            href="/care"
            className="group flex items-center justify-center gap-2 w-full bg-[#156CAF] hover:bg-[#0d5a94] text-white font-semibold py-4 px-6 rounded-xl transition-all hover:shadow-lg"
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  );
}
