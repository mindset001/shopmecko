"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface InteractiveLinkProps {
  href: string;
  style?: React.CSSProperties;
  hoverColor?: string;
  defaultColor?: string;
  children: ReactNode;
}

export default function InteractiveLink({ 
  href, 
  style, 
  hoverColor = '#0071ff', 
  defaultColor = '#374151', 
  children 
}: InteractiveLinkProps) {
  return (
    <Link 
      href={href} 
      style={{ 
        ...style,
        position: 'relative',
        transition: 'color 0.2s'
      }}
      suppressHydrationWarning
      onMouseOver={(e) => {
        e.currentTarget.style.color = hoverColor;
        const span = e.currentTarget.querySelector('span');
        if (span && 'style' in span) {
          (span as HTMLElement).style.transform = 'scaleX(1)';
        }
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.color = defaultColor;
        const span = e.currentTarget.querySelector('span');
        if (span && 'style' in span) {
          (span as HTMLElement).style.transform = 'scaleX(0)';
        }
      }}
    >
      {children}
      <span style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '2px',
        backgroundColor: hoverColor,
        transform: 'scaleX(0)',
        transition: 'transform 0.3s',
        transformOrigin: 'left'
      }}></span>
    </Link>
  );
}
