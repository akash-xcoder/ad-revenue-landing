import React from 'react';
import { Zap, Lock, TrendingUp, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Instant Payouts',
      description: 'Get paid instantly for every ad you watch. No waiting, no delays. Your earnings are available 24/7.',
      color: 'from-accent to-accent/80',
    },
    {
      icon: Lock,
      title: 'Secure Wallet',
      description: 'Bank-level encryption protects your account and earnings. Your data is always safe with us.',
      color: 'from-primary to-primary-dark',
    },
    {
      icon: TrendingUp,
      title: 'High Earnings',
      description: 'Earn up to $5 per hour watching ads. Rates vary by region and ad availability.',
      color: 'from-accent to-accent/80',
    },
    {
      icon: Users,
      title: 'Trusted Advertisers',
      description: 'We partner with verified brands and advertisers. Only quality ads from reputable companies.',
      color: 'from-primary to-primary-dark',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark border-t border-neutral-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-light mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
            We've built the most user-friendly platform for earning money online.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card-dark rounded-2xl p-8 group hover:border-primary/50"
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition neon-glow`}>
                  <Icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-neutral-light mb-3">{feature.title}</h3>
                <p className="text-neutral-light/60 leading-relaxed mb-6">{feature.description}</p>

                {/* Learn More Link */}
                <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition bg-none border-none cursor-pointer p-0">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 card-dark rounded-2xl p-12 neon-glow">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold gradient-text mb-2">0%</p>
              <p className="text-neutral-light/60">Commission Fees</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-neon-green mb-2">24/7</p>
              <p className="text-neutral-light/60">Customer Support</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-text-purple mb-2">100%</p>
              <p className="text-neutral-light/60">Transparent Payouts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
