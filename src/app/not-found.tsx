"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertCircle } from 'lucide-react';
import { useMetadata } from "@/hooks/useMetadata";

export default function NotFound() {
    useMetadata({
        title: "Page Not Found",
        description: "The page you are looking for does not exist.",
    });
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center space-y-4">
          <div className="text-4xl font-extrabold">404</div>
          <div className="text-2xl font-semibold uppercase font-bold">
            Page Not Found
          </div>
          <CardDescription>
            Oops! We couldn&apos;t find the page you were looking for. It may
            have been removed or the URL might be incorrect.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Alert className="bg-destructive/50 border border-destructive/50 flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <div>
              <AlertTitle className="text-destructive-content">
                Error
              </AlertTitle>
              <AlertDescription className="text-destructive-content">
                The page you are trying to access does not exist.
              </AlertDescription>
            </div>
          </Alert>
          <Separator />
          <div className="grid grid-cols-3 gap-4">
            <Button asChild variant="default" className="w-full">
              <Link href="/">Go Back Home</Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Refresh
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="w-full">
                  Contact Support
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>Contact Support</DialogTitle>
                <DialogDescription>
                  Please provide details about what you were looking for:
                </DialogDescription>
                <div className="mt-4 space-y-3">
                  <div>
                    <Label htmlFor="support-message">Message</Label>
                    <Input
                      id="support-message"
                      placeholder="Enter your message..."
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-end">
                    <DialogClose asChild>
                      <Button>Send</Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Separator />
          <Tabs defaultValue="links" className="w-full">
            <TabsList className="w-full flex justify-around bg-muted rounded-md p-2">
              <TabsTrigger value="links" className="w-full text-center">
                Helpful Links
              </TabsTrigger>
              <TabsTrigger value="popular" className="w-full text-center">
                Popular Articles
              </TabsTrigger>
            </TabsList>
            <TabsContent value="links">
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Home</AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/"
                      className="text-primary hover:underline"
                    >
                      Visit our homepage
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>About</AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/about"
                      className="text-primary hover:underline"
                    >
                      Learn more about us
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Contact</AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/contact"
                      className="text-primary hover:underline"
                    >
                      Get in touch
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="popular">
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>How to use our platform</span>
                  <Badge variant="secondary">New</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Getting Started Guide</span>
                  <Badge variant="secondary">Updated</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Frequently Asked Questions</span>
                  <Badge variant="secondary">FAQ</Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <Separator />
          <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="absolute h-full loading-bar rounded-full" />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Please check the URL or try refreshing the page.
          </div>
        </CardContent>
      </Card>
      <style jsx>{`
        .loading-bar {
          background: linear-gradient(
            to right,
            rgba(59, 130, 246, 0) 0%,
            rgba(59, 130, 246, 1) 20%,
            rgba(59, 130, 246, 1) 80%,
            rgba(59, 130, 246, 0) 100%
          );
          position: absolute;
          top: 0;
          bottom: 0;
          animation: loadingAnimation 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes loadingAnimation {
          0% {
            left: -40%;
            right: 100%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            left: 100%;
            right: -40%;
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: 100%;
            right: -40%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
