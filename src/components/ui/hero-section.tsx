"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CtaButton from './cta-button';
import LocationMap from './location-map';
import { getNearbyRepairers } from '@/lib/mock-repairers';
import { Repairer } from '@/types/models';

export default function HeroSection() {
  // State to track which image to show in the carousel
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 34.052235, lng: -118.243683 }); // Default to LA
  const [nearbyRepairers, setNearbyRepairers] = useState<Repairer[]>([]);
  const [selectedRepairer, setSelectedRepairer] = useState<Repairer | null>(null);

  // Images for carousel
  const carouselImages = [
    { src: '/hero-car-service.jpg', alt: 'Professional Auto Service' },
    { src: '/car-maintenance.jpg', alt: 'Car Maintenance' },
    { src: '/car-mechanic-service.jpg', alt: 'Expert Mechanics' },
    { src: '/car-parts.jpg', alt: 'Quality Auto Parts' }
  ];

  // Stats counters with animation
  const stats = [
    { icon: "🔧", value: 10000, label: "Vehicle Owners", color: "#0071ff" },
    { icon: "🏢", value: 500, label: "Service Providers", color: "#ffd700" },
    { icon: "⭐", value: 25000, label: "Services Completed", color: "#00d084" }
  ];
  
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  // Load nearby repairers
  useEffect(() => {
    setNearbyRepairers(getNearbyRepairers());
  }, []);

  // Simulate getting user location
  const getUserLocation = () => {
    // In a real app, we would use the browser's geolocation API:
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setUserLocation({
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   });
    // });
    
    // For this demo, we'll just toggle the map visibility
    setShowMap(true);
  };

  // Handle repairer selection
  const handleSelectRepairer = (repairer: Repairer) => {
    setSelectedRepairer(repairer);
  };

  // Setup animation effects
  useEffect(() => {
    // Set visible when component mounts (for animations)
    setIsVisible(true);
    
    // Auto-rotate carousel every 5 seconds if not hovering
    const intervalId = setInterval(() => {
      if (!isHovering) {
        setActiveImageIndex((prev) => (prev + 1) % carouselImages.length);
      }
    }, 5000);

    // Animate stats counters
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    const statsInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      if (frame <= totalFrames) {
        setAnimatedStats(stats.map(stat => Math.floor(progress * stat.value)));
      } else {
        clearInterval(statsInterval);
        setAnimatedStats(stats.map(stat => stat.value));
      }
    }, frameDuration);

    // Cleanup intervals on unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(statsInterval);
    };
  }, [isHovering, carouselImages.length]);

  return (
    <section className="hero-gradient relative overflow-hidden" style={{ 
      background: 'linear-gradient(135deg, #f0f5ff 0%, #e6f1ff 50%, #d9edff 100%)',
      padding: '5rem 0',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 -mt-16 -mr-16 bg-shopmeco-blue-100 rounded-full opacity-20" 
           style={{filter: 'blur(40px)'}}></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 -mb-32 -ml-16 bg-shopmeco-yellow-100 rounded-full opacity-30" 
           style={{filter: 'blur(50px)'}}></div>

      <div className="container-custom relative z-10" style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '2rem',
      }}>
        {/* Left column - Text content */}
        <div className={`col-span-12 lg:col-span-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} 
             style={{ 
               transition: 'all 0.5s ease-out',
               transitionDelay: '0.1s',
             }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: '800', 
            lineHeight: '1.1',
            marginBottom: '1.5rem'
          }}>
            <div className="overflow-hidden mb-2">
              <span className="inline-block" 
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                      transition: 'transform 0.7s ease-out',
                      color: '#0071ff',
                    }}>
                Connect
              </span>
              <span className="inline-block ml-3" 
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                      transition: 'transform 0.7s ease-out',
                      transitionDelay: '0.2s',
                    }}>
                with the Best
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="inline-block" 
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                      transition: 'transform 0.7s ease-out',
                      transitionDelay: '0.3s',
                    }}>
                in
              </span>
              <span className="inline-block ml-3" 
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                      transition: 'transform 0.7s ease-out',
                      transitionDelay: '0.4s',
                      color: '#ffd700',
                    }}>
                Vehicle Services
              </span>
            </div>
          </h1>
          
          <p className={isVisible ? 'animate-fade-in delay-500' : 'opacity-0'} style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280',
            maxWidth: '42rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
          }}>
            ShopMeco brings together vehicle owners, repair specialists, and spare part sellers in one seamless marketplace. 
            <span className="font-semibold">Get started today and experience the future of vehicle maintenance.</span>
          </p>
          
          {/* Find nearby services button */}
          <div className={`mb-4 ${isVisible ? 'animate-fade-in delay-600' : 'opacity-0'}`}>
            <button 
              className="flex items-center text-white font-medium py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={getUserLocation}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Find Services Near Me
            </button>
          </div>
          
          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-8 ${isVisible ? 'animate-fade-in delay-600' : 'opacity-0'}`}>
            <CtaButton href="/register" variant="primary" className="btn-primary group transition-transform duration-300 hover:scale-105">
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', transition: 'transform 0.3s' }} 
                   className="group-hover:rotate-12"
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Join as Vehicle Owner
            </CtaButton>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <CtaButton href="/register?role=REPAIRER" variant="secondary" className="btn-secondary group transition-transform duration-300 hover:scale-105">
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', transition: 'transform 0.3s' }}
                     className="group-hover:rotate-12"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Join as Repairer
              </CtaButton>
              
              <CtaButton href="/register?role=SELLER" variant="outline" className="group transition-transform duration-300 hover:scale-105">
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', transition: 'transform 0.3s' }}
                     className="group-hover:rotate-12"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Join as Seller
              </CtaButton>
            </div>
          </div>
          
          {/* Stats row */}
          <div className={`flex flex-wrap gap-6 mt-8 ${isVisible ? 'animate-fade-in delay-700' : 'opacity-0'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center">
                <div className="mr-3 flex items-center justify-center w-12 h-12 rounded-full"
                     style={{ backgroundColor: `${stat.color}20` }}>
                  <span className="text-2xl animate-bounce-subtle">{stat.icon}</span>
                </div>
                <div>
                  <div className="font-bold text-xl" style={{ color: stat.color }}>
                    {animatedStats[index].toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Trusted by section */}
          <div className={`flex items-center mt-8 ${isVisible ? 'animate-fade-in delay-800' : 'opacity-0'}`}>
            <div className="flex -space-x-2 mr-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center"
                     style={{ zIndex: 4-i, backgroundColor: `hsl(${210 + i*20}, 70%, ${70 - i*5}%)` }}>
                  <span className="text-xs text-white font-bold">{String.fromCharCode(65 + i)}</span>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Trusted by <span className="font-semibold">10,000+</span> users nationwide
            </div>
          </div>
        </div>
        
        {/* Right column - Image carousel or Map */}
        <div className={`col-span-12 lg:col-span-6 ${isVisible ? 'animate-fade-in delay-300' : 'opacity-0'}`}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}>
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl">
            {/* Conditional rendering based on showMap state */}
            {showMap ? (
              <>
                {/* Location Map Component */}
                <LocationMap 
                  userLocation={userLocation}
                  providers={nearbyRepairers}
                  onSelectProvider={handleSelectRepairer}
                  className="w-full h-full"
                />
                
                {/* Close map button */}
                <button
                  className="absolute top-3 right-3 z-30 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMap(false)}
                  aria-label="Close map"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                
                {/* Selected repairer info */}
                {selectedRepairer && (
                  <div className="absolute top-3 left-3 right-16 z-30 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-fade-in">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-500 text-lg">🔧</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{selectedRepairer.businessName}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          {selectedRepairer.location?.address}, {selectedRepairer.location?.city}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="text-sm font-medium text-gray-900 ml-1">{selectedRepairer.rating}</span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full">
                          {selectedRepairer.completedJobs}+ jobs
                        </span>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex space-x-2 mt-1">
                      <a href={`/repairer/${selectedRepairer.id}`} className="flex-1">
                        <button className="w-full text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition-colors">
                          View Profile
                        </button>
                      </a>
                      <a href={`/vehicle-owner/service-request/new?repairerId=${selectedRepairer.id}`} className="flex-1">
                        <button className="w-full text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded transition-colors">
                          Request Service
                        </button>
                      </a>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Main image carousel */
              carouselImages.map((image, index) => (
                <div key={index} className="absolute inset-0 transition-opacity duration-1000" 
                     style={{ opacity: activeImageIndex === index ? 1 : 0 }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 7s ease-out',
                    transform: activeImageIndex === index ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
              </div>
            ))}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
            
            {/* Floating badge */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <div className="text-xs font-semibold text-shopmeco-blue-500">CERTIFIED</div>
              <div className="text-sm">Professional Service</div>
            </div>
            
            {/* Image indicator dots */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {carouselImages.map((_, index) => (
                <button 
                  key={index}
                  className="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none"
                  style={{ 
                    backgroundColor: activeImageIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                    transform: activeImageIndex === index ? 'scale(1.5)' : 'scale(1)'
                  }}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
            )}
          </div>
          
          {/* Feature tags */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {['24/7 Support', 'Verified Mechanics', 'Quality Parts', 'Warranty', 'Location Tracking'].map((tag, i) => (
              <div key={i} className={`px-3 py-1 rounded-full text-sm font-medium bg-white border shadow-sm ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                   style={{ 
                     animationDelay: `${0.9 + i * 0.1}s`,
                     borderColor: '#0071ff20'
                   }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
