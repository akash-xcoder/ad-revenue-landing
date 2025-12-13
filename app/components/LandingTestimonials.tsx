"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export default function LandingTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content: "I've been using AdzoPay for 3 months and earned over $500! It's so easy and the payouts are instant.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      content: "Great platform! I watch ads during my breaks and it adds up nicely. No hidden fees, just pure earning.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Homemaker",
      content: "Finally found a legitimate way to earn extra income from home. The support team is amazing!",
      rating: 5,
      avatar: "ED"
    },
    {
      name: "James Wilson",
      role: "Part-time Worker",
      content: "Best passive income app I've used. Transparent, reliable, and the earnings are real.",
      rating: 5,
      avatar: "JW"
    },
    {
      name: "Lisa Anderson",
      role: "College Student",
      content: "Earning money while watching ads? Yes please! Already made enough for my textbooks.",
      rating: 5,
      avatar: "LA"
    },
    {
      name: "David Martinez",
      role: "Retiree",
      content: "A wonderful way to stay engaged and earn some extra pocket money. Highly recommended!",
      rating: 5,
      avatar: "DM"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary mb-4">
            Testimonials
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who are earning real money with AdzoPay
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 bg-card hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
