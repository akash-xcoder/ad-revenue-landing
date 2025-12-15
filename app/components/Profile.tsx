"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Camera, Calendar, DollarSign, Eye, TrendingUp, Award, Clock, ChevronRight,
  Edit2, Shield, CreditCard, History, Play, MapPin
} from 'lucide-react';
import Sidebar from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCurrentUser, signOut } from '../lib/supabaseAuth';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user stats
  const stats = {
    totalEarned: 127.50,
    adsWatched: 423,
    totalHours: 14.5,
    currentStreak: 7,
    level: 'Gold',
    nextLevel: 'Platinum',
    levelProgress: 68,
    joinDate: 'Jan 2024',
    withdrawals: 95.00,
    pendingBalance: 32.50,
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getUserInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || 'U';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <Sidebar earnedAmount={stats.pendingBalance} />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-background min-h-screen">
        <div className="w-full px-6 py-8">
          {/* Profile Header */}
          <Card className="border-0 shadow-sm mb-6 overflow-hidden bg-card">
            <div className="h-32 bg-gradient-to-r from-primary to-primary/70" />
            <CardContent className="relative pt-0 pb-6">
              {/* Avatar */}
              <div className="absolute -top-16 left-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
                    <AvatarImage src={user?.user_metadata?.avatar_url} className="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-card shadow-md flex items-center justify-center hover:bg-muted transition">
                    <Camera className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* User Info */}
              <div className="pt-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-foreground">
                      {user?.user_metadata?.full_name || 'User'}
                    </h1>
                    <Badge variant="default" className="bg-amber-500/20 text-amber-400 border-0">
                      <Award className="w-3 h-3 mr-1" />
                      {stats.level}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {stats.joinDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      United States
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-border text-muted-foreground hover:text-primary hover:border-primary"
                  onClick={() => router.push('/settings')}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                    +12%
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">${stats.totalEarned.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Total Earned</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.adsWatched}</p>
                <p className="text-xs text-muted-foreground">Ads Watched</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.totalHours}h</p>
                <p className="text-xs text-muted-foreground">Watch Time</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stats.currentStreak} days</p>
                <p className="text-xs text-muted-foreground">Current Streak</p>
              </CardContent>
            </Card>
          </div>

          {/* Level Progress */}
          <Card className="border-0 shadow-sm mb-6 bg-card">
            <CardHeader className="">
              <CardTitle className="text-lg text-foreground">Level Progress</CardTitle>
              <CardDescription className="text-muted-foreground">
                You're {100 - stats.levelProgress}% away from {stats.nextLevel}
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{stats.level}</span>
                    <span className="text-sm text-muted-foreground">{stats.nextLevel}</span>
                  </div>
                  <Progress value={stats.levelProgress} className="h-2" />
                </div>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Award className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Watch 77 more ads to reach Platinum level and unlock exclusive rewards!
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader className="">
              <CardTitle className="text-lg text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <button
                onClick={() => router.push('/watch-ads')}
                className="w-full flex items-center justify-between p-4 hover:bg-muted transition border-b border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Watch Ads</p>
                    <p className="text-sm text-muted-foreground">Start earning now</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted transition border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Withdraw Funds</p>
                    <p className="text-sm text-muted-foreground">${stats.pendingBalance.toFixed(2)} available</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => router.push('/settings')}
                className="w-full flex items-center justify-between p-4 hover:bg-muted transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Security Settings</p>
                    <p className="text-sm text-muted-foreground">Manage your security</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
