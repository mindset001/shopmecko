"use client";

import { useState } from 'react';
import InteractiveLink from './interactive-link';

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // We'll use inline styles directly instead of this object
  // to avoid TypeScript errors with the position property

  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        height: '80px',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 40
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href="/" style={{ 
            fontWeight: 'bold', 
            fontSize: '1.5rem', 
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{color: '#0071ff'}}>Shop</span>
            <span style={{color: '#374151'}}>Meco</span>
          </a>
        </div>

        {/* Navigation Links for Desktop */}
        <nav style={{
          alignItems: 'center'
        }} className="hidden md:flex md:flex-row">
          <InteractiveLink href="/" style={{
            color: '#374151',
            fontWeight: '500',
            position: 'relative' as const,
            padding: '8px 16px',
            margin: '0 8px'
          }}>
            Home
          </InteractiveLink>
          <InteractiveLink href="/about" style={{
            color: '#374151',
            fontWeight: '500',
            position: 'relative' as const,
            padding: '8px 16px',
            margin: '0 8px'
          }}>
            About
          </InteractiveLink>
          <InteractiveLink href="/services" style={{
            color: '#374151',
            fontWeight: '500',
            position: 'relative' as const,
            padding: '8px 16px',
            margin: '0 8px'
          }}>
            Services
          </InteractiveLink>
          <InteractiveLink href="/contact" style={{
            color: '#374151',
            fontWeight: '500',
            position: 'relative' as const,
            padding: '8px 16px',
            margin: '0 8px'
          }}>
            Contact
          </InteractiveLink>
        </nav>

        {/* Auth Links for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <InteractiveLink href="/login" style={{
            padding: '8px 16px',
            color: '#374151',
            fontWeight: '500',
            borderRadius: '6px'
          }}>
            Log In
          </InteractiveLink>
          
          <div className="relative group">
            <a href="/register" style={{
              padding: '10px 16px',
              color: 'white',
              backgroundColor: '#0071ff',
              fontWeight: '500',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover:shadow-md hover:bg-blue-600">
              Sign Up
            </a>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
              <div className="py-1">
                <a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Vehicle Owner
                </a>
                <a href="/register?role=REPAIRER" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Service Provider
                </a>
                <a href="/register?role=SELLER" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Parts Seller
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          style={{
            display: 'block', 
            marginLeft: 'auto',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }} 
          className="md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ width: '24px', height: '24px' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '0',
          width: '100%',
          backgroundColor: 'white',
          padding: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column'
        }} className="md:hidden">
          <a href="/" style={{ padding: '12px 0', fontWeight: '500', color: '#374151' }}>
            Home
          </a>
          <a href="/about" style={{ padding: '12px 0', fontWeight: '500', color: '#374151' }}>
            About
          </a>
          <a href="/services" style={{ padding: '12px 0', fontWeight: '500', color: '#374151' }}>
            Services
          </a>
          <a href="/contact" style={{ padding: '12px 0', fontWeight: '500', color: '#374151' }}>
            Contact
          </a>
          <hr style={{ margin: '8px 0' }} />
          <a href="/login" style={{ padding: '12px 0', fontWeight: '500', color: '#374151' }}>
            Log In
          </a>
          
          {/* Registration options with clear role distinction */}
          <div style={{ marginTop: '8px' }}>
            <p style={{ fontWeight: '500', color: '#6b7280', marginBottom: '8px', fontSize: '0.9rem' }}>
              Register as:
            </p>
            <a href="/register" style={{ 
              marginBottom: '8px',
              padding: '10px 16px',
              backgroundColor: '#0071ff',
              color: 'white',
              display: 'block',
              textAlign: 'center',
              borderRadius: '6px',
              fontWeight: '500'
            }}>
              Vehicle Owner
            </a>
            <a href="/register?role=REPAIRER" style={{ 
              marginBottom: '8px',
              padding: '10px 16px',
              backgroundColor: '#fbbf24',
              color: 'white',
              display: 'block',
              textAlign: 'center',
              borderRadius: '6px',
              fontWeight: '500'
            }}>
              Service Provider
            </a>
            <a href="/register?role=SELLER" style={{ 
              padding: '10px 16px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              display: 'block',
              textAlign: 'center',
              borderRadius: '6px',
              fontWeight: '500'
            }}>
              Parts Seller
            </a>
          </div>
        </div>
      )}
    </>
  );
}
