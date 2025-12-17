"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight, Send, DollarSign, Shield, Zap, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white border-t border-gray-800 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-white">AdzoPay</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Earn real money by watching ads. Simple, transparent, and secure payments guaranteed.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Security', 'Enterprise'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} AdzoPay. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, label: 'Facebook', href: '#' },
              { icon: Twitter, label: 'Twitter', href: '#' },
              { icon: Instagram, label: 'Instagram', href: '#' },
              { icon: Linkedin, label: 'LinkedIn', href: '#' },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
