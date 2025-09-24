"use client";

import { useState } from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export default function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        boxShadow: isHovered
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        position: 'relative'
      }}
      suppressHydrationWarning
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '2rem',
        color: '#0071ff',
        fontSize: '3rem',
        fontFamily: 'Georgia, serif',
        lineHeight: '1',
        opacity: '0.3'
      }}>
        "
      </div>
      <p style={{
        marginTop: '1rem',
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '#4B5563',
        position: 'relative'
      }}>
        {quote}
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <p style={{ 
          fontWeight: '600',
          fontSize: '1rem',
          color: '#111827'
        }}>
          {author}
        </p>
        <p style={{ 
          fontSize: '0.875rem',
          color: '#6B7280'
        }}>
          {role}
        </p>
      </div>
    </div>
  );
}
