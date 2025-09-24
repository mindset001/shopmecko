"use client";

import { useState, useEffect } from 'react';
import React from 'react';

export default function HowItWorksSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if we're on client-side
    if (typeof window !== 'undefined') {
      // Function to update state based on window width
      const updateScreenSize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      // Set initial value
      updateScreenSize();

      // Add event listener for window resize
      window.addEventListener('resize', updateScreenSize);

      // Clean up
      return () => window.removeEventListener('resize', updateScreenSize);
    }
  }, []);

  return (
    <section id="how-it-works" style={{ 
      padding: '6rem 0',
      backgroundColor: '#f9fafb',
      overflow: 'hidden'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '4rem' 
        }} className="animate-fade-in-up">
          <h2 style={{ 
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#1e3a8a',
            display: 'inline-block',
            position: 'relative'
          }}>
            How It Works
            <span style={{ 
              position: 'absolute',
              bottom: '-0.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '6rem',
              height: '0.25rem',
              backgroundColor: '#0071ff',
              borderRadius: '9999px'
            }}></span>
          </h2>
          <p style={{ 
            fontSize: '1.25rem',
            color: '#6b7280',
            maxWidth: '48rem',
            margin: '1.5rem auto 0'
          }}>
            Simple steps to get your vehicle serviced
          </p>
        </div>

        {/* Use flexDirection row for desktop and column for mobile */}
        <div style={{ 
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          gap: '2rem'
        }}>
          {/* Step 1 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            flex: 1,
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }} className="animate-fade-in-up">
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#0071ff'
              }}>1</span>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1F2937'
            }}>Register Your Vehicle</h3>
            <p style={{ 
              color: '#6B7280',
              lineHeight: '1.6',
            }}>
              Create an account and add your vehicle details. We'll keep track of your service history.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            flex: 1,
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }} className="animate-fade-in-up delay-100">
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#0071ff'
              }}>2</span>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1F2937'
            }}>Book a Service</h3>
            <p style={{ 
              color: '#6B7280',
              lineHeight: '1.6',
            }}>
              Choose from our network of verified mechanics and schedule an appointment at your convenience.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            flex: 1,
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }} className="animate-fade-in-up delay-200">
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#0071ff'
              }}>3</span>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1F2937'
            }}>Get Service Done</h3>
            <p style={{ 
              color: '#6B7280',
              lineHeight: '1.6',
            }}>
              Receive quality service from trusted professionals and rate your experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
