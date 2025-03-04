// src/components/sections/Pricing.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  variant?: "left" | "bottom" | "right";
}

function AnimatedElement({ children, delay = 0, variant = "bottom" }: AnimatedElementProps) {
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

  const baseClasses = "transition-all duration-700 ease-in-out";
  let visibleClasses = "";
  let hiddenClasses = "";
  switch (variant) {
    case "left":
      visibleClasses = "opacity-100 translate-x-0";
      hiddenClasses = "opacity-0 -translate-x-10";
      break;
    case "right":
      visibleClasses = "opacity-100 translate-x-0";
      hiddenClasses = "opacity-0 translate-x-10";
      break;
    case "bottom":
    default:
      visibleClasses = "opacity-100 translate-y-0";
      hiddenClasses = "opacity-0 translate-y-10";
      break;
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${baseClasses} ${isVisible ? visibleClasses : hiddenClasses}`}
    >
      {children}
    </div>
  );
}

export function Pricing() {
  const pricingPlans = [
    {
      title: "Starter",
      price: "Free",
      description: "For personal projects and experiments.",
      features: [
        "Basic components",
        "Dark mode",
        "Responsive",
        "Basic documentation",
      ],
      buttonText: "Get Started",
      popular: false,
      link: "/signup",
    },
    {
      title: "Pro",
      price: "Rp 499,000",
      description: "For professional websites and applications.",
      features: [
        "All Starter features",
        "50+ premium components",
        "Priority support",
        "Access to templates",
        "Lifetime updates",
      ],
      buttonText: "Buy Now",
      popular: true,
      link: "/buy-pro",
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      description: "For large enterprise needs.",
      features: [
        "All Pro features",
        "24/7 support",
        "Whitelabel customization",
        "Team training",
        "Deployment assistance",
      ],
      buttonText: "Contact Us",
      popular: false,
      link: "/contact",
    },
  ];

  return (
    <section className="my-12 py-12">
      <div className="max-w-7xl mx-auto text-center mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content mb-4">
          Our Pricing Plans
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
          Simple and transparent pricing for every business.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mt-16">
        {pricingPlans.map((plan, i) => {
          let variant: "left" | "bottom" | "right" = "bottom";
          if (i === 0) variant = "left";
          else if (i === 2) variant = "right";

          return (
            <div key={i} className="flex-1">
              <AnimatedElement delay={i * 150} variant={variant}>
                <Card
                  className={`relative flex flex-col rounded-xl shadow-xl p-8 w-full transition-all duration-500 ease-in-out ${
                    plan.popular
                      ? "md:scale-110 border-2 border-primary hover:-translate-y-2 hover:shadow-lg"
                      : "md:scale-100 hover:-translate-y-2 hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <Badge
                      className="absolute -top-4 left-1/2 z-10 transform -translate-x-1/2 px-4 py-1 text-sm font-bold rounded-full border border-primary bg-primary text-primary-foreground"
                      variant="default"
                    >
                      Most Popular
                    </Badge>
                  )}
                  <CardContent className="flex flex-col h-full p-0 backdrop-blur-sm">
                    <h3 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-base-content text-center">
                      {plan.title}
                    </h3>
                    <div className="mt-4 text-center">
                      <span
                        className={`font-extrabold ${
                          plan.price === "Free" || plan.price === "Contact Us"
                            ? "text-xl sm:text-2xl"
                            : "text-2xl sm:text-3xl"
                        } text-base-content`}
                      >
                        {plan.price}
                      </span>
                      {plan.price !== "Free" && plan.price !== "Contact Us" && (
                        <span className="text-base sm:text-lg md:text-xl text-muted-foreground ml-2">
                          /year
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-center text-sm sm:text-base md:text-lg text-muted-foreground">
                      {plan.description}
                    </p>
                    <ul className="mt-6 mb-8 flex-1 space-y-3 text-left">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-sm sm:text-base md:text-lg text-base-content">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-primary mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-auto">
                      <Link href={plan.link}>{plan.buttonText}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          );
        })}
      </div>
    </section>
  );
}
