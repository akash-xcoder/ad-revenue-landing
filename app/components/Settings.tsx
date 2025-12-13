"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User, Settings as SettingsIcon, Bell, Shield, CreditCard, Smartphone, Eye, EyeOff,
  ChevronRight, AlertCircle
} from 'lucide-react';
import Sidebar from './Sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { getCurrentUser, signOut } from '../lib/supabaseAuth';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('account');

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    darkMode: false,
    autoPlay: true,
    soundEffects: true,
  });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

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

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const settingsSections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
  ];

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
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 bg-background min-h-screen">
        <div className="w-full px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Settings Navigation */}
            <Card className="border-0 shadow-sm lg:w-64 shrink-0 bg-card">
              <CardContent className="p-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Settings Content */}
            <div className="flex-1 space-y-6">
              {/* Account Settings */}
              {activeSection === 'account' && (
                <Card className="border-0 shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Account Information</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                      <Input
                        id="fullName"
                        defaultValue={user?.user_metadata?.full_name || ''}
                        className="border-border focus:border-primary focus:ring-primary/20 bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ''}
                        className="border-border focus:border-primary focus:ring-primary/20 bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (234) 567-8900"
                        className="border-border focus:border-primary focus:ring-primary/20 bg-muted"
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <Card className="border-0 shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Notification Preferences</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Choose how you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={() => handleToggle('emailNotifications')}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications</p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={() => handleToggle('pushNotifications')}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive promotional content</p>
                      </div>
                      <Switch
                        checked={settings.marketingEmails}
                        onCheckedChange={() => handleToggle('marketingEmails')}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <>
                  <Card className="border-0 shadow-sm bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Change Password</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Update your password regularly for security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-foreground">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPasswords.current ? 'text' : 'password'}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="border-border focus:border-primary focus:ring-primary/20 pr-10 bg-muted"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPasswords.new ? 'text' : 'password'}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="border-border focus:border-primary focus:ring-primary/20 pr-10 bg-muted"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-foreground">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showPasswords.confirm ? 'text' : 'password'}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="border-border focus:border-primary focus:ring-primary/20 pr-10 bg-muted"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg text-foreground">Two-Factor Authentication</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Add an extra layer of security to your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Authenticator App</p>
                            <p className="text-sm text-muted-foreground">
                              {settings.twoFactorAuth ? 'Enabled' : 'Not configured'}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.twoFactorAuth}
                          onCheckedChange={() => handleToggle('twoFactorAuth')}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Payment Settings */}
              {activeSection === 'payment' && (
                <Card className="border-0 shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Payment Methods</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Manage your withdrawal methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary transition">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-foreground">PayPal</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary transition">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-foreground">Bank Account</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary transition">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-foreground">Crypto Wallet</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </CardContent>
                </Card>
              )}

              {/* Preferences Settings */}
              {activeSection === 'preferences' && (
                <Card className="border-0 shadow-sm bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">App Preferences</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Customize your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Auto-play Ads</p>
                        <p className="text-sm text-muted-foreground">Automatically play the next ad</p>
                      </div>
                      <Switch
                        checked={settings.autoPlay}
                        onCheckedChange={() => handleToggle('autoPlay')}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Sound Effects</p>
                        <p className="text-sm text-muted-foreground">Play sounds for actions</p>
                      </div>
                      <Switch
                        checked={settings.soundEffects}
                        onCheckedChange={() => handleToggle('soundEffects')}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                      </div>
                      <Switch
                        checked={settings.darkMode}
                        onCheckedChange={() => handleToggle('darkMode')}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Danger Zone */}
              <Card className="border-0 shadow-sm border-red-500/30 bg-card">
                <CardHeader>
                  <CardTitle className="text-lg text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Irreversible actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                  >
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
