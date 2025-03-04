// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Twitter, Github, Linkedin, Mail, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/80 dark:bg-zinc-900/80">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AstraLumen. Built with Next.js and Shadcn UI.
          </p>
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link
                href="https://twitter.com/astralumen"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("transition-colors duration-200 hover:text-primary")}
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link
                href="https://github.com/idugeni/astralumen"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("transition-colors duration-200 hover:text-primary")}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link
                href="https://www.linkedin.com/astralumen"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("transition-colors duration-200 hover:text-primary")}
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link
                href="mailto:officialelsa21@gmail.com"
                className={cn("transition-colors duration-200 hover:text-primary")}
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link
                href="https://astralumen.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("transition-colors duration-200 hover:text-primary")}
              >
                <Globe className="h-4 w-4" />
                <span className="sr-only">Website</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
