"use client";

import { useRouter } from 'next/navigation';
import { ArrowRight, TrendingUp } from 'lucide-react';
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

  const handleStartEarning = () => {
    if (!user) {
      router.push('/signup');
    } else {
      router.push('/watch-ads');
    }
  };

  return (
    <div className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 xl:p-8">
        <div className="text-center">
          <h1 className="text-5xl text-white font-bold mb-4">
            Watch Ads, <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Earn Money</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of users earning real money by watching ads. Get paid instantly to your wallet. No hidden fees, no minimum threshold.
          </p>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleStartEarning}>
            Start Earning Now
            <ArrowRight size={20} className="ml-2" />
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-4">
            Learn More
          </button>
        </div>
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-4 mt-8">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <h2 className="text-3xl text-green-400 font-bold mb-1">50K+</h2>
              <p className="text-lg text-gray-300">Active Users</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl text-green-500 font-bold mb-1">$2M+</h2>
              <p className="text-lg text-gray-300">Paid Out</p>
            </div>
            <div className="text-center">
              <h2 className="text-3xl text-yellow-400 font-bold mb-1">4.8★</h2>
              <p className="text-lg text-gray-300">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
