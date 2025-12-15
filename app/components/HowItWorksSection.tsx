"use client";

import { Play, Wallet, TrendingUp } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Play,
      title: "Sign Up",
      description: "Create your account in seconds with just an email. No credit card required."
    },
    {
      icon: Play,
      title: "Watch Ads",
      description: "Browse and watch high-quality ads from trusted advertisers worldwide."
    },
    {
      icon: TrendingUp,
      title: "Earn Money",
      description: "Get paid instantly for each ad you watch. Earnings go directly to your wallet."
    },
    {
      icon: Wallet,
      title: "Withdraw",
      description: "Cash out anytime to your bank account or digital wallet. No minimum threshold."
    }
  ];

  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four simple steps to start earning money today
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Card */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
