// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Github } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-border/40 backdrop-blur-sm bg-background/80 dark:bg-zinc-900/80 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2 active:scale-95 transition-transform duration-300">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <span className="font-bold text-xl text-foreground">AstraLumen</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline" className="hidden sm:flex" asChild>
            <Link
              href="https://github.com/idugeni/astralumen"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
