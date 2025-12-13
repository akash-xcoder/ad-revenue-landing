import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-neutral-light/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-neon-blue to-neon-purple rounded-lg flex items-center justify-center neon-glow">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">AdzoPay</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <a href="#how-it-works" className="text-neutral-light/70 hover:text-neutral-light transition duration-300">
              How It Works
            </a>
            <a href="#features" className="text-neutral-light/70 hover:text-neutral-light transition duration-300">
              Features
            </a>
            <a href="#testimonials" className="text-neutral-light/70 hover:text-neutral-light transition duration-300">
              Testimonials
            </a>
            <a href="#faq" className="text-neutral-light/70 hover:text-neutral-light transition duration-300">
              FAQ
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            <button onClick={() => navigate('/login')} className="btn-neon px-6 py-2 rounded-lg font-semibold">
              Sign In
            </button>
            <button onClick={() => navigate('/signup')} className="btn-neon-solid px-6 py-2 rounded-lg font-semibold">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-card transition text-neutral-light"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-neutral-light/10 pt-4">
            <a href="#how-it-works" className="block text-neutral-light/70 hover:text-neutral-light py-2 transition">
              How It Works
            </a>
            <a href="#features" className="block text-neutral-light/70 hover:text-neutral-light py-2 transition">
              Features
            </a>
            <a href="#testimonials" className="block text-neutral-light/70 hover:text-neutral-light py-2 transition">
              Testimonials
            </a>
            <a href="#faq" className="block text-neutral-light/70 hover:text-neutral-light py-2 transition">
              FAQ
            </a>
            <div className="flex gap-2 pt-2">
              <button onClick={() => navigate('/login')} className="flex-1 btn-neon px-4 py-2 rounded-lg font-semibold text-sm">
                Sign In
              </button>
              <button onClick={() => navigate('/signup')} className="flex-1 btn-neon-solid px-4 py-2 rounded-lg font-semibold text-sm">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
