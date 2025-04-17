import React from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Templates from '@/components/landing/Templates';
import AiFeatures from '@/components/landing/AiFeatures';
import Testimonials from '@/components/landing/Testimonials';
import Cta from '@/components/landing/Cta';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <Templates />
        <AiFeatures />
        <Cta />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
