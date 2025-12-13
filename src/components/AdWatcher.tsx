import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Home, Search, User, Menu, ChevronDown } from 'lucide-react';

interface Ad {
  id: number;
  title: string;
  brand: string;
  reward: number;
  duration: number;
  thumbnail: string;
  description: string;
  username: string;
  avatar: string;
}

export default function AdWatcher() {
  const navigate = useNavigate();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [earnedAmount, setEarnedAmount] = useState(0);
  const [watchedAds, setWatchedAds] = useState<number[]>([]);
  const [likedAds, setLikedAds] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  const ads: Ad[] = [
    {
      id: 1,
      title: 'Premium Headphones',
      brand: 'AudioMax',
      reward: 0.25,
      duration: 15,
      thumbnail: '🎧',
      description: 'Experience crystal clear sound with our latest wireless headphones',
      username: 'audiomax_official',
      avatar: '🎧',
    },
    {
      id: 2,
      title: 'Fitness Tracker',
      brand: 'FitLife',
      reward: 0.30,
      duration: 20,
      thumbnail: '⌚',
      description: 'Track your health and fitness goals with advanced sensors',
      username: 'fitlife_app',
      avatar: '⌚',
    },
    {
      id: 3,
      title: 'Smart Watch',
      brand: 'TechGear',
      reward: 0.35,
      duration: 25,
      thumbnail: '⌚',
      description: 'Stay connected with our latest smartwatch technology',
      username: 'techgear_pro',
      avatar: '⌚',
    },
    {
      id: 4,
      title: 'Wireless Earbuds',
      brand: 'SoundWave',
      reward: 0.28,
      duration: 18,
      thumbnail: '🎵',
      description: 'Immersive audio experience with noise cancellation',
      username: 'soundwave_audio',
      avatar: '🎵',
    },
    {
      id: 5,
      title: 'Phone Stand',
      brand: 'MobileHub',
      reward: 0.15,
      duration: 10,
      thumbnail: '📱',
      description: 'Adjustable stand for all your devices',
      username: 'mobilehub_store',
      avatar: '📱',
    },
    {
      id: 6,
      title: 'USB-C Cable',
      brand: 'ConnectPro',
      reward: 0.20,
      duration: 12,
      thumbnail: '🔌',
      description: 'Fast charging and data transfer cable',
      username: 'connectpro_tech',
      avatar: '🔌',
    },
    {
      id: 7,
      title: 'Portable Charger',
      brand: 'PowerBank',
      reward: 0.32,
      duration: 22,
      thumbnail: '🔋',
      description: 'Keep your devices charged on the go',
      username: 'powerbank_official',
      avatar: '🔋',
    },
    {
      id: 8,
      title: 'Screen Protector',
      brand: 'ShieldTech',
      reward: 0.18,
      duration: 14,
      thumbnail: '🛡️',
      description: 'Protect your screen from scratches and damage',
      username: 'shieldtech_pro',
      avatar: '🛡️',
    },
  ];

  const currentAd = ads[currentAdIndex];
  const isWatched = watchedAds.includes(currentAd.id);
  const isLiked = likedAds.includes(currentAd.id);

  const toggleLike = () => {
    if (isLiked) {
      setLikedAds(likedAds.filter(id => id !== currentAd.id));
    } else {
      setLikedAds([...likedAds, currentAd.id]);
    }
  };

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 600 || isTransitioning) return;
      lastScrollTime.current = now;

      setIsTransitioning(true);
      
      if (e.deltaY > 0) {
        // Scroll down - next ad
        if (!isWatched) {
          setWatchedAds([...watchedAds, currentAd.id]);
          setEarnedAmount(earnedAmount + currentAd.reward);
        }
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      } else {
        // Scroll up - previous ad
        setCurrentAdIndex((prev) => (prev - 1 + ads.length) % ads.length);
      }
      
      setTimeout(() => setIsTransitioning(false), 300);
    };

    const container = feedContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      return () => container.removeEventListener('wheel', handleScroll);
    }
  }, [currentAdIndex, earnedAmount, watchedAds, currentAd.id, currentAd.reward, isWatched, ads.length, isTransitioning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark text-neutral-light flex">
      {/* Sidebar Navigation */}
      <div className="hidden md:flex flex-col w-64 border-r border-neutral-light/10 p-6 fixed h-screen bg-gradient-to-b from-dark-bg to-neutral-dark glass">
        <button 
          onClick={() => navigate('/')}
          className="text-2xl font-bold mb-12 gradient-text hover:opacity-80 transition bg-none border-none cursor-pointer p-0"
        >
          AdzoPay
        </button>
        
        <nav className="space-y-6 flex-1">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-dark-card/50 transition bg-none border-none cursor-pointer text-neutral-light/70 hover:text-neutral-light text-left"
          >
            <Home size={24} />
            <span className="text-xl">Home</span>
          </button>
          <button 
            className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-dark-card/50 transition bg-none border-none cursor-pointer text-neutral-light/70 hover:text-neutral-light text-left"
          >
            <User size={24} />
            <span className="text-xl">Profile</span>
          </button>
        </nav>

        <button className="w-full btn-neon-solid py-3 rounded-lg font-semibold">
          Withdraw ${earnedAmount.toFixed(2)}
        </button>
      </div>

      {/* Main Feed */}
      <div 
        ref={feedContainerRef}
        className="flex-1 md:ml-64 flex justify-center items-center min-h-screen overflow-hidden"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="w-full max-w-lg relative flex justify-center items-center">
          {/* Mobile Phone Frame */}
          <div className="bg-dark-bg rounded-[3rem] overflow-hidden border-8 border-dark-card shadow-2xl hover:shadow-primary/30 transition-shadow duration-300 neon-glow" style={{ width: '400px', height: '845px', aspectRatio: '9/16' }}>
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-dark-bg rounded-b-3xl z-50 border-b border-neutral-light/10"></div>


            {/* Header */}
            <div className="bg-gradient-to-b from-dark-bg to-transparent px-4 py-4 flex justify-between items-center border-b border-neutral-light/10">
              <div className="text-lg font-bold gradient-text">AdzoPay</div>
              <Menu size={24} className="text-neutral-light hover:text-primary transition" />
            </div>

            {/* Ad Content */}
            <div className="bg-dark-bg relative overflow-hidden" style={{ height: 'calc(100% - 120px)' }}>
              {/* Ad Video/Image Area */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dark-card to-dark-bg relative">
                {/* Background Gradient */}
                <div className="absolute inset-0 opacity-25">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-blue rounded-full blur-3xl"></div>
                </div>

                {/* Product Display */}
                <div className={`relative z-10 text-center transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="text-7xl mb-6 animate-pulse">{currentAd.thumbnail}</div>
                  <h2 className="text-2xl font-bold mb-2 text-neutral-light">{currentAd.title}</h2>
                  <p className="text-sm text-neon-blue font-semibold mb-2">{currentAd.brand}</p>
                  <p className="text-xs text-neutral-light/60 max-w-xs mx-auto mb-8">{currentAd.description}</p>
                  
                  {/* Play Button */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-neon-purple backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 hover:shadow-glow-blue transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 neon-glow">
                    <div className="text-3xl">▶</div>
                  </div>

                  {/* Reward Badge */}
                  <div className="inline-block bg-gradient-to-r from-neon-green to-accent text-black px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-glow-green hover:scale-105 transition-all duration-300">
                    💰 Earn +${currentAd.reward.toFixed(2)}
                  </div>
                </div>

                {/* Watch Status Badge */}
                {isWatched && (
                  <div className="absolute top-4 left-4 bg-neon-green text-black px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Watched
                  </div>
                )}
              </div>

              {/* Right Side Action Buttons */}
              <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-20">
                {/* Like Button */}
                <button
                  onClick={toggleLike}
                  className="flex flex-col items-center gap-2 hover:scale-125 transition-transform duration-200 active:scale-90"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isLiked ? 'bg-gradient-to-br from-pink-500 to-red-500 shadow-red-500/50' : 'bg-dark-card/80 backdrop-blur hover:bg-dark-card'}`}>
                    <Heart size={24} fill={isLiked ? 'white' : 'none'} color={isLiked ? 'white' : 'white'} />
                  </div>
                  <span className="text-xs font-bold text-neutral-light/70">{isLiked ? '1.2K' : '1.1K'}</span>
                </button>

              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent p-4 z-10">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-neon-purple rounded-full flex items-center justify-center text-lg shadow-lg neon-glow">
                    {currentAd.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-neutral-light">{currentAd.username}</p>
                    <p className="text-xs text-neutral-light/60">Official Account</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-300 line-clamp-2 mb-2">
                  {currentAd.description}
                </p>
              </div>

              {/* Swipe Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown size={20} className="text-neutral-500" />
              </div>
            </div>

          </div>


        </div>
      </div>

      {/* Right Sidebar - Stats (Desktop Only) */}
      <div className="hidden lg:flex flex-col w-80 border-l border-neutral-800 p-6 fixed right-0 h-screen overflow-y-auto bg-gradient-to-b from-black to-neutral-900/20">
        <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Session Stats</h3>

        {/* Earnings Card */}
        <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 mb-6 border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
          <p className="text-neutral-400 text-sm mb-2">Total Earned</p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-accent to-green-400 bg-clip-text text-transparent mb-4">${earnedAmount.toFixed(2)}</h2>
          <div className="w-full bg-neutral-800/50 rounded-full h-3 overflow-hidden border border-neutral-700/50">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-green-400 transition-all duration-500 shadow-lg shadow-accent/50"
              style={{ width: `${Math.min((earnedAmount / 5) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-neutral-400 mt-2">Goal: $5.00</p>
        </div>

        {/* Stats Grid */}
        <div className="space-y-3 mb-6">
          <div className="bg-neutral-900/50 backdrop-blur rounded-xl p-4 border border-neutral-800/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <p className="text-neutral-400 text-xs mb-2 font-semibold">Ads Watched</p>
            <p className="text-3xl font-bold text-white">{watchedAds.length}</p>
          </div>
          <div className="bg-neutral-900/50 backdrop-blur rounded-xl p-4 border border-neutral-800/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
            <p className="text-neutral-400 text-xs mb-2 font-semibold">Remaining</p>
            <p className="text-3xl font-bold text-accent">{ads.length - watchedAds.length}</p>
          </div>
          <div className="bg-neutral-900/50 backdrop-blur rounded-xl p-4 border border-neutral-800/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <p className="text-neutral-400 text-xs mb-2 font-semibold">Avg Per Ad</p>
            <p className="text-3xl font-bold text-white">${(earnedAmount / Math.max(watchedAds.length, 1)).toFixed(2)}</p>
          </div>
        </div>

        {/* Liked Ads */}
        <div className="mb-6">
          <p className="text-neutral-400 text-xs mb-3 font-semibold uppercase tracking-wider">❤️ Liked Ads</p>
          <div className="space-y-2">
            {likedAds.length === 0 ? (
              <p className="text-neutral-500 text-sm text-center py-4">No liked ads yet</p>
            ) : (
              likedAds.map(id => {
                const ad = ads.find(a => a.id === id);
                return (
                  <div key={id} className="flex items-center gap-3 p-3 bg-neutral-900/50 backdrop-blur rounded-lg border border-neutral-800/50 hover:border-pink-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10">
                    <div className="text-2xl">{ad?.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-white">{ad?.title}</p>
                      <p className="text-xs text-accent font-semibold">${ad?.reward.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
