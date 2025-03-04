// src/components/sections/Testimonial.tsx
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef, ReactNode } from "react";

function AnimatedElement({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting && !hasBeenVisible) {
            setHasBeenVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasBeenVisible]);

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

export function Testimonial() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Frontend Developer",
      content:
        "AstraLumen speeds up my development workflow by up to 50%. Its modern design and highly customizable components make a big difference.",
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      content:
        "I love how AstraLumen pays attention to design details. The dark mode is also very comfortable on the eyes.",
    },
    {
      name: "Michael Johnson",
      role: "Project Manager",
      content:
        "Our project was completed faster thanks to AstraLumen. Our clients are extremely satisfied with the final results.",
    },
  ];

  return (
    <div className="mx-auto my-12 py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        Customer Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <AnimatedElement key={i} delay={i * 150}>
            <Card className="flex flex-col h-full backdrop-blur-sm border border-border/40 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col h-full">
                <p className="italic mb-3 sm:mb-4 text-sm sm:text-base flex-grow">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center mt-auto">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/20 flex items-center justify-center mr-2 sm:mr-3">
                    <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
}
