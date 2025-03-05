"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, Twitter, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Definisi komponen SocialButton
function SocialButton({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`rounded-full bg-gradient-to-br ${color} hover:opacity-90 text-white`}
      asChild
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("transition-all duration-300 hover:scale-110")}
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/80 dark:bg-zinc-900/80">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>© {currentYear} OptiScoop - All rights reserved</p>
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>
              Created by <span className="font-medium">Eliyanto Sarage</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-4 border-t border-border/20">
          <div className="flex items-center space-x-2">
            <SocialButton
              href="https://facebook.com/eliyantosarage_"
              icon={<Facebook className="h-4 w-4" />}
              label="Facebook"
              color="from-blue-500 to-blue-700"
            />
            <SocialButton
              href="https://github.com/idugeni/optiscoop"
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
              color="from-gray-700 to-gray-900"
            />
            <SocialButton
              href="https://instagram.com/eliyantosarage_"
              icon={<Instagram className="h-4 w-4" />}
              label="Instagram"
              color="from-purple-500 to-pink-500"
            />
            <SocialButton
              href="https://twitter.com/eliyantosarage_"
              icon={<Twitter className="h-4 w-4" />}
              label="Twitter"
              color="from-blue-400 to-blue-600"
            />
            <SocialButton
              href="https://wa.me/6285641159405"
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              color="from-green-500 to-green-700"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
