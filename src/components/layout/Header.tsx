"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { Logo } from "./Logo";

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 w-full z-50 border-b border-border/40 backdrop-blur-sm bg-background/95 dark:bg-zinc-900/95 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo & Brand */}
        <Logo />

        {/* Desktop Navigation */}
        {!isMobile && <DesktopNavigation />}

        {/* Right-side controls: Theme toggle & Mobile Menu */}
        <nav className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu */}
          {isMobile && <MobileNavigation />}
        </nav>
      </div>
    </header>
  );
}
