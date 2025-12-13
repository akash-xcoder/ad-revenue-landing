"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight, Send, DollarSign, Shield, Zap, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0E27] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6366F1] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D9FF] opacity-5 rounded-full blur-3xl" />
      </div>

      {/* CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready to Start Earning?
                </h3>
                <p className="text-white/80 max-w-md">
                  Join thousands of users who are already earning money by watching ads. It's free to start!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-white text-[#6366F1] rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/watch-ads"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center justify-center"
                >
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#00D9FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#6366F1]/30">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#00D9FF] bg-clip-text text-transparent">
                AdzoPay
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              The trusted platform for earning real money by watching ads. Simple, transparent, and secure payments guaranteed.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Shield className="w-4 h-4 text-[#10B981]" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Zap className="w-4 h-4 text-[#F59E0B]" />
                <span>Instant Pay</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Globe className="w-4 h-4 text-[#00D9FF]" />
                <span>Global</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Product</h4>
            <ul className="space-y-4">
              {['How It Works', 'Features', 'Pricing', 'Mobile App', 'API'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#00D9FF] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#00D9FF] transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Press Kit', 'Partners'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#00D9FF] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#00D9FF] transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'Contact Us', 'FAQs', 'Community', 'Status'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#00D9FF] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#00D9FF] transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest news and earning tips delivered to your inbox.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#6366F1]/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 py-8 border-y border-white/10 mb-8">
          <a href="mailto:support@adzopay.com" className="flex items-center gap-3 text-gray-400 hover:text-[#00D9FF] transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <span>support@adzopay.com</span>
          </a>
          <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-[#00D9FF] transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <span>+1 (234) 567-890</span>
          </a>
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Legal Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
            <span>&copy; {currentYear} AdzoPay. All rights reserved.</span>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-[#00D9FF] transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-[#00D9FF] transition-colors">Terms</Link>
              <Link href="#" className="hover:text-[#00D9FF] transition-colors">Cookies</Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
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
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#6366F1] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/30"
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
