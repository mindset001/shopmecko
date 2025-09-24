"use client";

import { useState } from 'react';
import Link from "next/link";

export default function CtaSection() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <section style={{
      backgroundColor: '#0071ff',
      padding: '4rem 0',
      margin: '4rem 0',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '1rem',
          background: 'linear-gradient(to right, #ffffff, #e0f2fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Join the ShopMeco Ecosystem
        </h2>
        <div style={{ maxWidth: '900px', margin: '0 auto 2.5rem' }}>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '0.75rem',
            color: 'rgba(255, 255, 255, 0.95)'
          }}>
            Whether you're a vehicle owner seeking service, a repair specialist, or a parts seller, 
            ShopMeco connects everyone in the automotive ecosystem.
          </p>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '500'
          }}>
            Join over 10,000+ users who trust our platform for all their automotive needs.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#0071ff',
              border: '2px solid white',
              padding: '0.75rem 2rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            }}
            className="hover:shadow-lg hover:transform hover:scale-105"
            suppressHydrationWarning
          >
            Join as Vehicle Owner
          </Link>
          
          <Link href="/register?role=REPAIRER" style={{
              display: 'inline-block',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '0.75rem 2rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
            className="hover:bg-white hover:text-blue-600 hover:shadow-lg"
            suppressHydrationWarning
          >
            Register as Service Provider
          </Link>
          
          <Link href="/register?role=SELLER" style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              padding: '0.75rem 2rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              backdropFilter: 'blur(4px)'
            }}
            className="hover:bg-white hover:text-blue-600 hover:shadow-lg"
            suppressHydrationWarning
          >
            Become a Parts Seller
          </Link>
        </div>
      </div>
    </section>
  );
}
