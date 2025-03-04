// src/components/sections/Faq.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

export function Faq() {
  const faqItems = [
    {
      question: "Is AstraLumen free to use?",
      answer:
        "Yes, AstraLumen is open source and free for both personal and commercial projects. We also offer a premium version with additional features.",
    },
    {
      question: "How do I install AstraLumen?",
      answer:
        "You can clone the repository from GitHub or use our starter template by running: npx create-next-app -e https://github.com/idugeni/astralumen",
    },
    {
      question: "Does AstraLumen support TypeScript?",
      answer:
        "Yes, AstraLumen is built with TypeScript by default, providing enhanced type safety and a better developer experience.",
    },
    {
      question: "How can I customize the theme?",
      answer:
        "You can easily customize the theme via the globals.css file and tailwind.config.js to change colors, fonts, and other design aspects.",
    },
    {
      question: "What browsers are supported?",
      answer:
        "AstraLumen supports all modern browsers for a smooth and reliable experience.",
    },
    {
      question: "How do I contribute to the project?",
      answer:
        "You can fork the repository and submit a pull request for review. We welcome contributions from the community.",
    },
    {
      question: "Is there a community for AstraLumen?",
      answer:
        "Yes, we have an active community forum where you can collaborate, ask questions, and share ideas.",
    },
    {
      question: "Where can I find documentation?",
      answer:
        "All documentation is available on our official website, providing you with comprehensive guides and API references.",
    },
  ];

  const leftItems = faqItems.slice(0, 4);
  const rightItems = faqItems.slice(4);

  return (
    <section className="my-12 py-12 bg-gradient-to-br from-background/10 to-surface/10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {leftItems.map((item, index) => (
                <AnimatedElement key={index} delay={index * 150}>
                  <AccordionItem
                    value={`left-item-${index}`}
                    className="border border-border rounded-lg shadow-sm overflow-hidden"
                  >
                    <AccordionTrigger
                      className="px-6 py-3 bg-surface hover:bg-muted transition-colors text-sm sm:text-base md:text-lg font-medium text-foreground no-underline"
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-muted transition-all text-xs sm:text-sm md:text-base text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedElement>
              ))}
            </Accordion>
          </div>
          {/* Kolom Kanan */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {rightItems.map((item, index) => (
                <AnimatedElement key={index} delay={index * 150}>
                  <AccordionItem
                    value={`right-item-${index}`}
                    className="border border-border rounded-lg shadow-sm overflow-hidden"
                  >
                    <AccordionTrigger
                      className="px-6 py-3 bg-surface hover:bg-muted transition-colors text-sm sm:text-base md:text-lg font-medium text-foreground no-underline"
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 bg-muted transition-all text-xs sm:text-sm md:text-base text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedElement>
              ))}
            </Accordion>
          </div>
        </div>
    </section>
  );
}
