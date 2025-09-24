"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  bgColor?: string;
  hoverBgColor?: string;
  animation?: "lift" | "scale" | "none";
}

export default function AnimatedLink({
  href,
  className = "",
  children,
  bgColor = "#0071ff",
  hoverBgColor = "#005ad9",
  animation = "lift"
}: AnimatedLinkProps) {
  const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = hoverBgColor;
    
    if (animation === "lift") {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
    } else if (animation === "scale") {
      e.currentTarget.style.transform = "scale(1.05)";
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.backgroundColor = bgColor;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <Link 
      href={href}
      className={className}
      style={{
        backgroundColor: bgColor,
        transition: "all 0.3s"
      }}
      suppressHydrationWarning
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </Link>
  );
}
