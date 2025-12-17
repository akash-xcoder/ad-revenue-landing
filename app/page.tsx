import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorksSection from './components/HowItWorksSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import LiveCashoutSection from './components/LiveCashoutSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export const dynamic = 'force-dynamic';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <LiveCashoutSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
