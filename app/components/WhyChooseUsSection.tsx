"use client";

import { DollarSign, Zap, Gift, Shield, TrendingUp, Clock } from 'lucide-react';

export default function WhyChooseUsSection() {
  const reasons = [
    {
      icon: DollarSign,
      title: "Highest Payouts",
      description: "Earn way more than on other sites. It's our goal to help you make as much money as possible."
    },
    {
      icon: Zap,
      title: "Instant Cashouts",
      description: "Ready to get your money? The minimum cashout varies by region, between as little as $5 and $20, and payouts are almost instant."
    },
    {
      icon: Gift,
      title: "Daily Bonuses",
      description: "Climb the daily bonus ladder, reach the leaderboard, or start a streak to earn extra rewards, for free."
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your data is protected with bank-level security. We never share your information with third parties."
    },
    {
      icon: TrendingUp,
      title: "Transparent Rates",
      description: "Know exactly how much you'll earn before you watch. No hidden fees or surprise deductions."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our support team is always available to help you with any questions or issues you might have."
    }
  ];

  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here's why thousands of users trust AdzoPay
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-400 leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 group">
            Start Earning Now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
