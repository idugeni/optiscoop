"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside of the theme dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [themeDropdownRef]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-accent/50 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0"
        onClick={() => {
          setIsThemeDropdownOpen(!isThemeDropdownOpen);
        }}
        aria-label="Toggle theme"
        aria-expanded={isThemeDropdownOpen}
        aria-controls="theme-dropdown"
      >
        {theme === 'system' ? (
          <>
            <Sun className="h-5 w-5 transition-transform duration-200 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
          </>
        ) : theme === 'light' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      {/* Theme Dropdown Menu */}
      {isThemeDropdownOpen && (
        <div 
          id="theme-dropdown" 
          className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-background border border-border z-50"
          ref={themeDropdownRef}
        >
          <div className="py-1 rounded-md bg-popover">
            <button
              onClick={() => {
                setTheme('light');
                setIsThemeDropdownOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-accent/50 ${theme === 'light' ? 'text-primary font-medium' : 'text-foreground'}`}
            >
              <Sun className="h-4 w-4 mr-2" />
              Light
            </button>
            <button
              onClick={() => {
                setTheme('dark');
                setIsThemeDropdownOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-accent/50 ${theme === 'dark' ? 'text-primary font-medium' : 'text-foreground'}`}
            >
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </button>
            <button
              onClick={() => {
                setTheme('system');
                setIsThemeDropdownOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-sm hover:bg-accent/50 ${theme === 'system' ? 'text-primary font-medium' : 'text-foreground'}`}
            >
              <div className="h-4 w-4 mr-2 relative">
                <Sun className="h-4 w-4 absolute transition-transform duration-200 dark:opacity-0 opacity-100" />
                <Moon className="h-4 w-4 absolute dark:opacity-100 opacity-0" />
              </div>
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}