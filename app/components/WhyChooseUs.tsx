"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Users, TrendingUp, Clock, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "Your data is encrypted and protected. We never share your information with third parties."
    },
    {
      icon: Zap,
      title: "Instant Payouts",
      description: "Get paid instantly to your wallet. No waiting, no delays, no minimum threshold."
    },
    {
      icon: Users,
      title: "50K+ Active Users",
      description: "Join a thriving community of users earning real money every single day."
    },
    {
      icon: TrendingUp,
      title: "Earn More with Bonuses",
      description: "Daily bonuses, referral rewards, and streak bonuses to maximize your earnings."
    },
    {
      icon: Clock,
      title: "Work on Your Schedule",
      description: "Watch ads anytime, anywhere. Earn money at your own pace without any commitments."
    },
    {
      icon: Award,
      title: "Trusted & Verified",
      description: "4.8★ rating with thousands of positive reviews. Transparent and reliable platform."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The Best Earning Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide the most transparent, secure, and rewarding experience for our users
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <Card key={index} className="border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg text-foreground">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-card border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ready to Start Earning?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users making real money with AdzoPay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors">
                Get Started Now
              </button>
              <button className="px-8 py-3 border border-primary/50 text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
