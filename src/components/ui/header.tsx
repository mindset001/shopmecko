"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);
      
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', checkIsMobile);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 9999,
      padding: '1rem 0',
      transition: 'all 0.3s ease',
      background: isScrolled 
        ? 'rgba(102, 126, 234, 0.95)' 
        : 'rgba(75, 85, 185, 0.3)',
      backdropFilter: 'blur(10px)',
      boxShadow: isScrolled 
        ? '0 4px 20px rgba(0, 0, 0, 0.15)' 
        : 'none',
      borderBottom: isScrolled 
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : 'none'
    }}
    suppressHydrationWarning>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          fontWeight: '800',
          fontSize: '1.5rem',
          color: 'white'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.5rem',
            background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
            marginRight: '0.75rem',
            color: '#2d3748'
          }}>S</span>
          ShopMecko
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {/* <Link href="/vehicle-owner/dashboard" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = '#ffd700';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'white';
            }}
            >
              Owner Dashboard
            </Link>
            <Link href="/repairer/dashboard" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = '#ffd700';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'white';
            }}
            >
              Repairer Dashboard
            </Link> */}
            <Link href="/services" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = '#ffd700';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'white';
            }}
            >
              Services
            </Link>
            {/* <Link href="/providers" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = '#ffd700';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'white';
            }}
            >
              Providers
            </Link> */}
            <Link href="/about" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = '#ffd700';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'white';
            }}
            >
              About
            </Link>
            <Link href="/contact" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color = '#ffd700';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color = 'white';
            }}
            >
              Contact
            </Link>
          </div>
        )}
        
        {/* Auth Buttons */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Link href="/login" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.backgroundColor = 'transparent';
            }}
            >
              Log in
            </Link>
            <Link href="/register" style={{
              background: 'linear-gradient(to right, #ff8c00, #ffd700)',
              color: '#2d3748',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(255, 140, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLAnchorElement).style.boxShadow = '0 6px 12px rgba(255, 140, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.target as HTMLAnchorElement).style.boxShadow = '0 4px 6px rgba(255, 140, 0, 0.3)';
            }}
            >
              Sign up
            </Link>
          </div>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.375rem',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(102, 126, 234, 0.98)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}>
          <Link href="/vehicle-owner/dashboard" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.75rem 0'
          }}>
            Owner Dashboard
          </Link>
          <Link href="/repairer/dashboard" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.75rem 0'
          }}>
            Repairer Dashboard
          </Link>
          <Link href="/services" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.75rem 0'
          }}>
            Services
          </Link>
          <Link href="/providers" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.75rem 0'
          }}>
            Providers
          </Link>
          <Link href="/about" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.75rem 0'
          }}>
            About
          </Link>
          <Link href="/contact" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.75rem 0'
          }}>
            Contact
          </Link>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Link href="/login" style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.75rem 0',
              textAlign: 'center',
              borderRadius: '0.375rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Log in
            </Link>
            <Link href="/register" style={{
              background: 'linear-gradient(to right, #ff8c00, #ffd700)',
              color: '#2d3748',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '0.75rem 0',
              borderRadius: '0.375rem',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(255, 140, 0, 0.3)'
            }}>
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
