import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-dark-bg to-neutral-dark text-neutral-light border-t border-neutral-light/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-accent rounded-lg flex items-center justify-center neon-glow-green">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <span className="text-xl font-bold gradient-text">AdEarn</span>
            </div>
            <p className="text-neutral-light/60 text-sm leading-relaxed">
              Earn real money by watching ads. Simple, transparent, and trustworthy.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-light">Product</h4>
            <ul className="space-y-3 text-neutral-light/60 text-sm">
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Features
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  How It Works
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Pricing
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Mobile App
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-light">Company</h4>
            <ul className="space-y-3 text-neutral-light/60 text-sm">
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  About Us
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Blog
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Careers
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Press
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-light">Legal</h4>
            <ul className="space-y-3 text-neutral-light/60 text-sm">
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button className="hover:text-neon-blue transition bg-none border-none cursor-pointer p-0 text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-light">Newsletter</h4>
            <p className="text-neutral-light/60 text-sm mb-4">
              Subscribe to get updates on new features and earning opportunities.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-dark-card border border-primary/20 text-neutral-light placeholder-neutral-light/40 focus:outline-none focus:border-primary transition"
              />
              <button className="bg-gradient-to-r from-primary to-neon-blue hover:shadow-glow-blue text-white px-4 py-2 rounded-lg transition font-semibold">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-light/10 pt-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-neutral-light/50 text-sm">
            © {currentYear} AdEarn. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            <button
              className="text-neutral-light/50 hover:text-neon-blue transition bg-none border-none cursor-pointer p-0"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </button>
            <button
              className="text-neutral-light/50 hover:text-neon-blue transition bg-none border-none cursor-pointer p-0"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </button>
            <button
              className="text-neutral-light/50 hover:text-neon-blue transition bg-none border-none cursor-pointer p-0"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </button>
            <button
              className="text-neutral-light/50 hover:text-neon-blue transition bg-none border-none cursor-pointer p-0"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
