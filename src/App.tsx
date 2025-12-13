import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Header from './components/Header';
import AdWatcherSupabase from './components/AdWatcherSupabase';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminPanel from './components/AdminPanel';
import GlowingBubbles from './components/GlowingBubbles';
import AuthCallback from './components/AuthCallback';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-bg to-neutral-dark relative overflow-hidden">
      <GlowingBubbles />
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/watch-ads" element={<AdWatcherSupabase />} />
      </Routes>
    </Router>
  );
}

export default App;
