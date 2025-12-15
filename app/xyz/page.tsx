"use client";

import Header from "../components/Header";
import LandingHero from "../components/LandingHero";
import LandingTestimonials from "../components/LandingTestimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

export const dynamic = 'force-dynamic';

export default function XyzPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <LandingHero />
      <LandingTestimonials />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
