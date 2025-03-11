"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Data untuk menu utama
const navigationLinks = [
  { href: "/", label: "Home" },
];

// Data untuk menu content generators
const contentGeneratorItems = [
  {
    title: "Title Generator",
    href: "/title",
    description: "Create engaging and SEO-friendly article titles.",
  },
  {
    title: "News Generator",
    href: "/news",
    description: "Generate informative news articles with AI.",
  },
  {
    title: "X/Twitter Thread",
    href: "/x",
    description: "Convert content into optimized X/Twitter threads.",
  },
];

// Data untuk menu settings
const settingsItems = [
  {
    title: "Settings",
    href: "/settings",
    description: "Manage your account settings and preferences.",
  },
  {
    title: "Panduan",
    href: "/panduan",
    description: "User guide and documentation.",
  },
  {
    title: "Donasi",
    href: "/donation",
    description: "Support us with your donation.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function Header() {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 border-b border-border/40 backdrop-blur-sm bg-background/95 dark:bg-zinc-900/95 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Image
              src="/gemini.png"
              alt="Gemini Logo"
              width={512}
              height={512}
              className="w-6 h-6"
            />
          </div>
          <span className="font-bold text-xl text-foreground">OptiScoop</span>
        </Link>

        {/* Desktop Navigation: Main menu & Settings dropdown */}
        {!isMobile && (
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link href={link.href} className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 rounded-md")}>
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              
              {/* Content Generators Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 rounded-md")}>
                  Content Generators
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] animate-in slide-in-from-left-4 duration-300 ease-in-out">
                    <li className="row-span-3 md:col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <Image
                              src="/gemini.png"
                              alt="Gemini Logo"
                              width={512}
                              height={512}
                              className="w-6 h-6"
                            />
                          </div>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            OptiScoop
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            AI-powered tools for content creation and optimization for PR professionals.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {contentGeneratorItems.map((item) => (
                      <ListItem key={item.href} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent/50 data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 rounded-md")}>
                  Settings
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] animate-in slide-in-from-right-4 duration-300 ease-in-out">
                    {settingsItems.map((item) => (
                      <ListItem key={item.href} title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Right-side controls: Theme toggle & Mobile Menu */}
        <nav className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-accent/50 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 transition-transform duration-200 dark:hidden" />
            <Moon className="h-5 w-5 hidden dark:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu using Sheet */}
          {isMobile && (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/50 rounded-full focus:outline-none"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 sm:w-80 p-0 overflow-y-auto"
              >
                <SheetHeader className="p-4 border-b border-border/40">
                  <SheetTitle className="text-lg font-semibold">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col py-2">
                  {/* Home Link */}
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="px-4 py-2.5 text-sm font-medium hover:bg-accent/50 transition-colors"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  
                  {/* Content Generator Section */}
                  <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                    Content Generators
                  </div>
                  {contentGeneratorItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="px-6 py-2.5 text-sm font-medium hover:bg-accent/50 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                  
                  {/* Settings Section */}
                  <div className="px-4 py-2 text-sm font-semibold text-muted-foreground mt-2">
                    Settings
                  </div>
                  {settingsItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="px-6 py-2.5 text-sm font-medium hover:bg-accent/50 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </nav>
      </div>
    </header>
  );
}
