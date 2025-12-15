"use client";

import { Wallet, TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function LiveCashoutSection() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Users"
    },
    {
      icon: Wallet,
      value: "$2M+",
      label: "Paid Out"
    },
    {
      icon: TrendingUp,
      value: "4.8★",
      label: "User Rating"
    }
  ];

  const recentPayouts = [
    { user: "Sarah M.", amount: "$45.50", time: "2 min ago", status: "completed" },
    { user: "John D.", amount: "$32.00", time: "5 min ago", status: "completed" },
    { user: "Emma L.", amount: "$58.75", time: "8 min ago", status: "completed" },
    { user: "Michael K.", amount: "$41.25", time: "12 min ago", status: "completed" },
    { user: "Lisa P.", amount: "$36.00", time: "15 min ago", status: "completed" },
    { user: "David R.", amount: "$52.50", time: "18 min ago", status: "completed" },
    { user: "Alex T.", amount: "$48.00", time: "22 min ago", status: "completed" },
    { user: "Rachel S.", amount: "$39.75", time: "25 min ago", status: "completed" },
    { user: "Chris M.", amount: "$55.25", time: "28 min ago", status: "completed" },
    { user: "Jessica L.", amount: "$42.50", time: "32 min ago", status: "completed" }
  ];

  return (
    <section className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live Cashouts
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Real people earning real money right now
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Total</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-gray-500 text-xs">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features List */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Why Join Us?</h3>
              {[
                "Instant payouts to your account",
                "No minimum threshold required",
                "Secure and verified transactions",
                "24/7 customer support"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Live Payouts Scrollable */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[700px]">
            {/* Header */}
            <div className="sticky top-0 bg-gray-900/90 backdrop-blur border-b border-gray-800 px-6 py-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-white">Live Payouts</h3>
              </div>
              <p className="text-gray-400 text-sm mt-1">Users cashing out right now</p>
            </div>

            {/* Scrollable List - No Scrollbar */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {recentPayouts.map((payout, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg border border-gray-700/40 hover:bg-gray-800/60 hover:border-green-500/50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      {payout.user.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm truncate">{payout.user}</p>
                      <p className="text-gray-500 text-xs">{payout.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <p className="text-green-400 font-bold text-sm">{payout.amount}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-900/90 backdrop-blur border-t border-gray-800 px-6 py-3">
              <p className="text-green-300 text-xs text-center">
                ✓ Instant payouts • Secure transactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
