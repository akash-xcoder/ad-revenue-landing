"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader } from 'lucide-react';
import { signUp, signInWithGoogle, getCurrentUser } from '../lib/supabaseAuth';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          router.push('/');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkUserAuth();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSignup = (): boolean => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (formData.fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/[0-9]/.test(formData.password)) {
      setError('Password must contain at least one number');
      return false;
    }
    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateSignup()) {
      return;
    }

    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.fullName);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setIsLoading(true);

    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google');
      setIsLoading(false);
    }
  };

  const passwordStrength = formData.password.length > 0 ? Math.min(Math.ceil(formData.password.length / 3), 3) : 0;
  const strengthLabels = ['Weak', 'Fair', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500'];

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-neutral-light mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-white">AdzoPay</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join thousands earning money by watching ads</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400" size={20} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* Password Strength */}
            {formData.password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColors[passwordStrength - 1]} transition-all duration-300`}
                    style={{ width: `${(passwordStrength / 3) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{strengthLabels[passwordStrength - 1]}</span>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-gray-900/50 border border-green-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 rounded bg-gray-900 border border-green-500/20 cursor-pointer mt-1"
            />
            <span className="text-sm text-gray-400">
              I agree to the{' '}
              <button type="button" className="text-green-400 hover:text-green-300 transition">
                Terms of Service
              </button>
              {' '}and{' '}
              <button type="button" className="text-green-400 hover:text-green-300 transition">
                Privacy Policy
              </button>
            </span>
          </label>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">Or continue with</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Social Signup */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="bg-gray-900 border border-gray-700 py-3 rounded-xl font-semibold text-white hover:border-green-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader size={18} className="animate-spin" /> : 'Google'}
          </button>
          <button type="button" className="bg-gray-900 border border-gray-700 py-3 rounded-xl font-semibold text-white hover:border-green-500/50 transition">
            GitHub
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-green-400 hover:text-green-300 font-semibold transition"
          >
            Sign in
          </Link>
        </p>

        {/* Back to Home */}
        <p className="text-center mt-4">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-300 text-sm transition"
          >
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
