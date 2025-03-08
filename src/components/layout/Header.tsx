// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Github, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Navigation links data
const navigationLinks = [
  { href: "/", label: "Home" },
  {
    label: "Tools",
    items: [
      { href: "/ai-title", label: "Title Generator" },
      { href: "/ai-news", label: "News Generator" },
      { href: "/ai-x", label: "X/Twitter Thread" },
    ],
  },
  { href: "/api-settings", label: "API Settings" },
  { href: "/panduan", label: "Panduan" },
  { href: "/donation", label: "Donasi" },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-border/40 backdrop-blur-sm bg-background/80 dark:bg-zinc-900/80 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2 active:scale-95 transition-transform duration-300">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Image src="/gemini.png" alt="Gemini Logo" width={512} height={512} />
            </div>
            <span className="font-bold text-xl text-foreground">OptiScoop</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.href || link.label}>
                  {link.items ? (
                    <>
                      <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 p-2">
                          {link.items.map((item) => (
                            <NavigationMenuLink
                              key={item.href}
                              href={item.href}
                              className="block px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
                            >
                              {item.label}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <nav className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                  {navigationLinks.map((link) => 
                    link.items ? (
                      <div key={link.label}>
                        <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                          {link.label}
                        </div>
                        {link.items.map((item) => (
                          <SheetClose asChild key={item.href}>
                            <Link
                              href={item.href}
                              className="block px-8 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    ) : (
                      <SheetClose asChild key={link.href}>
                        <Link 
                          href={link.href}
                          className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}

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
              href="https://github.com/idugeni/optiscoop"
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
