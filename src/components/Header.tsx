import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Settings, Bell } from 'lucide-react';
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
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

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

    // Subscribe to auth changes
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

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      navigate('/');
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

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 glass border-b border-neutral-light/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-neon-blue to-neon-purple rounded-lg flex items-center justify-center neon-glow">
                <span className="text-white font-bold text-lg">$</span>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:inline">AdzoPay</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 glass border-b border-neutral-light/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-neon-blue to-neon-purple rounded-lg flex items-center justify-center neon-glow">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">AdzoPay</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => navigate('/watch-ads')}
              className="text-neutral-light/70 hover:text-neutral-light transition duration-300 font-medium"
            >
              Watch Ads
            </button>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex gap-4 items-center">
            {user ? (
              <>
                {/* Notifications */}
                <button className="p-2 rounded-lg hover:bg-dark-card transition text-neutral-light/70 hover:text-neutral-light relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-dark-card transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-neon-blue to-neon-purple flex items-center justify-center text-white text-sm font-bold">
                      {getUserInitials()}
                    </div>
                    <span className="text-neutral-light text-sm font-medium hidden sm:inline">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-neutral-light/10 rounded-lg shadow-lg overflow-hidden">
                      <div className="px-4 py-3 border-b border-neutral-light/10">
                        <p className="text-sm text-neutral-light font-medium">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-neutral-light/60">{user.email}</p>
                      </div>

                      <button className="w-full px-4 py-2 text-left text-neutral-light/70 hover:text-neutral-light hover:bg-dark-bg transition flex items-center gap-2">
                        <User size={16} />
                        <span>Profile</span>
                      </button>

                      <button className="w-full px-4 py-2 text-left text-neutral-light/70 hover:text-neutral-light hover:bg-dark-bg transition flex items-center gap-2">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-red-400 hover:text-red-300 hover:bg-dark-bg transition flex items-center gap-2 border-t border-neutral-light/10"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="btn-neon px-6 py-2 rounded-lg font-semibold"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-neon-solid px-6 py-2 rounded-lg font-semibold"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-card transition text-neutral-light"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-neutral-light/10 pt-4">
            {user ? (
              <>
                <div className="px-4 py-3 bg-dark-card rounded-lg border border-neutral-light/10">
                  <p className="text-sm text-neutral-light font-medium">
                    {user.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-neutral-light/60">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    navigate('/watch-ads');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-neutral-light/70 hover:text-neutral-light transition"
                >
                  Watch Ads
                </button>

                <button className="block w-full text-left px-4 py-2 text-neutral-light/70 hover:text-neutral-light transition">
                  Profile
                </button>

                <button className="block w-full text-left px-4 py-2 text-neutral-light/70 hover:text-neutral-light transition">
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 transition border-t border-neutral-light/10 pt-3"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-neutral-light/70 hover:text-neutral-light transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-neutral-light/70 hover:text-neutral-light transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
