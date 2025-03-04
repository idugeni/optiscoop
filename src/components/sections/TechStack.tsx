// src/components/sections/TechStack.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Atom, Package, Settings } from "lucide-react";

export function TechStack() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const techCards = [
    {
      title: "React",
      description:
        "The library for web and native user interfaces. Next.js is built on the latest React features, including Server Components and Actions.",
      color: "text-primary",
      link: "https://reactjs.org/",
      icon: <Atom size={32} className="text-cyan-500" />,
    },
    {
      title: "Turbopack",
      description:
        "An incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js.",
      color: "text-accent",
      link: "https://nextjs.org/docs/advanced-features/turbopack",
      icon: <Package size={32} className="text-rose-500" />,
    },
    {
      title: "Speedy Web Compiler",
      description:
        "An extensible Rust-based platform for next-gen developer tools, used for both compilation and minification.",
      color: "text-warning",
      link: "https://vercel.com",
      icon: <Settings size={32} className="text-yellow-500" />,
    },
  ];

  return (
    <section className="w-full bg-background text-foreground my-12 py-12 rounded-lg shadow-md" ref={ref}>
      <div
        className={`mx-auto px-4 max-w-7xl transition-all duration-700 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="w-full max-w-4xl mx-auto text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-16">
          Built on a foundation of fast, production-grade tooling
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techCards.map((item, index) => (
            <Card
              key={index}
              style={{ transitionDelay: `${index * 150}ms` }}
              className={`bg-surface border border-border overflow-hidden rounded-xl shadow-lg transition-all duration-700 ease-in-out transform hover:shadow-xl hover:border-primary hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  {item.icon}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-foreground"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
