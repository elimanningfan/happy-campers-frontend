import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/HC_Logo.png"
                  alt="Happy Campers"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-xl font-bold">Happy Campers</span>
            </div>
            <p className="text-sm text-gray-400">
              Your adventure starts here! Premium RV rentals in the Pacific Northwest.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rvs" className="text-gray-400 hover:text-white transition-colors">
                  Browse RVs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-gray-400 hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* RV Types */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              RV Types
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/rvs?type=Class+B" className="text-gray-400 hover:text-white transition-colors">
                  Class B Vans
                </Link>
              </li>
              <li>
                <Link href="/rvs?type=Class+B%2B" className="text-gray-400 hover:text-white transition-colors">
                  Class B+ RVs
                </Link>
              </li>
              <li>
                <Link href="/rvs?type=Class+C" className="text-gray-400 hover:text-white transition-colors">
                  Class C Motorhomes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Portland, Oregon<br />
                  Pacific Northwest
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <a href="mailto:info@happycampersrv.com" className="text-gray-400 hover:text-white transition-colors">
                  info@happycampersrv.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Happy Campers RV Rentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
