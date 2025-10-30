"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/navbar";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Courses from "@/components/sections/courses";
import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/footer";
import Team from "@/components/sections/team";
import About from "@/components/sections/about";
import ScrollButton from "@/components/sections/ScrollButton";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Courses />
      <Team />
      <Stats />
      <Testimonials />
      <ScrollButton />
      <Footer />
    </div>
  );
}
