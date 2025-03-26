"use client";

import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
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
  );
}