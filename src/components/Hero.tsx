import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { getCurrentUser } from '../lib/supabaseAuth';

export default function Hero() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    checkUser();
  }, []);

  const handleStartEarning = () => {
    if (!user) {
      navigate('/signup');
    } else {
      navigate('/watch-ads');
    }
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-neon-purple/5 opacity-40"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary opacity-15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue opacity-10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-primary/20">
              <TrendingUp size={16} className="text-neon-green" />
              <span className="text-sm font-medium text-neutral-light">Earn Real Money Online</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-light leading-tight">
              Watch Ads,
              <span className="gradient-text"> Earn Money</span>
            </h1>

            <p className="text-xl text-neutral-light/70 leading-relaxed max-w-lg">
              Join thousands of users earning real money by watching ads. Get paid instantly to your wallet. No hidden fees, no minimum threshold.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartEarning}
                className="btn-neon-solid px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group"
              >
                Start Earning Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              <button className="btn-neon px-8 py-4 rounded-xl font-semibold">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-light/10">
              <div>
                <p className="text-2xl font-bold gradient-text">50K+</p>
                <p className="text-sm text-neutral-light/60">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-neon-green">$2M+</p>
                <p className="text-sm text-neutral-light/60">Paid Out</p>
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text-purple">4.8★</p>
                <p className="text-sm text-neutral-light/60">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-96 lg:h-full">
            {/* Illustration Card */}
            <div className="absolute inset-0 glass rounded-3xl border border-primary/20 overflow-hidden neon-glow">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Animated Illustration */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Money Stack */}
                  <div className="relative">
                    <div className="w-32 h-40 bg-gradient-to-br from-neon-green to-accent/80 rounded-2xl shadow-glow-green transform -rotate-12 absolute top-0 left-0 flex items-center justify-center neon-glow-green">
                      <span className="text-4xl font-bold text-white">$</span>
                    </div>
                    <div className="w-32 h-40 bg-gradient-to-br from-primary to-neon-purple rounded-2xl shadow-glow-blue transform rotate-6 absolute top-8 left-16 flex items-center justify-center neon-glow">
                      <span className="text-4xl font-bold text-white">$</span>
                    </div>
                    <div className="w-32 h-40 bg-gradient-to-br from-neon-blue to-primary rounded-2xl shadow-glow-purple transform -rotate-3 absolute top-16 left-32 flex items-center justify-center neon-glow-blue">
                      <span className="text-4xl font-bold text-white">$</span>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-12 right-12 w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center animate-float">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div className="absolute bottom-12 left-12 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-slow">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
