// src/components/sections/Newsletter.tsx
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
}

function AnimatedElement({ children, delay = 0 }: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
}

export function Newsletter() {
  return (
    <section className="relative my-12 py-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl backdrop-blur-sm overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[url('/pattern.svg')] bg-cover bg-center opacity-20" />
      <div className="max-w-3xl mx-auto text-center px-4">
        <AnimatedElement delay={100}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
            Stay Updated with AstraLumen
          </h2>
        </AnimatedElement>
        <AnimatedElement delay={200}>
          <p className="text-base sm:text-lg text-muted-foreground mb-10">
            Get the latest updates, tips, and tricks delivered straight to your inbox.
          </p>
        </AnimatedElement>
        <AnimatedElement delay={300}>
          <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full sm:w-auto flex-1 h-12 rounded-md border border-input bg-background px-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none"
            />
            <Button type="submit" className="rounded-md px-6 py-3 focus:outline-none">
              Subscribe
            </Button>
          </form>
        </AnimatedElement>
      </div>
    </section>
  );
}
