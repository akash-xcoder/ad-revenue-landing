"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Play, Wallet, User, Settings, LogOut, History, Gift, Trophy, HelpCircle, Bell, CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SidebarProps {
  earnedAmount?: number;
  goalAmount?: number;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export default function Sidebar({ earnedAmount = 0, goalAmount = 5 }: SidebarProps) {
  const pathname = usePathname();

  const progressPercent = Math.min((earnedAmount / goalAmount) * 100, 100);

  const mainNavItems: NavItem[] = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, href: '/' },
    { label: 'Watch Ads', icon: <Play className="w-5 h-5" />, href: '/watch-ads' },
    { label: 'Earnings', icon: <Wallet className="w-5 h-5" />, href: '/earnings' },
  ];

  const secondaryNavItems: NavItem[] = [
    { label: 'Rewards', icon: <Gift className="w-5 h-5" />, href: '/rewards' },
    { label: 'Leaderboard', icon: <Trophy className="w-5 h-5" />, href: '/leaderboard' },
  ];

  const accountNavItems: NavItem[] = [
    { label: 'Profile', icon: <User className="w-5 h-5" />, href: '/profile' },
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link
          href="/"
          className="text-2xl font-bold text-primary tracking-tight"
        >
          AdzoPay
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Main Navigation */}
        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Main</p>
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}

        <Separator className="my-3" />

        {/* Secondary Navigation */}
        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explore</p>
        {secondaryNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}

        <Separator className="my-3" />

        {/* Account Navigation */}
        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
        {accountNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Earnings Summary */}
      <div className="p-4 border-t border-border">
        <div className="bg-muted rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Session Earnings</p>
          <p className="text-2xl font-bold text-primary">${earnedAmount.toFixed(2)}</p>
          <div className="mt-2">
            <Progress value={progressPercent} className="h-1.5" />
            <p className="text-xs text-muted-foreground mt-1">{progressPercent.toFixed(0)}% of ${goalAmount} goal</p>
          </div>
        </div>
        <Link href="/earnings">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Wallet className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </Link>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Link href="/login">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </Link>
      </div>
    </aside>
  );
}
