import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      navigate('/watch-ads');
    }, 1000);
  };

  const passwordStrength = formData.password.length > 0 ? Math.min(Math.ceil(formData.password.length / 3), 3) : 0;
  const strengthLabels = ['Weak', 'Fair', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark flex items-center justify-center px-4 py-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary opacity-15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-neon-blue to-neon-purple rounded-lg flex items-center justify-center neon-glow">
              <span className="text-white font-bold text-xl">$</span>
            </div>
            <span className="text-2xl font-bold gradient-text">AdEarn</span>
          </div>
          <h1 className="text-4xl font-bold text-neutral-light mb-2">Create Account</h1>
          <p className="text-neutral-light/60">Join thousands earning money by watching ads</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-light mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-dark-card border border-primary/20 rounded-xl text-neutral-light placeholder-neutral-light/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-light mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-dark-card border border-primary/20 rounded-xl text-neutral-light placeholder-neutral-light/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-light mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-dark-card border border-primary/20 rounded-xl text-neutral-light placeholder-neutral-light/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-light/60 hover:text-neutral-light transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* Password Strength */}
            {formData.password && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColors[passwordStrength - 1]} transition-all duration-300`}
                    style={{ width: `${(passwordStrength / 3) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-neutral-light/60">{strengthLabels[passwordStrength - 1]}</span>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-neutral-light mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-dark-card border border-primary/20 rounded-xl text-neutral-light placeholder-neutral-light/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-light/60 hover:text-neutral-light transition"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 rounded bg-dark-card border border-primary/20 cursor-pointer mt-1"
            />
            <span className="text-sm text-neutral-light/70">
              I agree to the{' '}
              <button type="button" className="text-primary hover:text-neon-blue transition">
                Terms of Service
              </button>
              {' '}and{' '}
              <button type="button" className="text-primary hover:text-neon-blue transition">
                Privacy Policy
              </button>
            </span>
          </label>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-neon-solid py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-neutral-light/10"></div>
          <span className="text-neutral-light/60 text-sm">Or continue with</span>
          <div className="flex-1 h-px bg-neutral-light/10"></div>
        </div>

        {/* Social Signup */}
        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="card-dark py-3 rounded-xl font-semibold text-neutral-light hover:border-primary/50 transition">
            Google
          </button>
          <button type="button" className="card-dark py-3 rounded-xl font-semibold text-neutral-light hover:border-primary/50 transition">
            GitHub
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-neutral-light/70 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary hover:text-neon-blue font-semibold transition"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
