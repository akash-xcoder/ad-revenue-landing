"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getCurrentUser } from '../lib/supabaseAuth';

export default function LandingHero() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    checkUser();
  }, []);

  const handleStartEarning = () => {
    if (!user) {
      router.push('/signup');
    } else {
      router.push('/watch-ads');
    }
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-background">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-30"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary opacity-5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2">
              <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary">
                <Zap className="w-3 h-3 mr-1" />
                Premium Earning Platform
              </Badge>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Watch Ads,
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent"> Earn Money</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Join thousands of users earning real money by watching premium ads. Get paid instantly to your wallet. No hidden fees, no minimum threshold.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={handleStartEarning}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Start Earning Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">$2M+</p>
                <p className="text-sm text-muted-foreground">Paid Out</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">4.8★</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-4">
            <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Instant Payouts</h3>
                  <p className="text-sm text-muted-foreground mt-1">Get paid instantly to your wallet</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">No Hidden Fees</h3>
                  <p className="text-sm text-muted-foreground mt-1">100% transparent pricing</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Earn More</h3>
                  <p className="text-sm text-muted-foreground mt-1">Increase earnings with bonuses</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
