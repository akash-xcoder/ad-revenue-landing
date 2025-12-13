import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Home, User, Menu, ChevronDown, Play } from 'lucide-react';
import { fetchVideos, fetchUserWallet, recordAdView, getVideoPublicUrl, Video } from '../lib/supabase';
import { getCurrentUser } from '../lib/supabaseAuth';

interface ContentItem {
  id: string;
  type: 'video' | 'ad';
  data: Video | Ad;
}

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

// Sample ads - every 2 videos
const sampleAds: Ad[] = [
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
    brand: 'TechWear',
    reward: 0.28,
    duration: 18,
    thumbnail: '⌚',
    description: 'Stay connected with our advanced smart watch technology',
    username: 'techwear_official',
    avatar: '⌚',
  },
];

export default function AdWatcherSupabase() {
  const navigate = useNavigate();
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [earnedAmount, setEarnedAmount] = useState(0);
  const [watchedItems, setWatchedItems] = useState<number[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId] = useState('demo-user-123'); // Replace with actual user ID from auth
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollTime = useRef<number>(0);

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        navigate('/login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Load videos from Supabase and create content list
  useEffect(() => {
    const loadContent = async () => {
      try {
        let videos = await fetchVideos();
        console.log('Fetched videos:', videos);
        
        // If no videos found, register the default ones
        if (videos.length === 0) {
          console.warn('No videos found in database, registering default videos...');
          const { registerVideoInDatabase } = await import('../lib/supabase');
          
          const defaultVideos = [
            {
              storagePath: 'videos/AQOgywJRNGGe3EDs6oX3c3VRQ6PITTFh8dC8WXbj5zpjm9wpUGTMsLeucsUOthk35gL0vGbKBq_JBxmx_UnWF_brbpP6rXMSgJSdVAg.mp4',
              filename: 'video1.mp4',
              title: 'Sample Video 1',
              description: 'Watch this video and earn rewards',
              duration: 30,
            },
            {
              storagePath: 'videos/AQOx32u2qsJZGUEn31TpNftau3gxMG1lW8BFvrtXhwtU16MwF8O5XkCs2A9oh-f6xoWPA5pj7H14_BzBzsTmQGICIEvjkR-RDpPO5rU.mp4',
              filename: 'video2.mp4',
              title: 'Sample Video 2',
              description: 'Watch this video and earn rewards',
              duration: 30,
            },
          ];

          for (const video of defaultVideos) {
            await registerVideoInDatabase(video.storagePath, video.filename, {
              title: video.title,
              description: video.description,
              duration: video.duration,
            });
          }

          // Fetch videos again after registering
          videos = await fetchVideos();
          console.log('Videos after registration:', videos);
        }
        
        // Create content list with ads every 2 videos
        const content: ContentItem[] = [];
        let adIndex = 0;

        videos.forEach((video, index) => {
          console.log(`Processing video ${index}:`, video.storage_path);
          content.push({
            id: `video-${video.id}`,
            type: 'video',
            data: video,
          });

          // Add ad after every 2 videos
          if ((index + 1) % 2 === 0 && adIndex < sampleAds.length) {
            content.push({
              id: `ad-${sampleAds[adIndex].id}`,
              type: 'ad',
              data: sampleAds[adIndex],
            });
            adIndex++;
          }
        });

        console.log('Content list created:', content);
        setContentList(content);
        setLoading(false);
      } catch (error) {
        console.error('Error loading content:', error);
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Load user wallet
  useEffect(() => {
    const loadWallet = async () => {
      const wallet = await fetchUserWallet(userId);
      if (wallet) {
        setEarnedAmount(wallet.balance);
      }
    };

    loadWallet();
  }, [userId]);

  const currentItem = contentList[currentIndex];
  const isWatched = watchedItems.includes(currentIndex);
  const isLiked = likedItems.includes(currentIndex);

  const toggleLike = () => {
    if (isLiked) {
      setLikedItems(likedItems.filter(id => id !== currentIndex));
    } else {
      setLikedItems([...likedItems, currentIndex]);
    }
  };

  // Handle video completion
  const handleVideoComplete = async () => {
    if (currentItem?.type === 'ad' && !isWatched) {
      const ad = currentItem.data as Ad;
      setWatchedItems([...watchedItems, currentIndex]);
      setEarnedAmount(earnedAmount + ad.reward);
      
      // Record ad view in Supabase
      await recordAdView(userId, ad.id, true, ad.reward);
    }
  };

  const handleScroll = useCallback((e: WheelEvent) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 600 || isTransitioning) return;
    lastScrollTime.current = now;

    setIsTransitioning(true);

    if (e.deltaY > 0) {
      // Scroll down - next content
      if (!isWatched && currentItem?.type === 'video') {
        setWatchedItems((prev) => [...prev, currentIndex]);
      }
      setCurrentIndex((prev) => (prev + 1) % contentList.length);
    } else {
      // Scroll up - previous content
      setCurrentIndex((prev) => (prev - 1 + contentList.length) % contentList.length);
    }

    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, isWatched, currentItem, currentIndex, contentList]);

  useEffect(() => {
    const container = feedContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      return () => container.removeEventListener('wheel', handleScroll);
    }
  }, [handleScroll]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-neon-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-light text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-neon-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-light text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-light text-xl mb-4">No content available</p>
          <button
            onClick={() => navigate('/')}
            className="btn-neon-solid px-6 py-3 rounded-lg font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

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
          <button className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-dark-card/50 transition bg-none border-none cursor-pointer text-neutral-light/70 hover:text-neutral-light text-left">
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
          <div
            className="bg-dark-bg rounded-[3rem] overflow-hidden border-8 border-dark-card shadow-2xl hover:shadow-primary/30 transition-shadow duration-300 neon-glow"
            style={{ width: '400px', height: '845px', aspectRatio: '9/16' }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-dark-bg rounded-b-3xl z-50 border-b border-neutral-light/10"></div>

            {/* Header */}
            <div className="bg-gradient-to-b from-dark-bg to-transparent px-4 py-4 flex justify-between items-center border-b border-neutral-light/10">
              <div className="text-lg font-bold gradient-text">AdzoPay</div>
              <Menu size={24} className="text-neutral-light hover:text-primary transition" />
            </div>

            {/* Content Display */}
            <div className="bg-dark-bg relative overflow-hidden" style={{ height: 'calc(100% - 120px)' }}>
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-dark-card to-dark-bg relative">
                {/* Background Gradient */}
                <div className="absolute inset-0 opacity-25">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-blue rounded-full blur-3xl"></div>
                </div>

                {/* Content Item */}
                <div className={`relative z-10 w-full h-full transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  {currentItem.type === 'video' ? (
                    <>
                      {/* Video Player */}
                      <video
                        ref={videoRef}
                        key={currentIndex}
                        className="w-full h-full object-cover bg-black"
                        controls
                        autoPlay
                        loop
                        crossOrigin="anonymous"
                        onPlay={() => setIsVideoPaused(false)}
                        onPause={() => setIsVideoPaused(true)}
                        onEnded={() => {
                          if (!isWatched) {
                            setWatchedItems([...watchedItems, currentIndex]);
                          }
                        }}
                        onError={(e) => {
                          const video = e.target as HTMLVideoElement;
                          console.error('Video error:', e);
                          console.error('Video error code:', video.error?.code);
                          console.error('Video error message:', video.error?.message);
                          console.log('Video URL:', getVideoPublicUrl((currentItem.data as Video).storage_path));
                        }}
                      >
                        <source src={getVideoPublicUrl((currentItem.data as Video).storage_path)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Play/Pause Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {isVideoPaused && (
                          <div className="animate-fade-in">
                            <Play size={80} className="text-white opacity-70 drop-shadow-lg" fill="white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Video Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 z-10">
                        <h2 className="text-lg font-bold text-neutral-light">{(currentItem.data as Video).title || 'Video'}</h2>
                        <p className="text-xs text-neutral-light/60">{(currentItem.data as Video).description || 'Watch this video'}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="text-7xl mb-6 animate-pulse">{(currentItem.data as Ad).thumbnail}</div>
                        <h2 className="text-2xl font-bold mb-2 text-neutral-light">{(currentItem.data as Ad).title}</h2>
                        <p className="text-sm text-neon-blue font-semibold mb-2">{(currentItem.data as Ad).brand}</p>
                        <p className="text-xs text-neutral-light/60 max-w-xs mx-auto mb-8">{(currentItem.data as Ad).description}</p>

                        <div
                          onClick={handleVideoComplete}
                          className="w-16 h-16 bg-gradient-to-br from-primary to-neon-purple backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 hover:shadow-glow-blue transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 neon-glow"
                        >
                          <div className="text-3xl">▶</div>
                        </div>

                        <div className="inline-block bg-gradient-to-r from-neon-green to-accent text-black px-8 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-glow-green hover:scale-105 transition-all duration-300">
                          💰 Earn +${(currentItem.data as Ad).reward.toFixed(2)}
                        </div>
                      </div>
                    </>
                  )}
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
                <button
                  onClick={toggleLike}
                  className="flex flex-col items-center gap-2 hover:scale-125 transition-transform duration-200 active:scale-90"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                      isLiked ? 'bg-gradient-to-br from-pink-500 to-red-500 shadow-red-500/50' : 'bg-dark-card/80 backdrop-blur hover:bg-dark-card'
                    }`}
                  >
                    <Heart size={24} fill={isLiked ? 'white' : 'none'} color={isLiked ? 'white' : 'white'} />
                  </div>
                  <span className="text-xs font-bold text-neutral-light/70">{isLiked ? '1.2K' : '1.1K'}</span>
                </button>

              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent p-4 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-neon-purple rounded-full flex items-center justify-center text-lg shadow-lg neon-glow">
                    {currentItem.type === 'ad' ? (currentItem.data as Ad).avatar : '🎬'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-neutral-light">
                      {currentItem.type === 'ad' ? (currentItem.data as Ad).username : 'Video Creator'}
                    </p>
                    <p className="text-xs text-neutral-light/60">Official Account</p>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 line-clamp-2 mb-2">
                  {currentItem.type === 'ad' ? (currentItem.data as Ad).description : (currentItem.data as Video).description}
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
      <div className="hidden lg:flex flex-col w-80 border-l border-neutral-light/10 p-6 fixed right-0 h-screen overflow-y-auto bg-gradient-to-b from-dark-bg to-neutral-dark glass">
        <h3 className="text-xl font-bold mb-6 gradient-text">Session Stats</h3>

        {/* Earnings Card */}
        <div className="bg-gradient-to-br from-primary/20 to-neon-blue/20 rounded-2xl p-6 mb-6 border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
          <p className="text-neutral-light/60 text-sm mb-2">Total Earned</p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-neon-green to-accent bg-clip-text text-transparent mb-4">
            ${earnedAmount.toFixed(2)}
          </h2>
          <div className="w-full bg-neutral-800/50 rounded-full h-3 overflow-hidden border border-neutral-700/50">
            <div
              className="h-full bg-gradient-to-r from-primary via-neon-blue to-neon-green transition-all duration-500 shadow-lg shadow-primary/50"
              style={{ width: `${Math.min((earnedAmount / 5) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-neutral-light/60 mt-2">Goal: $5.00</p>
        </div>

        {/* Stats Grid */}
        <div className="space-y-3 mb-6">
          <div className="bg-dark-card/50 backdrop-blur rounded-xl p-4 border border-neutral-light/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <p className="text-neutral-light/60 text-xs mb-2 font-semibold">Items Watched</p>
            <p className="text-3xl font-bold text-white">{watchedItems.length}</p>
          </div>
          <div className="bg-dark-card/50 backdrop-blur rounded-xl p-4 border border-neutral-light/10 hover:border-neon-green/30 transition-all duration-300 hover:shadow-lg hover:shadow-neon-green/10">
            <p className="text-neutral-light/60 text-xs mb-2 font-semibold">Remaining</p>
            <p className="text-3xl font-bold text-neon-green">{contentList.length - watchedItems.length}</p>
          </div>
          <div className="bg-dark-card/50 backdrop-blur rounded-xl p-4 border border-neutral-light/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <p className="text-neutral-light/60 text-xs mb-2 font-semibold">Avg Per Item</p>
            <p className="text-3xl font-bold text-white">${(earnedAmount / Math.max(watchedItems.length, 1)).toFixed(2)}</p>
          </div>
        </div>

        {/* Content Info */}
        <div className="mb-6">
          <p className="text-neutral-light/60 text-xs mb-3 font-semibold uppercase tracking-wider">📊 Content Info</p>
          <div className="space-y-2">
            <div className="bg-dark-card/50 backdrop-blur rounded-lg p-3 border border-neutral-light/10">
              <p className="text-neutral-light/70 text-sm">
                <span className="font-semibold">Total Items:</span> {contentList.length}
              </p>
            </div>
            <div className="bg-dark-card/50 backdrop-blur rounded-lg p-3 border border-neutral-light/10">
              <p className="text-neutral-light/70 text-sm">
                <span className="font-semibold">Current:</span> {currentIndex + 1} / {contentList.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
