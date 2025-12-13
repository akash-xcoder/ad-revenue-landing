"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Menu, X, LogOut, User, Settings, Bell, ChevronDown, Play, Wallet,
  DollarSign, HelpCircle, Gift, Star, Shield, Zap
} from 'lucide-react';
import { supabase, signOut, getCurrentUser } from '../lib/supabaseAuth';

interface UserProfile {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Mock data
  const balance = 32.50;
  const notifications = [
    { id: 1, title: 'New ad available!', message: 'Watch now to earn $0.35', time: '2 min ago', unread: true },
    { id: 2, title: 'Daily bonus claimed', message: 'You earned $1.00 streak bonus', time: '1 hour ago', unread: true },
    { id: 3, title: 'Withdrawal complete', message: '$25.00 sent to PayPal', time: '1 day ago', unread: false },
  ];

  const navLinks = [
    { href: '/watch-ads', label: 'Watch Ads', icon: Play },
    { href: '/earnings', label: 'Earnings', icon: Wallet },
  ];

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email,
            user_metadata: currentUser.user_metadata,
          });
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            user_metadata: session.user.user_metadata,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setShowDropdown(false);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getUserInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isActiveLink = (href: string) => pathname === href;

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#000080] rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#000080]">AdzoPay</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#000080] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#000080] hidden sm:block">AdzoPay</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActiveLink(link.href)
                    ? 'bg-[#000080]/10 text-[#000080]'
                    : 'text-[#898989] hover:text-[#000080] hover:bg-gray-50'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}

            {/* How it Works - for non-logged users */}
            {!user && (
              <Link
                href="/#how-it-works"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[#898989] hover:text-[#000080] hover:bg-gray-50 transition-all"
              >
                <HelpCircle className="w-4 h-4" />
                How it Works
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Balance Display */}
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-100">
                  <Wallet className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-700">${balance.toFixed(2)}</span>
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowDropdown(false);
                    }}
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition text-[#898989] hover:text-[#000080]"
                  >
                    <Bell className="w-5 h-5" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-[#222222]">Notifications</h3>
                        <button className="text-sm text-[#000080] hover:underline">Mark all read</button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition ${
                              notification.unread ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-[#000080]' : 'bg-gray-300'}`} />
                              <div className="flex-1">
                                <p className="font-medium text-[#222222] text-sm">{notification.title}</p>
                                <p className="text-[#898989] text-sm">{notification.message}</p>
                                <p className="text-xs text-[#898989] mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 border-t border-gray-100">
                        <button className="w-full text-center text-sm text-[#000080] hover:underline">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#000080] flex items-center justify-center text-white text-sm font-bold">
                      {getUserInitials()}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-[#222222] leading-tight">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </p>
                      <p className="text-xs text-[#898989]">Gold Member</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#898989] transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                      {/* User Info */}
                      <div className="px-4 py-4 bg-gradient-to-r from-[#000080] to-[#000080]/80">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold">
                            {getUserInitials()}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {user.user_metadata?.full_name || 'User'}
                            </p>
                            <p className="text-white/70 text-sm">{user.email}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-400" />
                          <span className="text-white/90 text-sm">Gold Member</span>
                        </div>
                      </div>

                      {/* Balance in dropdown */}
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#898989]">Balance</span>
                          <span className="font-bold text-[#000080]">${balance.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[#222222] hover:bg-gray-50 transition"
                        >
                          <User className="w-5 h-5 text-[#898989]" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/earnings"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[#222222] hover:bg-gray-50 transition"
                        >
                          <Wallet className="w-5 h-5 text-[#898989]" />
                          <span>Earnings</span>
                        </Link>
                        <Link
                          href="/watch-ads"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[#222222] hover:bg-gray-50 transition"
                        >
                          <Play className="w-5 h-5 text-[#898989]" />
                          <span>Watch Ads</span>
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[#222222] hover:bg-gray-50 transition"
                        >
                          <Settings className="w-5 h-5 text-[#898989]" />
                          <span>Settings</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition w-full"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:block px-5 py-2 text-[#000080] font-semibold hover:bg-gray-50 rounded-lg transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 bg-[#000080] text-white font-semibold rounded-lg hover:bg-[#000080]/90 transition flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition text-[#222222]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {user ? (
              <div className="space-y-2">
                {/* User Info */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#000080] flex items-center justify-center text-white font-bold">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#222222]">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-sm text-[#898989]">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#000080]">${balance.toFixed(2)}</p>
                    <p className="text-xs text-[#898989]">Balance</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <Link
                  href="/watch-ads"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActiveLink('/watch-ads')
                      ? 'bg-[#000080]/10 text-[#000080]'
                      : 'text-[#222222] hover:bg-gray-50'
                  }`}
                >
                  <Play className="w-5 h-5" />
                  <span className="font-medium">Watch Ads</span>
                </Link>
                <Link
                  href="/earnings"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActiveLink('/earnings')
                      ? 'bg-[#000080]/10 text-[#000080]'
                      : 'text-[#222222] hover:bg-gray-50'
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  <span className="font-medium">Earnings</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActiveLink('/profile')
                      ? 'bg-[#000080]/10 text-[#000080]'
                      : 'text-[#222222] hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActiveLink('/settings')
                      ? 'bg-[#000080]/10 text-[#000080]'
                      : 'text-[#222222] hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </Link>

                {/* Logout */}
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/watch-ads"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-[#222222] hover:bg-gray-50 rounded-lg transition"
                >
                  <Play className="w-5 h-5" />
                  <span className="font-medium">Watch Ads</span>
                </Link>
                <Link
                  href="/earnings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-[#222222] hover:bg-gray-50 rounded-lg transition"
                >
                  <Wallet className="w-5 h-5" />
                  <span className="font-medium">Earnings</span>
                </Link>
                <Link
                  href="/#how-it-works"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-[#222222] hover:bg-gray-50 rounded-lg transition"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">How it Works</span>
                </Link>

                <div className="pt-4 mt-2 border-t border-gray-100 space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-center font-semibold text-[#000080] border border-[#000080] rounded-lg hover:bg-[#000080]/5 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-center font-semibold text-white bg-[#000080] rounded-lg hover:bg-[#000080]/90 transition"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
