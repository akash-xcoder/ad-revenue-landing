import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Student',
      image: '👩‍🎓',
      rating: 5,
      text: 'I started using AdzoPay last month and have already earned $150! The process is so simple and the payouts are instant. Highly recommended!',
    },
    {
      name: 'Michael Chen',
      role: 'Freelancer',
      image: '👨‍💼',
      rating: 5,
      text: 'As a freelancer with flexible hours, this is perfect for earning extra income. The ads are relevant and the platform is very user-friendly.',
    },
    {
      name: 'Emma Davis',
      role: 'Stay-at-home Parent',
      image: '👩‍🦰',
      rating: 5,
      text: 'I can earn money while taking care of my kids. No pressure, no commitments. AdzoPay has been a game-changer for my family.',
    },
    {
      name: 'James Wilson',
      role: 'Remote Worker',
      image: '👨‍💻',
      rating: 5,
      text: 'The best part is the instant payouts. I can withdraw my earnings whenever I want. Trust is everything, and AdzoPay delivers.',
    },
    {
      name: 'Lisa Anderson',
      role: 'College Student',
      image: '👩‍🎓',
      rating: 5,
      text: 'Earning $200+ per month with minimal effort. The ads are quick to watch and the rewards are fair. Love this platform!',
    },
    {
      name: 'David Martinez',
      role: 'Part-time Worker',
      image: '👨‍🔧',
      rating: 5,
      text: 'I was skeptical at first, but AdzoPay is legit. Transparent, reliable, and the customer support is amazing.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark border-t border-neutral-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-light mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-neutral-light/60 max-w-2xl mx-auto">
            Real users, real earnings, real stories. See what our community has to say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-dark rounded-2xl p-8 group hover:border-primary/50"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-neon-green text-neon-green" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-neutral-light/80 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <p className="font-semibold text-neutral-light">{testimonial.name}</p>
                  <p className="text-sm text-neutral-light/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-bold gradient-text">4.8/5</p>
            <p className="text-neutral-light/60">Average Rating</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-neutral-light/10"></div>
          <div>
            <p className="text-3xl font-bold text-neon-green">50,000+</p>
            <p className="text-neutral-light/60">Happy Users</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-neutral-light/10"></div>
          <div>
            <p className="text-3xl font-bold gradient-text-purple">$2M+</p>
            <p className="text-neutral-light/60">Paid Out</p>
          </div>
        </div>
      </div>
    </section>
  );
}
