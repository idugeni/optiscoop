// src/components/sections/Features.tsx
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

interface Feature {
  title: string;
  description: string;
}

function FeatureCard({ feature, delayBase }: { feature: Feature; delayBase: number }) {
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
    <div ref={ref} className="h-full">
      <Card
        className="flex flex-col h-full backdrop-blur-sm border border-border/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <CardContent className="flex flex-col h-full p-6">
          {/* Icon */}
          <div
            className={`h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-700 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
            }`}
            style={{ transitionDelay: `${delayBase}ms` }}
          >
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>
          {/* Judul */}
          <h3
            className={`font-semibold text-xl mb-2 transition-all duration-700 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: `${delayBase + 100}ms` }}
          >
            {feature.title}
          </h3>
          {/* Deskripsi */}
          <p
            className={`text-muted-foreground transition-all duration-700 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: `${delayBase + 200}ms` }}
          >
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function Features() {
  const features: Feature[] = [
    {
      title: "Modern Stack",
      description:
        "Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI for a powerful development experience.",
    },
    {
      title: "Dark Mode Ready",
      description:
        "Seamless dark mode integration with Next Themes for a comfortable viewing experience.",
    },
    {
      title: "Responsive Design",
      description:
        "Fully responsive layout that looks great on all devices, from mobile to desktop.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {features.map((feature, i) => (
        <div key={i} className="h-full">
          <FeatureCard feature={feature} delayBase={i * 150} />
        </div>
      ))}
    </div>
  );
}
