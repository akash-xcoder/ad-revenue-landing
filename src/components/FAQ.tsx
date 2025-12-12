import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is AdEarn really free to use?',
      answer: 'Yes, AdEarn is 100% free to join and use. There are no hidden fees, no credit card required, and no charges for withdrawals. You only earn money.',
    },
    {
      question: 'How much can I earn?',
      answer: 'Earnings vary based on your region, the number of ads available, and how much time you spend. On average, users earn between $1-5 per hour. Some users earn more by being active daily.',
    },
    {
      question: 'When can I withdraw my earnings?',
      answer: 'You can withdraw your earnings anytime once you reach a minimum balance of $5. Payouts are processed instantly to your bank account or digital wallet.',
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Absolutely. We use bank-level encryption to protect your data. Your information is never shared with third parties without your consent.',
    },
    {
      question: 'How do I get started?',
      answer: 'Simply sign up with your email, verify your account, and start watching ads. You can begin earning within minutes of signing up.',
    },
    {
      question: 'Can I use AdEarn on mobile?',
      answer: 'Yes, AdEarn works on all devices including smartphones, tablets, and computers. Download our mobile app for the best experience.',
    },
    {
      question: 'What payment methods are supported?',
      answer: 'We support bank transfers, PayPal, Stripe, and various digital wallets. Choose your preferred payment method during withdrawal.',
    },
    {
      question: 'Is there a referral program?',
      answer: 'Yes! Invite friends and earn 10% of their earnings for life. No limit on how much you can earn through referrals.',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark border-t border-neutral-light/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-light mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-light/60">
            Have questions? We've got answers. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-dark rounded-xl overflow-hidden hover:border-primary/50 transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-dark-card/50 transition"
              >
                <h3 className="text-lg font-semibold text-neutral-light text-left">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={24}
                  className={`text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 py-4 bg-dark-card/50 border-t border-neutral-light/10">
                  <p className="text-neutral-light/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 card-dark rounded-2xl p-12 neon-glow border-primary/30">
          <h3 className="text-2xl font-bold text-neutral-light mb-3">Still have questions?</h3>
          <p className="text-neutral-light/60 mb-6">
            Our support team is here to help. Get in touch with us anytime.
          </p>
          <button className="btn-neon-solid px-8 py-3 rounded-lg font-semibold">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
