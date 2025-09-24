"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CtaButtonProps {
  href: string;
  variant: "primary" | "secondary";
  className?: string;
  children: ReactNode;
}

export default function CtaButton({
  href,
  variant,
  className = "",
  children
}: CtaButtonProps) {
  const variantClass = variant === "primary" 
    ? "bg-blue-600 hover:bg-blue-700 text-white" 
    : "bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-600";
  
  return (
    <Link href={href} className="group" suppressHydrationWarning>
      <Button
        className={cn(
          "inline-flex items-center justify-center rounded-md px-6 py-3 text-lg font-medium transition-all hover:-translate-y-1 hover:shadow-lg",
          variantClass,
          className
        )}
      >
        {children}
      </Button>
    </Link>
  );
}
