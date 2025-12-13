"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, Eye,
  Wallet, Download, Filter, Search
} from 'lucide-react';
import Sidebar from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { getCurrentUser, signOut } from '../lib/supabaseAuth';

export default function Earnings() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock earnings data
  const earningsData = {
    totalBalance: 127.50,
    pendingBalance: 32.50,
    withdrawnTotal: 95.00,
    thisWeek: 24.75,
    lastWeek: 21.30,
    thisMonth: 89.50,
    dailyGoal: 5.00,
    dailyProgress: 3.75,
    adsWatchedToday: 15,
    averagePerAd: 0.25,
  };

  // Mock transaction history
  const transactions = [
    { id: 1, type: 'earning', description: 'Ad watched - Tech Product', amount: 0.30, date: '2024-01-15 14:32', status: 'completed' },
    { id: 2, type: 'earning', description: 'Ad watched - Fashion Brand', amount: 0.25, date: '2024-01-15 14:28', status: 'completed' },
    { id: 3, type: 'withdrawal', description: 'PayPal withdrawal', amount: -25.00, date: '2024-01-14 10:00', status: 'completed' },
    { id: 4, type: 'earning', description: 'Bonus - Daily streak', amount: 1.00, date: '2024-01-14 09:00', status: 'completed' },
    { id: 5, type: 'earning', description: 'Ad watched - Gaming App', amount: 0.35, date: '2024-01-14 08:45', status: 'completed' },
    { id: 6, type: 'earning', description: 'Ad watched - Food Delivery', amount: 0.20, date: '2024-01-13 16:20', status: 'completed' },
    { id: 7, type: 'withdrawal', description: 'Bank transfer', amount: -50.00, date: '2024-01-10 12:00', status: 'completed' },
    { id: 8, type: 'earning', description: 'Referral bonus', amount: 5.00, date: '2024-01-09 15:30', status: 'completed' },
  ];

  const periodOptions = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

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

  const percentChange = ((earningsData.thisWeek - earningsData.lastWeek) / earningsData.lastWeek * 100).toFixed(1);
  const isPositive = earningsData.thisWeek >= earningsData.lastWeek;

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
      <Sidebar earnedAmount={earningsData.pendingBalance} />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-background min-h-screen">
        <div className="w-full px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Earnings</h1>
              <p className="text-muted-foreground">Track your earnings and withdrawals</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-border text-muted-foreground">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Wallet className="w-4 h-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 text-xs">
                    Available
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">${earningsData.totalBalance.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Total Balance</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <Badge variant="secondary" className={`text-xs ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {isPositive ? '+' : ''}{percentChange}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">${earningsData.thisWeek.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">${earningsData.thisMonth.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">${earningsData.withdrawnTotal.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Total Withdrawn</p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Progress */}
          <Card className="border-0 shadow-sm mb-6 bg-card">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Daily Goal Progress</CardTitle>
              <CardDescription className="text-muted-foreground">
                You've earned ${earningsData.dailyProgress.toFixed(2)} of your ${earningsData.dailyGoal.toFixed(2)} daily goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {((earningsData.dailyProgress / earningsData.dailyGoal) * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress value={(earningsData.dailyProgress / earningsData.dailyGoal) * 100} className="h-3" />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{earningsData.adsWatchedToday} ads watched today</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>${earningsData.averagePerAd.toFixed(2)} avg per ad</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg text-foreground">Transaction History</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your recent earnings and withdrawals
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {periodOptions.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition ${
                        selectedPeriod === period.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-10 border-border focus:border-primary focus:ring-primary/20 bg-muted"
                  />
                </div>
                <Button variant="outline" className="border-border text-muted-foreground">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Transactions List */}
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earning'
                          ? 'bg-green-500/20'
                          : 'bg-blue-500/20'
                      }`}>
                        {transaction.type === 'earning' ? (
                          <ArrowDownRight className={`w-5 h-5 text-green-400`} />
                        ) : (
                          <ArrowUpRight className={`w-5 h-5 text-blue-400`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'earning' ? 'text-green-400' : 'text-foreground'
                      }`}>
                        {transaction.type === 'earning' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-6 text-center">
                <Button variant="outline" className="border-border text-muted-foreground">
                  Load More Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
