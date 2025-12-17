"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is this free to use?',
      answer: 'Yes. Creating an account and watching ads is completely free. You never need to pay to start earning.',
    },
    {
      question: 'How do I earn money?',
      answer: 'You earn by watching short sponsored ads and completing simple promotional tasks. Earnings are credited after each successful ad view.',
    },
    {
      question: 'When can I withdraw my earnings?',
      answer: 'You can request a withdrawal once you reach the minimum withdrawal limit. Payments are processed within the stated time frame.',
    },
    {
      question: 'Which payment methods are supported?',
      answer: 'We support multiple payment options such as UPI-based wallets and other popular digital payment methods.',
    },
    {
      question: 'What happens if I violate the rules?',
      answer: 'Accounts involved in misuse, automation, or fraudulent activity may be suspended and earnings may be forfeited as per our Terms & Conditions.',
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
