'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-indigo-900/90 text-white relative overflow-x-hidden">
      {/* Add Header */}
      <Header />
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div style={{ height: '4rem' }}></div>
      
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>
      {/* Navigation */}
    

      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-700/40 via-blue-600/30 to-blue-500/40 py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Blue elements */}
            <div className="absolute top-[15%] right-[25%] w-80 h-80 rounded-full bg-gradient-to-b from-shopmeco-blue/20 to-blue-600/5 animate-pulse-slow blur-xl"></div>
            <div className="absolute bottom-1/4 left-[20%] w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500/15 to-blue-700/5 animate-float blur-lg"></div>
            
            {/* Yellow accent elements */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-shopmeco-yellow/15 to-yellow-400/5 animate-float blur-lg" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-gradient-to-b from-shopmeco-yellow/20 to-yellow-500/5 animate-pulse-slow blur-md" style={{ animationDelay: '2.5s' }}></div>
            
            {/* Abstract lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"></div>
            
            {/* Additional particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`hero-particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white/40"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  boxShadow: '0 0 10px 2px rgba(255,255,255,0.3)',
                  animation: `pulse ${3 + Math.random() * 4}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 relative">
              {/* Subtle glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
              
              <div className="inline-block relative">
                <span className="absolute -top-8 right-0 text-xs font-light text-blue-300/70 tracking-wider">EST. 2023</span>
                <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-white text-transparent bg-clip-text animate-gradient">About ShopMeco</h1>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-shopmeco-yellow/60 to-transparent"></div>
              </div>
              
              <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-shopmeco-yellow/40 to-transparent mx-auto mt-6 mb-6"></div>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
                Connecting vehicle owners, repair services, and parts sellers 
                <span className="relative inline-block mx-2">
                  <span className="relative z-10">in one seamless marketplace</span>
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-shopmeco-blue/40 to-transparent"></span>
                </span>
              </p>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-70">
                <span className="block h-1 w-1 rounded-full bg-shopmeco-yellow animate-pulse"></span>
                <span className="block h-1 w-1 rounded-full bg-shopmeco-blue animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                <span className="block h-1 w-1 rounded-full bg-shopmeco-yellow animate-pulse" style={{ animationDelay: '0.6s' }}></span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 to-transparent"></div>
          
          {/* Abstract decorative elements */}
          <div className="absolute left-0 top-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          <div className="absolute right-0 top-2/3 w-1/3 h-px bg-gradient-to-l from-transparent via-blue-500/20 to-transparent"></div>
          <div className="absolute left-1/4 top-0 h-1/3 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
          <div className="absolute right-1/4 bottom-0 h-1/3 w-px bg-gradient-to-t from-transparent via-blue-500/20 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-radial from-blue-500/10 to-transparent blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-radial from-yellow-500/10 to-transparent blur-xl"></div>
                
                <Card glassmorphic className="p-8 border-shopmeco-blue/30 shadow-xl shadow-blue-500/20 relative overflow-hidden backdrop-blur-lg">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 animate-shimmer opacity-30 pointer-events-none"></div>
                  
                  {/* Yellow accent line at top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-shopmeco-yellow/80 via-shopmeco-yellow/40 to-transparent"></div>
                  
                  <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs uppercase tracking-wider mb-4">Our Journey</span>
                  
                  <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-white text-transparent bg-clip-text animate-gradient">Our Story</h2>
                  
                  <div className="space-y-6">
                    <p className="text-lg text-white/90 leading-relaxed relative">
                      <span className="absolute -left-4 top-0 text-3xl text-shopmeco-blue/40">&ldquo;</span>
                      ShopMeco was founded in 2023 with a simple mission: to transform the fragmented vehicle maintenance industry by creating a unified platform that connects all stakeholders.
                    </p>
                    
                    <p className="text-lg text-white/90 leading-relaxed">
                      Our founders, experienced automotive engineers and tech entrepreneurs, recognized the challenges that vehicle owners face when finding reliable repair services and quality spare parts. At the same time, skilled mechanics and parts sellers struggled to reach their target customers efficiently.
                    </p>
                    
                    <p className="text-lg text-white/90 leading-relaxed relative">
                      We built ShopMeco to bridge this gap, creating a transparent ecosystem where trust, quality, and convenience are paramount. Today, we&rsquo;re proud to serve thousands of users across the country, making vehicle maintenance simpler and more accessible for everyone.
                      <span className="absolute -right-4 bottom-0 text-3xl text-shopmeco-blue/40">&rdquo;</span>
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-white">JD</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">John Davis</p>
                        <p className="text-blue-300 text-sm">CEO & Co-Founder</p>
                      </div>
                    </div>
                    <div className="text-white/60 text-sm">Since 2023</div>
                  </div>
                </Card>
              </div>
              
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 z-0">
                  {/* Animated background elements */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${150 + i * 30}px`,
                        height: `${150 + i * 30}px`,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: `1px solid rgba(${i % 2 === 0 ? '59, 130, 246' : '245, 158, 11'}, ${0.1 - i * 0.01})`,
                        animation: `pulse ${4 + i}s infinite ease-in-out`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>
                
                <Card glassmorphic className="absolute inset-4 border-shopmeco-blue/20 shadow-2xl backdrop-blur-md flex items-center justify-center">
                  <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none"></div>
                  <div className="text-center p-8">
                    <div className="relative inline-block mb-6">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-6xl font-bold text-transparent bg-gradient-to-r from-white via-blue-300 to-blue-100 bg-clip-text animate-gradient">Shop</span>
                        <span className="text-6xl font-bold text-yellow-400 drop-shadow-glow-yellow">Meco</span>
                      </div>
                      
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent my-2"></div>
                      
                      <p className="text-2xl text-white font-light tracking-wide">Est. 2023</p>
                    </div>
                    
                    <div className="mt-12 space-y-6">
                      <div className="flex items-center bg-white/5 backdrop-blur-md rounded-lg p-3 transform transition-transform hover:scale-105 hover:bg-white/10">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-shopmeco-yellow to-yellow-600/70 flex items-center justify-center shadow-lg shadow-yellow-500/20 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        <span className="text-white/90 text-lg">Innovation</span>
                      </div>
                      
                      <div className="flex items-center bg-white/5 backdrop-blur-md rounded-lg p-3 transform transition-transform hover:scale-105 hover:bg-white/10">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-shopmeco-blue to-blue-600/70 flex items-center justify-center shadow-lg shadow-blue-500/20 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        </div>
                        <span className="text-white/90 text-lg">Reliability</span>
                      </div>
                      
                      <div className="flex items-center bg-white/5 backdrop-blur-md rounded-lg p-3 transform transition-transform hover:scale-105 hover:bg-white/10">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-shopmeco-yellow to-yellow-600/70 flex items-center justify-center shadow-lg shadow-yellow-500/20 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                            <line x1="6" y1="1" x2="6" y2="4"></line>
                            <line x1="10" y1="1" x2="10" y2="4"></line>
                            <line x1="14" y1="1" x2="14" y2="4"></line>
                          </svg>
                        </div>
                        <span className="text-white/90 text-lg">Transparency</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-blue-700/40 via-indigo-600/30 to-blue-600/40 relative overflow-hidden">
          {/* 3D-like background grid */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0" style={{ 
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "40px 40px",
              transform: "perspective(500px) rotateX(60deg)",
              opacity: 0.3
            }}></div>
          </div>
          
          {/* Animated orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[40%] left-[15%] w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/15 to-blue-700/5 animate-float blur-2xl"></div>
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-tr from-blue-600/10 to-blue-800/5 animate-pulse-slow blur-3xl"></div>
            
            <div className="absolute top-[30%] right-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500/15 to-yellow-700/5 animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[30%] left-[25%] w-40 h-40 rounded-full bg-gradient-to-tr from-yellow-600/10 to-yellow-700/5 animate-pulse-slow blur-2xl" style={{ animationDelay: '3s' }}></div>
          </div>
          
          {/* Light streaks */}
          <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-0 right-1/3 h-full w-px bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent"></div>
          <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 relative">
              {/* Subtle glow behind the title */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-20 bg-blue-500/20 blur-3xl rounded-full"></div>
              
              <div className="inline-block relative">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-blue-100 tracking-widest">WHAT DRIVES US</span>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white text-transparent bg-clip-text animate-gradient">Our Mission & Values</h2>
              </div>
              
              <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-shopmeco-yellow/50 to-transparent mx-auto mt-4 mb-6"></div>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto font-light">
                Guided by principles that 
                <span className="relative mx-2 inline-block">
                  <span className="relative z-10">put our users first</span>
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-shopmeco-blue/40 to-transparent"></span>
                </span>
              </p>
              
              {/* Decorative dots */}
              <div className="flex justify-center gap-2 mt-8 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-shopmeco-blue animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-shopmeco-yellow animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-shopmeco-blue animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  title: "Trust & Quality",
                  description: "We verify all service providers and parts sellers on our platform, ensuring that you only work with trusted professionals and receive quality products.",
                  icon: (
                    <svg className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  color: "blue",
                  delay: 0
                },
                {
                  title: "Innovation & Efficiency",
                  description: "We continually innovate our platform to make vehicle maintenance more efficient, saving our users time and money while providing better service experiences.",
                  icon: (
                    <svg className="h-8 w-8 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  color: "yellow",
                  delay: 0.2
                },
                {
                  title: "Community & Support",
                  description: "We foster a community of vehicle owners, mechanics, and parts sellers, providing support at every step and enabling knowledge sharing among our users.",
                  icon: (
                    <svg className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  color: "blue",
                  delay: 0.4
                }
              ].map((value, i) => (
                <div 
                  key={i} 
                  className="relative group transition-all duration-500"
                  style={{
                    opacity: 0,
                    animation: 'fadeIn 0.8s forwards',
                    animationDelay: `${value.delay}s`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                  
                  <Card 
                    glassmorphic 
                    className={`border-${value.color === 'blue' ? 'shopmeco-blue' : 'shopmeco-yellow'}/30 backdrop-blur-md shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-${value.color === 'blue' ? 'blue' : 'yellow'}-500/5 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    
                    <CardHeader className="relative pb-2">
                      <div className={`h-20 w-20 rounded-full bg-gradient-to-br from-${value.color === 'blue' ? 'blue' : 'yellow'}-500/30 to-${value.color === 'blue' ? 'blue' : 'yellow'}-700/10 backdrop-blur-sm flex items-center justify-center mb-5 border border-${value.color === 'blue' ? 'blue' : 'yellow'}-500/30 shadow-lg shadow-${value.color === 'blue' ? 'blue' : 'yellow'}-500/20 group-hover:shadow-${value.color === 'blue' ? 'blue' : 'yellow'}-500/30 transition-all duration-300`}>
                        {value.icon}
                      </div>
                      <CardTitle className="text-white text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">{value.title}</CardTitle>
                      <div className={`h-0.5 w-12 bg-${value.color === 'blue' ? 'shopmeco-blue' : 'shopmeco-yellow'}/50 mt-2 mb-1 transition-all duration-300 group-hover:w-16`}></div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-white/80 leading-relaxed">{value.description}</p>
                      
                      <div className="mt-6 flex items-center">
                        <div className={`h-8 w-8 rounded-full bg-${value.color === 'blue' ? 'blue' : 'yellow'}-500/20 backdrop-blur-sm flex items-center justify-center mr-3 group-hover:bg-${value.color === 'blue' ? 'blue' : 'yellow'}-500/30 transition-colors duration-300`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-${value.color === 'blue' ? 'blue' : 'yellow'}-300`}>
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">Learn more</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Additional decorative elements */}
          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>

        <section className="py-24 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/10 pointer-events-none"></div>
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: 'linear-gradient(to right, rgba(55, 65, 81, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(55, 65, 81, 0.1) 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }}>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-blue-100 tracking-widest">THE PEOPLE BEHIND SHOPMECO</span>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white text-transparent bg-clip-text animate-gradient">Meet Our Team</h2>
              </div>
              
              <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-shopmeco-yellow/50 to-transparent mx-auto mt-4 mb-6"></div>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto font-light">
                Dedicated professionals working to revolutionize vehicle maintenance and repair
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[
                {
                  name: "Alex Morgan",
                  title: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
                  bio: "With 15+ years of experience in the automotive industry and tech entrepreneurship, Alex founded ShopMeco to bridge the gap between vehicle owners and service providers.",
                  delay: 0
                },
                {
                  name: "Jamie Chen",
                  title: "CTO",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
                  bio: "Jamie leads our technical team, bringing expertise in building scalable platforms and a passion for creating innovative solutions that make vehicle maintenance more accessible.",
                  delay: 0.2
                },
                {
                  name: "Devin Rodriguez",
                  title: "COO",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
                  bio: "Devin oversees day-to-day operations, ensuring our platform delivers exceptional service. With a background in automotive retail, he understands the needs of both customers and service providers.",
                  delay: 0.4
                },
                {
                  name: "Sarah Washington",
                  title: "Head of Partnerships",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
                  bio: "Sarah builds and maintains our network of service providers and parts suppliers, ensuring only the highest quality partners are featured on our platform.",
                  delay: 0.6
                },
                {
                  name: "Michael Torres",
                  title: "Lead Engineer",
                  image: "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
                  bio: "Michael leads our development team, bringing extensive experience in full-stack development and a deep understanding of the technical challenges in the automotive service industry.",
                  delay: 0.8
                },
                {
                  name: "Priya Patel",
                  title: "Customer Experience Director",
                  image: "https://images.unsplash.com/photo-1573497019236-61e7a0258f15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
                  bio: "Priya ensures every interaction with ShopMeco exceeds expectations, drawing on her background in UX design and customer service to create seamless experiences for our users.",
                  delay: 1.0
                }
              ].map((person, i) => (
                <div 
                  key={i} 
                  className="relative group"
                  style={{
                    opacity: 0,
                    animation: 'fadeIn 0.8s forwards',
                    animationDelay: `${person.delay}s`
                  }}
                >
                  <div className="relative p-1 rounded-xl bg-gradient-to-br from-blue-500/50 via-transparent to-blue-300/30 shadow-xl">
                    <div className="relative overflow-hidden rounded-lg bg-gray-900/80 backdrop-blur-sm p-6 h-full border border-white/10 group-hover:border-white/20 transition-all duration-500">
                      {/* Glow effect on hover */}
                      <div className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      
                      <div className="flex flex-col items-center">
                        {/* Image container with overlay effect */}
                        <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-white/40 transition-all duration-300 shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Image 
                            src={person.image} 
                            alt={person.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 128px"
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                        <div className="px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-300 text-xs mb-4">
                          {person.title}
                        </div>
                        <p className="text-white/70 text-center text-sm leading-relaxed">
                          {person.bio}
                        </p>
                        
                        {/* Social links */}
                        <div className="flex justify-center gap-3 mt-5">
                          {['linkedin', 'twitter', 'email'].map((social, i) => (
                            <div 
                              key={i} 
                              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                            >
                              <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {social === 'linkedin' ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.5v2.25A3.75 3.75 0 0117.25 20h-9.5A3.75 3.75 0 014 16.25v-9.5A3.75 3.75 0 017.75 3h9.5A3.75 3.75 0 0121 6.75v2.25m0 0v-2.25A3.75 3.75 0 0017.25 3h-9.5A3.75 3.75 0 004 6.75v9.5A3.75 3.75 0 007.75 20h9.5A3.75 3.75 0 0021 16.25v-2.25m0 0v2.25m0-2.25H4" />
                                ) : social === 'twitter' ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                )}
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-full text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 transition-all duration-300 group">
                <span className="flex items-center justify-center">
                  <span>Join Our Team</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-blue-700/40 via-indigo-700/30 to-blue-700/40 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: "radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 25%), radial-gradient(circle at 85% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 33%)"
          }}></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] right-[15%] w-96 h-96 rounded-full bg-gradient-to-tr from-blue-600/15 to-indigo-800/5 animate-float blur-3xl"></div>
            <div className="absolute bottom-[10%] left-[25%] w-80 h-80 rounded-full bg-gradient-to-bl from-blue-500/15 to-indigo-700/5 animate-pulse-slow blur-3xl"></div>
            <div className="absolute top-[40%] left-[20%] w-32 h-32 rounded-full bg-gradient-to-r from-shopmeco-yellow/15 to-yellow-500/5 animate-float blur-xl" style={{ animationDelay: '2.5s' }}></div>
            
            {/* Digital lines/circuit effect */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px), 
                               linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: 'center center'
            }}></div>
            
            {/* Data flow lines */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                style={{
                  width: `${30 + Math.random() * 40}%`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 60}%`,
                  transform: `rotate(${Math.random() * 180}deg)`,
                  animation: `pulse ${5 + Math.random() * 5}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="relative inline-block">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-blue-100 tracking-widest">MEASURING SUCCESS</span>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white text-transparent bg-clip-text animate-gradient">Our Impact</h2>
              </div>
              
              <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-shopmeco-yellow/50 to-transparent mx-auto mt-4 mb-6"></div>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto font-light">
                Transforming the automotive maintenance industry with innovative solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                {
                  value: "5,000+",
                  label: "Vehicle Owners",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  ),
                  color: "blue",
                  delay: 0
                },
                {
                  value: "1,200+",
                  label: "Repair Services",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  ),
                  color: "yellow",
                  delay: 0.2
                },
                {
                  value: "800+",
                  label: "Parts Sellers",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  ),
                  color: "blue",
                  delay: 0.4
                }
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="relative group"
                  style={{
                    opacity: 0,
                    animation: 'fadeIn 0.8s forwards',
                    animationDelay: `${stat.delay}s`
                  }}
                >
                  <Card 
                    glassmorphic 
                    className={`p-8 border-${stat.color === 'blue' ? 'shopmeco-blue' : 'shopmeco-yellow'}/30 backdrop-blur-lg shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500`}
                  >
                    <div className={`absolute -inset-[1px] bg-gradient-to-tr from-transparent via-${stat.color === 'blue' ? 'blue' : 'yellow'}-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg`}></div>
                    
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-${stat.color === 'blue' ? 'blue' : 'yellow'}-500/10 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    
                    <div className="absolute inset-0 animate-shimmer opacity-30 pointer-events-none"></div>
                    
                    <div className="mx-auto flex flex-col items-center relative">
                      <div className={`mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-${stat.color === 'blue' ? 'blue' : 'yellow'}-500/30 to-${stat.color === 'blue' ? 'blue' : 'yellow'}-700/10 backdrop-blur-sm flex items-center justify-center border border-${stat.color === 'blue' ? 'blue' : 'yellow'}-500/30 shadow-lg`}>
                        {stat.icon}
                      </div>
                      
                      <div className="text-5xl font-bold mb-4">
                        <div className="relative">
                          <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent animate-gradient">{stat.value.split('+')[0]}</span>
                          <span className={`text-${stat.color === 'blue' ? 'blue' : 'yellow'}-300 ml-0.5`}>+</span>
                          
                          {/* Small particles animation on hover */}
                          <div className="absolute -top-4 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            {[...Array(3)].map((_, j) => (
                              <div
                                key={j}
                                className={`absolute h-1 w-1 rounded-full bg-${stat.color === 'blue' ? 'blue' : 'yellow'}-400`}
                                style={{
                                  top: `${j * 6}px`,
                                  right: `${j * 4}px`,
                                  animation: `float ${2 + j * 0.5}s infinite ease-in-out`,
                                  animationDelay: `${j * 0.2}s`
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`h-0.5 w-16 bg-${stat.color === 'blue' ? 'shopmeco-blue' : 'shopmeco-yellow'}/40 mx-auto my-3 group-hover:w-24 transition-all duration-500`}></div>
                      <p className="text-xl text-white/90 font-light">{stat.label}</p>
                      
                      {/* Animated circle on hover */}
                      <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700" style={{
                        transform: 'scale(0)',
                        animation: 'ripple 2s infinite ease-out',
                        animationPlayState: 'paused'
                      }}></div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Card 
                glassmorphic 
                className="p-10 border-white/20 backdrop-blur-lg shadow-2xl max-w-4xl mx-auto relative overflow-hidden"
              >
                <div className="absolute -inset-px bg-gradient-to-tr from-blue-500/30 via-transparent to-yellow-500/20 opacity-30"></div>
                <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none"></div>
                
                <div className="text-center mb-10">
                  <div className="relative inline-block">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-white text-transparent bg-clip-text animate-gradient">Our Growth Story</h3>
                    <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-shopmeco-yellow/60 to-transparent mx-auto mt-3"></div>
                  </div>
                </div>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[31px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500/50 via-indigo-500/30 to-blue-500/50"></div>
                  
                  <div className="space-y-16">
                    {[
                      {
                        year: "2023",
                        title: "Platform Launch",
                        description: "ShopMeco launched with the basic functionality to connect vehicle owners with repair services in three major cities.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        ),
                        color: "blue",
                        delay: 0.1
                      },
                      {
                        year: "2023",
                        title: "Parts Marketplace",
                        description: "We expanded our platform to include spare parts sellers, creating a comprehensive solution for vehicle maintenance needs.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                          </svg>
                        ),
                        color: "yellow",
                        delay: 0.3
                      },
                      {
                        year: "2024",
                        title: "Nationwide Expansion",
                        description: "ShopMeco expanded to serve customers nationwide, with over 1,000 verified service providers and 500 parts sellers.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ),
                        color: "blue",
                        delay: 0.5
                      },
                      {
                        year: "2024",
                        title: "Mobile App Launch",
                        description: "Introducing our mobile app for iOS and Android, enabling users to manage their vehicle maintenance on the go.",
                        icon: (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                          </svg>
                        ),
                        color: "yellow",
                        delay: 0.7
                      }
                    ].map((milestone, i) => (
                      <div 
                        key={i}
                        className="flex relative"
                        style={{
                          opacity: 0,
                          animation: 'fadeIn 0.8s forwards',
                          animationDelay: `${milestone.delay}s`
                        }}
                      >
                        {/* Timeline dot */}
                        <div 
                          className={`mr-8 h-16 w-16 flex-shrink-0 rounded-full bg-gradient-to-br from-${milestone.color === 'blue' ? 'blue' : 'yellow'}-500/30 to-${milestone.color === 'blue' ? 'blue' : 'yellow'}-700/10 backdrop-blur-sm flex items-center justify-center border border-${milestone.color === 'blue' ? 'blue' : 'yellow'}-500/40 shadow-lg shadow-${milestone.color === 'blue' ? 'blue' : 'yellow'}-500/10 z-10 group-hover:shadow-${milestone.color === 'blue' ? 'blue' : 'yellow'}-500/30`}
                        >
                          {milestone.icon}
                        </div>
                        
                        <div className="flex-1 relative">
                          <div className="absolute left-0 top-0 -ml-3 mt-3 h-0.5 w-2.5 bg-gradient-to-r from-white/40 to-transparent"></div>
                          
                          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs tracking-wider mb-2">
                            {milestone.year}
                          </span>
                          
                          <h4 className="text-2xl font-bold mb-3 text-white">{milestone.title}</h4>
                          
                          <p className="text-white/80 leading-relaxed">
                            {milestone.description}
                          </p>
                          
                          <div className="mt-4 flex items-center">
                            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                            </div>
                            <span className="text-white/60 text-sm">Learn more</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-16">
                  <div className="inline-block relative">
                    <span className="text-2xl font-light text-white/80">
                      And we&rsquo;re just getting started...
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-shopmeco-blue/40 to-transparent"></div>
                  </div>
                </div>
              </Card>
            </div>
            
            <style jsx global>{`
              @keyframes ripple {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(1); opacity: 0; }
              }
              .group:hover .group-hover\\:animate-ripple {
                animation-play-state: running;
              }
            `}</style>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-shopmeco-blue via-blue-600 to-indigo-600 text-white relative overflow-hidden">
          {/* 3D Perspective Grid */}
          <div className="absolute inset-0 perspective-1000 pointer-events-none opacity-20">
            <div className="absolute inset-0 transform-gpu rotate-x-60 bg-gradient-to-b from-transparent to-white/5" 
                 style={{ 
                   backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                   backgroundSize: '40px 40px'
                 }}>
            </div>
          </div>
          
          {/* Animated light effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[30%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-tr from-blue-300/10 to-white/5 animate-float blur-3xl"></div>
            <div className="absolute bottom-[20%] left-[15%] w-[30rem] h-[30rem] rounded-full bg-gradient-to-bl from-blue-400/10 to-white/5 animate-pulse-slow blur-3xl"></div>
            <div className="absolute top-[20%] left-[30%] w-32 h-32 rounded-full bg-gradient-to-r from-shopmeco-yellow/20 to-yellow-500/5 animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[30%] right-[20%] w-40 h-40 rounded-full bg-gradient-to-l from-shopmeco-yellow/15 to-yellow-500/5 animate-pulse-slow blur-2xl" style={{ animationDelay: '3s' }}></div>
          </div>
          
          {/* Accent lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {/* Radial glow */}
          <div className="absolute inset-0 bg-radial-at-center from-blue-400/20 via-transparent to-transparent"></div>
          
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={`cta-particle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.25,
                  boxShadow: '0 0 8px 2px rgba(255,255,255,0.3)',
                  animation: `pulse ${3 + Math.random() * 4}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <Card 
              glassmorphic 
              className="max-w-5xl mx-auto border-white/20 py-16 px-8 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-lg relative"
            >
              {/* Inner glowing border */}
              <div className="absolute -inset-px bg-gradient-to-tr from-blue-500/40 via-transparent to-shopmeco-yellow/30 rounded-lg opacity-50"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 animate-shimmer opacity-30 pointer-events-none"></div>
              
              {/* Background accent shapes */}
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-shopmeco-yellow/10 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="mb-2 inline-block">
                  <span className="px-4 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs text-blue-100 tracking-widest">JOIN US TODAY</span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white text-transparent bg-clip-text animate-gradient leading-tight">
                  Join the ShopMeco Community
                </h2>
                
                <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-shopmeco-yellow/60 to-transparent mx-auto mt-4 mb-8"></div>
                
                <p className="text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                  Be part of the revolution in 
                  <span className="relative mx-2 inline-block">
                    <span className="relative z-10">vehicle maintenance</span>
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-shopmeco-yellow/40 to-transparent"></span>
                  </span>
                  and service.
                </p>
                
                {/* Benefit cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                  {[
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      ),
                      title: "Vetted Services",
                      description: "Access trusted providers"
                    },
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      title: "Save Money",
                      description: "Compare prices easily"
                    },
                    {
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ),
                      title: "Quick Service",
                      description: "Streamlined booking"
                    }
                  ].map((benefit, i) => (
                    <div 
                      key={i} 
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center shadow-lg hover:bg-white/15 transition-colors duration-300"
                    >
                      <div className="h-12 w-12 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center mr-4 border border-blue-500/30 shadow-lg">
                        <div className="text-blue-300">
                          {benefit.icon}
                        </div>
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-white">{benefit.title}</h4>
                        <p className="text-white/70 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-gradient-to-r from-shopmeco-yellow to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-medium px-8 py-6 rounded-full relative overflow-hidden group shadow-lg shadow-yellow-900/30 hover:shadow-yellow-900/40 transition-all duration-300"
                  >
                    <Link href="/register" className="relative z-10 flex items-center">
                      <span className="text-lg">Sign Up Now</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                      <span className="absolute inset-0 w-0 bg-white/20 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </Button>
                  
                  <div className="text-white/60">or</div>
                  
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 px-8 py-6 rounded-full relative overflow-hidden group"
                  >
                    <Link href="/contact" className="relative z-10 flex items-center text-lg">
                      <span>Contact Us</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span className="absolute inset-0 w-0 bg-white/10 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </Button>
                </div>
                
                {/* Trust indicators */}
                <div className="mt-10">
                  <div className="h-px w-40 bg-white/10 mx-auto mb-6"></div>
                  
                  <div className="flex justify-center items-center gap-x-6 gap-y-3 flex-wrap">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-shopmeco-yellow mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-white/80 text-sm">Secure Payments</span>
                    </div>
                    <div className="w-px h-4 bg-white/20 hidden sm:block"></div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-shopmeco-yellow mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-white/80 text-sm">24/7 Support</span>
                    </div>
                    <div className="w-px h-4 bg-white/20 hidden sm:block"></div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-shopmeco-yellow mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white/80 text-sm">Satisfaction Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
