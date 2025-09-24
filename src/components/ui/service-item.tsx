"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ServiceItemProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function ServiceItem({ imageSrc, title, description }: ServiceItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        backgroundColor: 'white',
      }}
      suppressHydrationWarning
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '0.75rem',
          color: '#1F2937'
        }}>
          {title}
        </h3>
        <p style={{ 
          color: '#6B7280',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
        <a
          href="#"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginTop: '1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: isHovered ? '#0071ff' : '#4B5563',
            transition: 'color 0.2s',
          }}
        >
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ width: '16px', height: '16px', marginLeft: '4px' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
