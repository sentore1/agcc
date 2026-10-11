import Link from 'next/link'
import Image from 'next/image'

const links = [
    { title: 'About Us', href: '/about' },
    { title: 'Services', href: '/care' },
    { title: 'Academy', href: '/academy' },
    { title: 'Care for Seniors', href: '/care/seniors' },
    { title: 'Child & Family Care', href: '/care/children' },
    { title: 'Companionship', href: '/care/companionship' },
    { title: 'Home Support', href: '/care/home-support' },
    { title: 'Become a Caregiver', href: '/careers/apply' },
    { title: 'Request a Caregiver', href: '/care/booking' },
    { title: 'Contact Us', href: '/contact' },
]

export default function FooterSection() {
    return (
        <footer className="py-16 bg-white">
            <div className="mx-auto max-w-5xl px-6">
                <Link href="/" aria-label="go home" className="mx-auto block w-fit">
                    <Image 
                        src="/logo.png" 
                        alt="Logo" 
                        width={250} 
                        height={80}
                        className="h-20 w-auto"
                        priority
                        unoptimized
                    />
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6">
                    {links.map((link, index) => (
                        <Link key={index} href={link.href} className="text-gray-700 hover:text-gray-900 block duration-150 font-medium">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link href="https://www.instagram.com/agcr_rwanda" target="_blank" rel="noopener noreferrer" aria-label="Instagram - AGCR Rwanda" className="text-gray-600 hover:text-gray-900 block">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                        </svg>
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-gray-900 block">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
                        </svg>
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 hover:text-gray-900 block">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                        </svg>
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter" className="text-gray-600 hover:text-gray-900 block">
                        <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z" />
                        </svg>
                    </Link>
                </div>

                <div className="my-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">All Generations Care and Companionship Rwanda (AGCR)</p>
                    <p className="text-xs text-gray-500">Care center for all generations  & Retirement house</p>
                    <p className="text-xs text-gray-500 mt-2">Care at our facility | Care at home | Care in hospital</p>
                    <p className="text-xs text-gray-500">Professional care • Genuine compassion • Family you can trust</p>
                </div>

                <span className="text-gray-600 block text-center text-sm">
                    © {new Date().getFullYear()} AGCR - All Generations Care & Companionship Rwanda. All rights reserved
                </span>
            </div>
        </footer>
    )
}
