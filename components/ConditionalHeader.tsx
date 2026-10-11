'use client';

import { usePathname } from 'next/navigation';
import { HeroHeader } from './header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide header on dashboard pages (dashboard has its own header)
  const isDashboard = pathname?.startsWith('/dashboard');
  
  if (isDashboard) {
    return null;
  }
  
  return <HeroHeader />;
}
