"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Play, ChevronUp, ChevronDown, DollarSign, Eye, Clock, CheckCircle2, Wallet, TrendingUp, MessageCircle, Share2, Bookmark, Flame, Gift, CreditCard, History, Target, Zap, Award, Home, User, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface Ad {
  id: number;
  title: string;
  brand: string;
  reward: number;
  duration: number;
  thumbnail: string;
  description: string;
  category: string;
}

export default function AdWatcher() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [earnedAmount, setEarnedAmount] = useState(0);
  const [watchedAds, setWatchedAds] = useState<number[]>([]);
  const [likedAds, setLikedAds] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const feedContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollTime = useRef<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const ads: Ad[] = [
    {
      id: 1,
      title: 'Premium Headphones',
      brand: 'AudioMax',
      reward: 0.25,
      duration: 15,
      thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'Experience crystal clear sound with our latest wireless headphones featuring active noise cancellation.',
      category: 'Electronics',
    },
    {
      id: 2,
      title: 'Fitness Tracker Pro',
      brand: 'FitLife',
      reward: 0.30,
      duration: 20,
      thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      description: 'Track your health and fitness goals with advanced sensors and real-time analytics.',
      category: 'Health',
    },
  ];

  const currentAd = ads[currentAdIndex];
  const isWatched = watchedAds.includes(currentAd.id);
  const isLiked = likedAds.includes(currentAd.id);
  const goalAmount = 5.00;
  const progressPercent = Math.min((earnedAmount / goalAmount) * 100, 100);

  const toggleLike = () => {
    if (isLiked) {
      setLikedAds(likedAds.filter(id => id !== currentAd.id));
    } else {
      setLikedAds([...likedAds, currentAd.id]);
    }
  };

  const handlePlayAd = () => {
    if (isPlaying || isWatched) return;
    setIsPlaying(true);
    setWatchProgress(0);

    const duration = currentAd.duration * 1000;
    const interval = 100;
    let elapsed = 0;

    progressInterval.current = setInterval(() => {
      elapsed += interval;
      const progress = (elapsed / duration) * 100;
      setWatchProgress(progress);

      if (elapsed >= duration) {
        if (progressInterval.current) clearInterval(progressInterval.current);
        setIsPlaying(false);
        setWatchProgress(100);
        if (!watchedAds.includes(currentAd.id)) {
          setWatchedAds([...watchedAds, currentAd.id]);
          setEarnedAmount(prev => prev + currentAd.reward);
        }
      }
    }, interval);
  };

  const goToNextAd = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (progressInterval.current) clearInterval(progressInterval.current);
    setIsPlaying(false);
    setWatchProgress(0);
    setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrevAd = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (progressInterval.current) clearInterval(progressInterval.current);
    setIsPlaying(false);
    setWatchProgress(0);
    setCurrentAdIndex((prev) => (prev - 1 + ads.length) % ads.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY.current;
    const now = Date.now();

    if (Math.abs(diff) > 50 && now - lastScrollTime.current > 600 && !isTransitioning) {
      lastScrollTime.current = now;
      if (diff > 0) {
        goToNextAd();
      } else {
        goToPrevAd();
      }
    }
  };

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 600 || isTransitioning) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0) {
        goToNextAd();
      } else {
        goToPrevAd();
      }
    };

    const container = feedContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      return () => {
        container.removeEventListener('wheel', handleScroll);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [currentAdIndex, isTransitioning]);

  useEffect(() => {
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  // Autoplay video when ad changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentAdIndex]);

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="text-xl font-bold text-primary">
            AdzoPay
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">${earnedAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-muted"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-14">
          <nav className="p-4 space-y-2">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            <Link href="/watch-ads" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary">
              <Play className="w-5 h-5" />
              <span className="font-medium">Watch Ads</span>
            </Link>
            <Link href="/earnings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted">
              <Wallet className="w-5 h-5" />
              <span className="font-medium">Earnings</span>
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted">
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </Link>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="bg-card rounded-xl p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-1">Session Earnings</p>
              <p className="text-2xl font-bold text-primary">${earnedAmount.toFixed(2)}</p>
              <Progress value={progressPercent} className="h-1.5 mt-2" />
            </div>
            <Button className="w-full bg-primary text-primary-foreground">
              <Wallet className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </div>
      )}

      {/* Left Sidebar - Desktop */}
      <Sidebar earnedAmount={earnedAmount} goalAmount={goalAmount} />

      {/* Main Content - Video Feed */}
      <main
        ref={feedContainerRef}
        className="flex-1 md:ml-64 xl:mr-80 flex items-center justify-center bg-black md:bg-background relative pt-14 md:pt-0 pb-16 md:pb-0"
      >
        {/* Video Card Container */}
        <div className="h-full w-full flex items-center justify-center md:py-4 md:px-4">
          <div
            className="relative bg-black md:rounded-2xl overflow-hidden md:shadow-2xl w-full md:w-auto"
            style={{ aspectRatio: '9/16', height: 'calc(100vh - 120px)', maxHeight: '900px' }}
          >
            {/* Video */}
            <video
              ref={videoRef}
              key={currentAd.id}
              src={currentAd.thumbnail}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Progress bar at top */}
            {(isPlaying || watchProgress > 0) && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-black/20">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${watchProgress}%` }}
                />
              </div>
            )}

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

            {/* Top info */}
            <div className="absolute top-4 left-4 right-16">
              <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm border-0">
                {currentAd.category}
              </Badge>
              {isWatched && (
                <Badge variant="default" className="ml-2 bg-green-500 text-white border-0">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Watched
                </Badge>
              )}
            </div>

            {/* Play button center */}
            {!isWatched && !isPlaying && (
              <button
                onClick={handlePlayAd}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200 backdrop-blur-sm">
                  <Play className="w-8 h-8 text-[#000080] ml-1" fill="#000080" />
                </div>
              </button>
            )}

            {/* Playing state */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-white/30 border-t-white animate-spin mb-4 mx-auto" />
                  <p className="text-white font-medium text-lg">Watching...</p>
                  <p className="text-white/70 text-sm">{Math.ceil((100 - watchProgress) * currentAd.duration / 100)}s remaining</p>
                </div>
              </div>
            )}

            {/* Right side actions */}
            <div className="absolute right-4 bottom-32 flex flex-col items-center gap-4">
              {/* Like */}
              <button
                onClick={toggleLike}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'}`}>
                  <Heart className={`w-5 h-5 ${isLiked ? 'text-white fill-white' : 'text-white'}`} />
                </div>
                <span className="text-white text-[10px] font-medium">{isLiked ? '1.2K' : '1.1K'}</span>
              </button>

              {/* Comment */}
              <button className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-[10px] font-medium">234</span>
              </button>

              {/* Share */}
              <button className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-[10px] font-medium">Share</span>
              </button>

              {/* Bookmark */}
              <button className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-[10px] font-medium">Save</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {/* Brand info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{currentAd.brand.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{currentAd.brand}</p>
                  <p className="text-white/70 text-sm">Sponsored</p>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="text-white text-xl font-bold mb-1">{currentAd.title}</h2>
              <p className="text-white/80 text-sm line-clamp-2 mb-4">{currentAd.description}</p>

              {/* Watch to earn button */}
              {!isWatched && !isPlaying && (
                <Button
                  onClick={handlePlayAd}
                  className="w-full bg-white text-[#000080] hover:bg-white/90 font-semibold"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" fill="#000080" />
                  Watch to Earn ${currentAd.reward.toFixed(2)}
                </Button>
              )}

              {isWatched && (
                <div className="w-full bg-green-500/20 backdrop-blur-sm rounded-lg py-3 text-center">
                  <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Earned ${currentAd.reward.toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation arrows - Desktop only */}
            <div className="hidden md:flex absolute right-4 top-4 flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevAd}
                disabled={isTransitioning}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextAd}
                disabled={isTransitioning}
                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress dots */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {ads.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    index === currentAdIndex
                      ? 'h-6 bg-white'
                      : watchedAds.includes(ads[index].id)
                        ? 'h-1.5 bg-green-400'
                        : 'h-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <div className="flex items-center justify-around h-16">
          <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </Link>
          <Link href="/watch-ads" className="flex flex-col items-center gap-1 text-primary">
            <div className="w-10 h-10 -mt-5 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-[10px] font-medium">Watch</span>
          </Link>
          <Link href="/earnings" className="flex flex-col items-center gap-1 text-muted-foreground">
            <Wallet className="w-5 h-5" />
            <span className="text-[10px]">Earnings</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-muted-foreground">
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Right Sidebar - Stats (Desktop) */}
      <aside className="hidden xl:flex flex-col w-80 border-l border-border bg-card overflow-y-auto fixed right-0 top-0 h-screen">
        <div className="p-5 space-y-4">
          {/* Account Balance */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-muted to-muted/80">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-muted-foreground/70 text-sm">Available Balance</p>
                <Badge variant="default" className="bg-muted/20 text-muted-foreground border-0 text-[10px]">USD</Badge>
              </div>
              <p className="text-3xl font-bold text-primary mb-1">${(12.50 + earnedAmount).toFixed(2)}</p>
              <p className="text-muted-foreground/70 text-xs mb-3">+${earnedAmount.toFixed(2)} today</p>
              <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <CreditCard className="w-4 h-4 mr-2" />
                Withdraw Funds
              </Button>
            </CardContent>
          </Card>

          {/* Daily Goal & Streak */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border border-border shadow-none bg-muted">
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-xl font-bold text-foreground">7</p>
                <p className="text-[10px] text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
            <Card className="border border-border shadow-none bg-muted">
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <Target className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-xl font-bold text-foreground">{watchedAds.length}/{ads.length}</p>
                <p className="text-[10px] text-muted-foreground">Daily Goal</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Progress */}
          <Card className="border border-border shadow-none bg-muted">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Today's Earnings</p>
                <span className="text-xs text-green-500 font-medium">+{progressPercent.toFixed(0)}%</span>
              </div>
              <Progress value={progressPercent} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>${earnedAmount.toFixed(2)} earned</span>
                <span>Goal: $5.00</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-muted rounded-lg p-3 text-center">
              <Eye className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{watchedAds.length}</p>
              <p className="text-[10px] text-muted-foreground">Watched</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{watchedAds.length * 15}s</p>
              <p className="text-[10px] text-muted-foreground">Time</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">2x</p>
              <p className="text-[10px] text-muted-foreground">Bonus</p>
            </div>
          </div>

          <Separator className="my-4 border-t border-border" />

          {/* Weekly Summary */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">This Week</p>
              <Button variant="ghost" size="sm" className="text-xs text-primary h-auto p-0">
                View All
              </Button>
            </div>
            <div className="flex items-end justify-between gap-1 h-16 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-sm ${i === 6 ? 'bg-primary' : i < 5 ? 'bg-primary/30' : 'bg-muted'}`}
                    style={{ height: `${[60, 80, 45, 90, 70, 30, progressPercent][i]}%` }}
                  />
                  <span className="text-[9px] text-muted-foreground">{day.charAt(0)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Total: $18.50</span>
              <span className="text-green-500">+12% vs last week</span>
            </div>
          </div>

          <Separator className="my-4 border-t border-border" />

          {/* Rewards & Bonuses */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Rewards</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Gift className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">Daily Bonus</p>
                  <p className="text-[10px] text-muted-foreground">Watch 5 ads to unlock</p>
                </div>
                <Badge variant="outline" className="text-[10px] border-yellow-500/30 text-yellow-500">
                  {watchedAds.length}/5
                </Badge>
              </div>
              <div className="flex items-center gap-3 p-2 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">Weekly Streak</p>
                  <p className="text-[10px] text-muted-foreground">+$2.00 bonus at 7 days</p>
                </div>
                <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-500">
                  7/7
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="my-4 border-t border-border" />

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">Recent Activity</p>
              <History className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              {watchedAds.slice(-3).reverse().map((adId, i) => {
                const ad = ads.find(a => a.id === adId);
                return (
                  <div key={adId} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{ad?.title}</p>
                      <p className="text-[10px] text-muted-foreground">{i === 0 ? 'Just now' : `${i * 2} min ago`}</p>
                    </div>
                    <span className="text-xs font-medium text-green-500">+${ad?.reward.toFixed(2)}</span>
                  </div>
                );
              })}
              {watchedAds.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No activity yet. Start watching!</p>
              )}
            </div>
          </div>

          {/* Referral */}
          <Card className="border border-dashed border-primary/30 shadow-none bg-primary/5">
            <CardContent className="p-4 text-center">
              <Gift className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground mb-1">Invite Friends</p>
              <p className="text-[10px] text-muted-foreground mb-3">Earn $1.00 for each friend who joins</p>
              <Button size="sm" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Share Referral Link
              </Button>
            </CardContent>
          </Card>

        </div>
      </aside>
    </div>
  );
}
