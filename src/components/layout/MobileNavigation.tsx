"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Import navigation data
import navigationData from "@/data/navigation/navigation.json";

export function MobileNavigation() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { navigationLinks, contentGeneratorItems, settingsItems } = navigationData;

  return (
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
          {navigationLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2.5 text-sm font-medium hover:bg-accent/50 transition-colors"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
          
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
  );
}