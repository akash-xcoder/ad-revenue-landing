"use client";

import { useRouter } from 'next/navigation';
import { ArrowRight, Zap } from 'lucide-react';
import { getCurrentUser } from '../lib/supabaseAuth';
import { useState, useEffect } from 'react';

export default function Hero() {
  const router = useRouter();
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

  const handleGetStarted = () => {
    if (!user) {
      router.push('/signup');
    } else {
      router.push('/watch-ads');
    }
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center h-full">
          {/* Left Content */}
          <div className="space-y-8 order-2 lg:order-1 px-4 sm:px-6 lg:px-8 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">Empowering Global Startup Growth</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                Watch Ads,
                <br />
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Earn Money
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
              Join thousands of users earning real money by watching ads. Get paid instantly to your wallet. No hidden fees, no minimum threshold.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 group"
              >
                Start Earning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-4">
              <span className="text-gray-400 text-sm">Follow Us</span>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 002.856-3.915 10.009 10.009 0 01-2.8.856 4.958 4.958 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.43-.664 1.199-1.61 2.920-1.61 2.135 0 3.733 1.39 3.733 4.377v5.586zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.955.77-1.71 1.954-1.71 1.184 0 1.915.755 1.915 1.71 0 .951-.73 1.71-1.954 1.71zm1.581 11.597H3.715V9.724h3.203v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative hidden lg:flex items-center justify-center order-1 lg:order-2 h-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src="/images/earning-image.jpg" 
                alt="Earn Money by Watching Ads" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
