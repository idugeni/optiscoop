'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  content: string;
  buttonText: string;
}

export function FeatureCard({ href, icon: Icon, title, description, content, buttonText }: FeatureCardProps) {
  return (
    <Link href={href} className="cursor-pointer h-full">
      <Card className="transition-all duration-300 hover:shadow-xl relative overflow-hidden group border-primary/10 bg-gradient-to-br from-background to-primary/5 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="flex justify-center mt-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-md">
            <Icon className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors duration-300" />
          </div>
        </div>
        <CardHeader className="flex-none">
          <CardTitle className="text-center text-2xl font-bold">
            {title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-center">
            {content}
          </p>
        </CardContent>
        <CardFooter className="flex-none">
          <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-colors group-hover:border-primary/50">
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}