"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { TechStack } from "@/components/sections/TechStack";
import { GetStarted } from "@/components/sections/GetStarted";
import { Testimonial } from "@/components/sections/Testimonial";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { Faq } from "@/components/sections/Faq";
import { Newsletter } from "@/components/sections/Newsletter";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {

  return (
    <div className="w-full bg-gradient-to-b from-background to-muted dark:from-zinc-900 dark:to-background">
      <Header />
      
      <main className="min-h-screen max-w-7xl mx-auto px-4 flex-grow">
        <Hero />
        <Features />
        <TechStack />
        <FeatureShowcase />
        <GetStarted />
        <Testimonial />
        <Pricing />
        <Faq />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}