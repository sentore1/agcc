'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { 
        name: 'Services', 
        href: '/care',
        submenu: [
            { name: 'All Services', href: '/care' },
            { name: 'Care for Seniors', href: '/care/seniors' },
            { name: 'Child & Family Care', href: '/care/children' },
            { name: 'Companionship', href: '/care/companionship' },
            { name: 'Home Support', href: '/care/home-support' },
            { name: 'Hospital Support', href: '/care/hospital-support' },
            { name: 'Patient Escort', href: '/care/patient-escort' },
        ]
    },
    { 
        name: 'Caregiver', 
        href: '/careers/apply',
        submenu: [
            { name: 'Become a Caregiver', href: '/careers/apply' },
            { name: 'Request a Caregiver', href: '/care/booking' },
        ]
    },
    { name: 'Contact Us', href: '/contact' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav
                className={cn(
                    'transition-all duration-300',
                    isScrolled 
                        ? 'bg-white/95 backdrop-blur-md shadow-sm' 
                        : 'bg-white'
                )}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Desktop Navigation - Left */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center gap-3 group"
                            >
                                <Image
                                    src="/long logo.png"
                                    alt="AGCC Logo"
                                    width={216}
                                    height={72}
                                    className="h-18 w-auto"
                                    priority
                                    unoptimized
                                />
                            </Link>

                            <div className="hidden lg:flex items-center gap-1">
                                {menuItems.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className="relative"
                                        onMouseEnter={() => item.submenu && setOpenDropdown(item.name)}
                                        onMouseLeave={() => setOpenDropdown(null)}
                                    >
                                        <Link
                                            href={item.href}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg transition-colors relative flex items-center gap-1 group"
                                        >
                                            {item.name}
                                            {item.submenu && (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gray-900 group-hover:w-3/4 transition-all duration-300" />
                                        </Link>
                                        
                                        {/* Dropdown Menu */}
                                        {item.submenu && openDropdown === item.name && (
                                            <div className="absolute top-full left-0 pt-1 z-50">
                                                <div className="w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                                                    {item.submenu.map((subitem, subindex) => (
                                                        <Link
                                                            key={subindex}
                                                            href={subitem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                                        >
                                                            {subitem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link
                                href="/auth/signin"
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/care/booking"
                                className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all shadow-sm hover:shadow-md"
                                style={{ backgroundColor: '#267ABA' }}
                            >
                                Book Care Service
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuState(!menuState)}
                            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuState ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        'lg:hidden overflow-hidden transition-all duration-300',
                        menuState ? 'max-h-[600px] border-t border-gray-100' : 'max-h-0'
                    )}
                >
                    <div className="bg-white px-4 py-4 space-y-2">
                        {menuItems.map((item, index) => (
                            <div key={index}>
                                <Link
                                    href={item.href}
                                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                    onClick={() => !item.submenu && setMenuState(false)}
                                >
                                    {item.name}
                                </Link>
                                {/* Mobile Submenu */}
                                {item.submenu && (
                                    <div className="ml-4 mt-1 space-y-1">
                                        {item.submenu.map((subitem, subindex) => (
                                            <Link
                                                key={subindex}
                                                href={subitem.href}
                                                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                                onClick={() => setMenuState(false)}
                                            >
                                                {subitem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pt-4 space-y-2 border-t border-gray-100">
                            <Link
                                href="/auth/signin"
                                className="block px-4 py-3 text-center text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setMenuState(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                href="/care/booking"
                                className="block px-4 py-3 text-center text-base font-semibold text-white rounded-lg transition-all"
                                style={{ backgroundColor: '#267ABA' }}
                                onClick={() => setMenuState(false)}
                            >
                                Book Care Service
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
