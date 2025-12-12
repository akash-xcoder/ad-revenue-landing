import React from 'react';
import { UserPlus, Play, Wallet, CreditCard } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description: 'Create your account in seconds with just an email. No credit card required.',
      step: '01',
    },
    {
      icon: Play,
      title: 'Watch Ads',
      description: 'Browse and watch high-quality ads from trusted advertisers worldwide.',
      step: '02',
    },
    {
      icon: Wallet,
      title: 'Earn Money',
      description: 'Get paid instantly for each ad you watch. Earnings go directly to your wallet.',
      step: '03',
    },
    {
      icon: CreditCard,
      title: 'Withdraw',
      description: 'Cash out anytime to your bank account or digital wallet. No minimum threshold.',
      step: '04',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark border-t border-neutral-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-light mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
            Simple, transparent, and straightforward. Start earning in just 4 easy steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-full w-full h-1 bg-gradient-to-r from-primary to-neon-blue opacity-40"></div>
                )}

                {/* Card */}
                <div className="card-dark rounded-2xl p-8 h-full group hover:border-primary/50">
                  {/* Step Number */}
                  <div className="text-6xl font-bold bg-gradient-to-br from-neon-blue to-neon-purple bg-clip-text text-transparent mb-4">{item.step}</div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-neon-purple rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition neon-glow">
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-neutral-light mb-3">{item.title}</h3>
                  <p className="text-neutral-light/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="btn-neon-solid px-10 py-4 rounded-xl font-semibold inline-flex items-center gap-2">
            Start Your Journey
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
