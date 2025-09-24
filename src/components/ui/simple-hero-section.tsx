"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import One from  "../../../public/car-parts.jpg";

export default function CompleteHeroWithNavbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile);
      
      return () => {
        window.removeEventListener('resize', checkIsMobile);
      };
    }
  }, []);
  
  return (
    <>

      {/* Hero Section with Glassmorphism */}
      <section style={{ 
        position: 'relative', 
        background: 'linear-gradient(135deg, #2a2d64 0%, #2d0b59 100%)',
        padding: '8rem 0 6rem',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
        marginTop: isMobile ? '0' : '0'
      }}>
        {/* Background image with low opacity for depth */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/car-mechanic-service.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 1
        }}></div>

        {/* Animated glass elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '30rem',
          height: '30rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
          animation: 'pulse 8s infinite ease-in-out',
          zIndex: 2
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '28rem',
          height: '28rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          animation: 'pulse 10s infinite ease-in-out',
          zIndex: 2
        }}></div>
        
        {/* Additional glass elements for more visual interest */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '15rem',
          height: '15rem',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
          animation: 'float 15s infinite ease-in-out',
          zIndex: 2
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '4rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            
            {/* Text Content with Glassmorphism */}
            <div style={{
              textAlign: isMobile ? 'center' : 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              flex: 1,
              color: 'white',
              zIndex: 10,
              position: 'relative'
            }}>
              {/* Glass container for the content */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                padding: '2.5rem',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '2rem',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 4px 12px rgba(31, 38, 135, 0.1)'
                }}>
                  <span style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: '600',
                    background: 'linear-gradient(to right, #ffd700, #ff8c00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>TRUSTED BY THOUSANDS</span>
                </div>
                
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  marginBottom: '1.5rem',
                  lineHeight: '1.2',
                  background: 'linear-gradient(to right, #ffffff, #e0e7ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ display: 'block' }}>Find Premium</span>
                  <span style={{ 
                    display: 'block', 
                    background: 'linear-gradient(to right, #ffd700, #ff8c00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(255, 215, 0, 0.2)'
                  }}>Vehicle Services</span>
                  <span style={{ display: 'block' }}>Near You</span>
                </h1>
                
                <p style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '36rem',
                  marginTop: '1.5rem',
                  lineHeight: '1.6',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.15)'
                }}>
                  ShopMecko connects vehicle owners with trusted repair specialists and quality spare part sellers in one seamless marketplace.
                </p>
              </div>

              {/* Glass CTA Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1.5rem',
                alignItems: 'center',
                margin: '1rem 0'
              }}>
                <Link 
                  href="/register" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.9), rgba(255, 215, 0, 0.9))',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#2d3748',
                    fontWeight: '700',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 10px 20px rgba(255, 140, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateY(-4px)' : 'none',
                    width: isMobile ? '100%' : 'auto',
                    maxWidth: '300px',
                    justifyContent: 'center',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div style={{
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    padding: '0.5rem',
                    marginRight: '0.75rem'
                  }}>
                    <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  Join as Vehicle Owner
                </Link>
                
                <div className="flex space-x-4">
                  <Link 
                    href="/register?role=REPAIRER" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      color: 'white',
                      fontWeight: '600',
                      padding: '1rem',
                      borderRadius: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 10px 20px rgba(31, 38, 135, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      width: isMobile ? '100%' : 'auto',
                      maxWidth: '220px',
                      justifyContent: 'center',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(31, 38, 135, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(31, 38, 135, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <div style={{
                      borderRadius: '0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: '0.5rem',
                      marginRight: '0.75rem'
                    }}>
                      <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    Repair Provider
                  </Link>
                  
                  <Link 
                    href="/register?role=SELLER" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(15px)',
                      WebkitBackdropFilter: 'blur(15px)',
                      color: 'white',
                      fontWeight: '600',
                      padding: '1rem',
                      borderRadius: '1rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 10px 20px rgba(31, 38, 135, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      width: isMobile ? '100%' : 'auto',
                      maxWidth: '220px',
                      justifyContent: 'center',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(31, 38, 135, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(31, 38, 135, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <div style={{
                      borderRadius: '0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      padding: '0.5rem',
                      marginRight: '0.75rem'
                    }}>
                      <svg style={{width: '1.25rem', height: '1.25rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    Parts Seller
                  </Link>
                </div>
              </div>

              {/* Glassmorphic Stats */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: '1.5rem',
                marginTop: '2.5rem'
              }}>
                {[
                  { icon: "🔧", value: "10,000+", label: "Vehicle Owners", color: "#ffd700", gradient: "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)" },
                  { icon: "🏢", value: "500+", label: "Service Providers", color: "#00d084", gradient: "linear-gradient(135deg, rgba(0, 208, 132, 0.2) 0%, rgba(0, 208, 132, 0.05) 100%)" },
                  { icon: "⭐", value: "25,000+", label: "Services Completed", color: "#4fd1c5", gradient: "linear-gradient(135deg, rgba(79, 209, 197, 0.2) 0%, rgba(79, 209, 197, 0.05) 100%)" }
                ].map((stat, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    padding: '1.25rem',
                    borderRadius: '1.25rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px 0 rgba(31, 38, 135, 0.15)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.1)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  >
                    <div style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      background: stat.gradient,
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: `1px solid ${stat.color}40`,
                      boxShadow: `0 4px 15px ${stat.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1.25rem',
                      fontSize: '1.75rem'
                    }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: '800',
                        fontSize: '1.75rem',
                        color: stat.color,
                        textShadow: `0 2px 10px ${stat.color}30`
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glassmorphic Image Container */}
            <div style={{
              position: 'relative',
              flex: 1,
              height: isMobile ? '400px' : '800px',
              borderRadius: '2rem',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.3), 0 0 30px rgba(31, 38, 135, 0.15) inset',
              transform: 'perspective(1500px) rotateY(-5deg) translateZ(0)',
              transition: 'all 0.5s ease',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(1500px) rotateY(0deg) translateZ(50px)';
              e.currentTarget.style.boxShadow = '0 35px 80px -12px rgba(0, 0, 0, 0.35), 0 0 40px rgba(31, 38, 135, 0.2) inset';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1500px) rotateY(-5deg) translateZ(0)';
              e.currentTarget.style.boxShadow = '0 25px 60px -12px rgba(0, 0, 0, 0.3), 0 0 30px rgba(31, 38, 135, 0.15) inset';
            }}
            >
              {/* Glass overlay for the image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                zIndex: 5
              }}></div>
              
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4))',
                zIndex: 2
              }}></div>
              
              {/* Main image with overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#2d3748',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                zIndex: 1
              }}>
                <Image src={One} alt="Vehicle Service" layout="fill" objectFit="cover" />
              </div>
              
              {/* Glass floating elements */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                color: '#2d3748',
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                fontWeight: '700',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                animation: 'float 3s ease-in-out infinite',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  background: 'rgba(255, 215, 0, 0.7)',
                  borderRadius: '50%',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>⭐</div>
                <div>
                  <div style={{fontWeight: '800', color: '#1a202c'}}>4.9 Rating</div>
                  <div style={{fontSize: '0.75rem', opacity: 0.8}}>From 2,500+ reviews</div>
                </div>
              </div>
              
              {/* Middle-right glass notification */}
              <div style={{
                position: 'absolute',
                top: '40%',
                right: '1.5rem',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: '0.75rem',
                borderRadius: '1.25rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                animation: 'float 4s ease-in-out infinite 0.5s',
                maxWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  backgroundColor: 'rgba(79, 209, 197, 0.2)',
                  borderRadius: '50%',
                  width: '2.5rem',
                  height: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(79, 209, 197, 0.3)'
                }}>
                  <svg style={{width: '1.25rem', height: '1.25rem', color: '#4fd1c5'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div style={{fontWeight: '700', color: '#fff', fontSize: '0.875rem'}}>Instant Booking</div>
                  <div style={{fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)'}}>Schedule service in 60 seconds</div>
                </div>
              </div>
              
              {/* Bottom-right glass element */}
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                right: '2rem',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: '1.25rem',
                borderRadius: '1.25rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: 'float 3s ease-in-out infinite 1s'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.75rem',
                  gap: '0.5rem'
                }}>
                  <svg style={{width: '1.25rem', height: '1.25rem', color: '#667eea'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#fff',
                  }}>TRUSTED PARTNERS</span>
                </div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#fff',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>500+ Verified Shops</div>
                <div style={{
                  marginTop: '0.5rem',
                  height: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: '85%',
                    background: 'linear-gradient(to right, #667eea, #764ba2)',
                    borderRadius: '3px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
            50% { opacity: 0.7; transform: scale(1.05) rotate(1deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes shimmer {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
          
          @keyframes borderGlow {
            0%, 100% { box-shadow: 0 0 10px rgba(255,255,255,0.1); }
            50% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
          }
          
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </section>
    </>
  );
}