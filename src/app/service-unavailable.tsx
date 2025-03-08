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
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ServerOff } from 'lucide-react';
import { useMetadata } from "@/hooks/useMetadata";

export default function ServiceUnavailable() {
  useMetadata(
    "Service Unavailable",
    "The service you are trying to access is currently unavailable."
  );
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <ServerOff className="w-16 h-16 text-destructive" />
          </div>
          <div className="text-2xl font-semibold uppercase font-bold">
            Service Unavailable
          </div>
          <CardDescription>
            We apologize for the inconvenience. The service you are trying to access is currently unavailable.
            Our team has been notified and is working to restore service as quickly as possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Alert className="bg-destructive/50 border border-destructive/50 flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <div>
              <AlertTitle className="text-destructive-content">
                Service Disruption
              </AlertTitle>
              <AlertDescription className="text-destructive-content">
                We&apos;re experiencing technical difficulties. Please try again later.
              </AlertDescription>
            </div>
          </Alert>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <Button asChild variant="default" className="w-full">
              <Link href="/">Go Back Home</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Try Again
            </Button>
          </div>
          <Separator />
          <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className="absolute h-full loading-bar rounded-full" />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Our team has been automatically notified and is working to resolve the issue.
          </div>
        </CardContent>
      </Card>
      <style jsx>{`
        .loading-bar {
          background: linear-gradient(
            to right,
            rgba(239, 68, 68, 0) 0%,
            rgba(239, 68, 68, 1) 20%,
            rgba(239, 68, 68, 1) 80%,
            rgba(239, 68, 68, 0) 100%
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