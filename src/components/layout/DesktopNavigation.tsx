"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Import navigation data
import navigationData from "@/data/navigation/navigation.json";

// ListItem component for navigation menu items
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

export function DesktopNavigation() {
  const { navigationLinks, contentGeneratorItems, settingsItems } = navigationData;

  return (
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
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] transform transition-all duration-400 ease-out will-change-transform">
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
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] transform transition-all duration-400 ease-out will-change-transform">
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
  );
}