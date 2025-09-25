"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CtaButton from './cta-button';
import LocationMap from './location-map';
import { getNearbyRepairers } from '@/lib/mock-repairers';
import { Repairer } from '@/types/models';

export default function EnhancedHeroSection() {
  // Force isVisible to true initially to ensure styles are applied immediately
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [animatedStats, setAnimatedStats] = useState([10000, 500, 25000]);
  const [countdown, setCountdown] = useState({ days: 30, hours: 12, minutes: 45, seconds: 0 });
  
  // Location map related state
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: 34.052235, lng: -118.243683 }); // Default to LA
  const [nearbyRepairers, setNearbyRepairers] = useState<Repairer[]>([]);
  const [selectedRepairer, setSelectedRepairer] = useState<Repairer | null>(null);

  // Images for carousel with parallax effect
  const carouselImages = [
    { 
      src: '/hero-car-service.jpg', 
      alt: 'Professional Mechanics at Work',
      overlayColor: 'rgba(0, 113, 255, 0.2)'
    },
    { 
      src: '/car-maintenance.jpg', 
      alt: 'Complete Car Maintenance', 
      overlayColor: 'rgba(255, 215, 0, 0.2)'
    },
    { 
      src: '/car-mechanic-service.jpg', 
      alt: 'Expert Auto Service',
      overlayColor: 'rgba(0, 208, 132, 0.2)'
    },
    { 
      src: '/car-parts.jpg', 
      alt: 'Quality Auto Parts',
      overlayColor: 'rgba(236, 72, 153, 0.2)'
    }
  ];

  // Stats for animated counters
  const stats = [
    { 
      icon: "🛠️", 
      value: 10000, 
      label: "Vehicle Owners", 
      color: "#0071ff",
      suffix: "+"
    },
    { 
      icon: "🏢", 
      value: 500, 
      label: "Service Providers", 
      color: "#ffd700",
      suffix: "+" 
    },
    { 
      icon: "⭐", 
      value: 25000, 
      label: "Completed Services", 
      color: "#00d084",
      suffix: "+" 
    }
  ];

  // Feature highlights with icons
  const features = [
    { icon: "⚡", label: "Fast Service" },
    { icon: "🔒", label: "Secure Payments" },
    { icon: "📱", label: "Mobile App" },
    { icon: "🛡️", label: "Warranty" },
    { icon: "💰", label: "Best Prices" },
    { icon: "🔍", label: "Transparent" },
    { icon: "📍", label: "Location Tracking" }
  ];

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

  useEffect(() => {
    // Set visible to true immediately to ensure styles apply right away
    setIsVisible(true);
    
    // Auto-rotate carousel
    const carouselInterval = setInterval(() => {
      if (!isHovering) {
        setActiveImageIndex((prev) => (prev + 1) % carouselImages.length);
      }
    }, 5000);

    // Set stats values directly - no animation needed
    setAnimatedStats(stats.map(stat => stat.value));

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    // Cleanup intervals on unmount
    return () => {
      clearInterval(carouselInterval);
      clearInterval(countdownInterval);
    };
  }, [isHovering, carouselImages.length]);

  // Dynamic gradient based on active image
  const getBackgroundGradient = () => {
    const colors = [
      'linear-gradient(135deg, #e6f2ff 0%, #cce3ff 50%, #b3d4ff 100%)',
      'linear-gradient(135deg, #fff9e6 0%, #fff0b3 50%, #ffe680 100%)',
      'linear-gradient(135deg, #e6fff2 0%, #b3ffdd 50%, #80ffc9 100%)',
      'linear-gradient(135deg, #ffe6f6 0%, #ffb3e6 50%, #ff80d5 100%)'
    ];
    return colors[activeImageIndex];
  };

  return (
    <section 
      className="relative overflow-hidden transition-all duration-1000" 
      style={{ 
        background: getBackgroundGradient(),
        minHeight: '95vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-30 animate-pulse-glow"
             style={{ 
               background: 'radial-gradient(circle, rgba(0,113,255,0.3) 0%, rgba(0,113,255,0) 70%)',
               filter: 'blur(40px)',
               transform: 'scale(1.5)'
             }}></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full opacity-30 animate-pulse-glow"
             style={{ 
               background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)',
               filter: 'blur(50px)',
               animation: 'pulseGlow 8s infinite ease-in-out',
               animationDelay: '2s',
               transform: 'scale(1.8)'
             }}></div>
             
        {/* Diagonal line decoration */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: 'linear-gradient(45deg, transparent 45%, #0071ff 45%, #0071ff 55%, transparent 55%)',
               backgroundSize: '30px 30px'
             }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="lg:col-span-6 space-y-8">
            {/* Special offer banner */}
            <div className={`bg-gradient-to-r from-shopmeco-blue-500 to-shopmeco-blue-700 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between mb-6 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
                 style={{ transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <div className="flex items-center">
                <span className="text-xl mr-3">🔥</span>
                <span className="font-medium">Special Offer: 20% off first service</span>
              </div>
              <div className="flex items-center space-x-2 text-sm font-mono">
                {Object.entries(countdown).map(([unit, value], i) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="bg-white bg-opacity-20 rounded px-2 py-1 font-bold">
                      {String(value).padStart(2, '0')}
                    </div>
                    <div className="text-xs mt-1">{unit}</div>
                  </div>
                ))}
              </div>
            </div>

            <h1 className="relative">
              <div className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div className="overflow-hidden mb-2">
                  <span className="inline-block text-shopmeco-blue-500"
                        style={{
                          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}>
                    Connect
                  </span>
                </div>
                <div className="overflow-hidden mb-2">
                  <span className="inline-block"
                        style={{
                          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: '0.1s',
                        }}>
                    with the 
                  </span>
                  <span className="inline-block ml-2 bg-clip-text text-transparent bg-gradient-to-r from-shopmeco-blue-500 via-purple-500 to-shopmeco-yellow-500"
                        style={{
                          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: '0.2s',
                        }}>
                    Best
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className="inline-block text-shopmeco-yellow-600"
                        style={{
                          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: '0.3s',
                        }}>
                    Vehicle Services
                  </span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-shopmeco-yellow-100 -z-10 animate-pulse-glow"></div>
              <div className="absolute -bottom-6 right-12 w-24 h-8 bg-shopmeco-blue-100 -z-10" style={{ borderRadius: '50%' }}></div>
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-600 max-w-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '0.4s', lineHeight: '1.6' }}>
              ShopMeco brings together vehicle owners, repair specialists, and spare part sellers in one seamless marketplace. 
              <span className="font-semibold text-black"> Experience the future of vehicle maintenance.</span>
            </p>
            
            {/* Find nearby services button */}
            <div className={`mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                 style={{ transitionDelay: '0.4s' }}>
              <button 
                className="flex items-center text-white font-medium py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={getUserLocation}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Find Services Near Me
              </button>
            </div>
            
            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                 style={{ transitionDelay: '0.5s' }}>
              <CtaButton href="/register" variant="primary" className="group relative overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 transform group-hover:-rotate-12 transition-transform duration-300" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Join as Vehicle Owner
                </span>
              </CtaButton>
              
              {/* Provider registration options */}
              <div className="flex flex-col sm:flex-row gap-2">
                <CtaButton href="/register?role=REPAIRER" variant="secondary" className="group relative overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-300 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 transform group-hover:-rotate-12 transition-transform duration-300" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Join as Repairer
                  </span>
                </CtaButton>
                
                <CtaButton href="/register?role=SELLER" variant="secondary" className="group relative overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-300 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 transform group-hover:-rotate-12 transition-transform duration-300" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Join as Seller
                  </span>
                </CtaButton>
              </div>
            </div>
            
            {/* Stats row */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                 style={{ transitionDelay: '0.6s' }}>
              {stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full mr-4"
                         style={{ backgroundColor: `${stat.color}20` }}>
                      <span className="text-2xl animate-bounce-subtle">{stat.icon}</span>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold flex items-baseline" style={{ color: stat.color }}>
                        <span className="tabular-nums">{animatedStats[index].toLocaleString()}</span>
                        <span className="text-sm font-bold ml-1">{stat.suffix}</span>
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Trust indicators */}
            <div className={`flex items-center mt-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                 style={{ transitionDelay: '0.7s' }}>
              <div className="flex -space-x-3 mr-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                       style={{ 
                         zIndex: 5-i, 
                         backgroundColor: `hsl(${210 + i*25}, 80%, ${65 - i*8}%)`,
                         boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                       }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="font-semibold">Trusted by 10,000+</div>
                <div className="text-sm text-gray-600">vehicle owners nationwide</div>
              </div>
            </div>
          </div>

          {/* Right column - Dynamic image carousel or location map */}
          <div className={`lg:col-span-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{ transitionDelay: '0.3s' }}
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}>
            {/* Card-style container with floating elements */}
            <div className="relative">
              {/* Conditional rendering based on showMap state */}
              {showMap ? (
                /* Location map card */
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 relative z-10"
                     style={{ height: '550px' }}>
                  {/* Location Map Component */}
                  <LocationMap 
                    userLocation={userLocation}
                    providers={nearbyRepairers}
                    onSelectProvider={handleSelectRepairer}
                    className="w-full h-full"
                  />
                  
                  {/* Close map button */}
                  <button
                    className="absolute top-3 right-3 z-30 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
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
                </div>
              ) : (
                /* Main card with image carousel */
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500 relative z-10"
                     style={{ height: '550px' }}>
                {/* The images */}
                {carouselImages.map((image, index) => (
                  <div key={index} 
                       className="absolute inset-0 transition-all duration-1000" 
                       style={{ 
                         opacity: activeImageIndex === index ? 1 : 0,
                       }}>
                    {/* Image with scale effect */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        style={{
                          transform: activeImageIndex === index ? 'scale(1.05)' : 'scale(1)',
                          transition: 'transform 8s ease-out'
                        }}
                      />
                      
                      {/* Color overlay */}
                      <div className="absolute inset-0" 
                           style={{ 
                             background: `linear-gradient(to bottom right, ${image.overlayColor}, transparent 70%)`,
                             mixBlendMode: 'multiply'
                           }}></div>
                    </div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      {/* Top section */}
                      <div className="flex justify-between">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg py-1 px-3 shadow-lg">
                          <span className="text-sm font-medium text-shopmeco-blue-600">{index + 1} / {carouselImages.length}</span>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg py-1 px-3 shadow-lg animate-pulse-glow">
                          <span className="text-sm font-medium text-shopmeco-blue-600">TOP RATED</span>
                        </div>
                      </div>
                      
                      {/* Bottom section */}
                      <div>
                        <div className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg inline-block">
                          <h3 className="text-xl font-bold">{image.alt}</h3>
                          <p className="text-sm text-gray-200 mt-1">Professional and reliable service</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Navigation controls */}
                <div className="absolute bottom-6 left-6 flex space-x-3 z-20">
                  {carouselImages.map((_, index) => (
                    <button 
                      key={index}
                      className="w-3 h-3 rounded-full focus:outline-none relative"
                      style={{ 
                        backgroundColor: activeImageIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                        transform: activeImageIndex === index ? 'scale(1)' : 'scale(0.8)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                      }}
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`Show image ${index + 1}`}
                    >
                      {activeImageIndex === index && (
                        <span className="absolute inset-0 rounded-full animate-ping" 
                              style={{backgroundColor: 'rgba(255,255,255,0.7)'}}></span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Certification badge */}
                <div className="absolute bottom-6 right-6 z-20">
                  <div className="bg-white rounded-xl shadow-lg p-3 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-shopmeco-blue-100 mr-3">
                        <svg className="w-6 h-6 text-shopmeco-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-shopmeco-blue-600">CERTIFIED</div>
                        <div className="text-sm font-medium">Quality Service</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-shopmeco-yellow-300 rounded-full opacity-70 z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-shopmeco-blue-300 rounded-full opacity-20 z-0"></div>
            </div>
            
            {/* Feature tags */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              {features.map((feature, i) => (
                <div key={i} 
                     className={`flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white shadow-md transform hover:scale-110 transition-transform duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                     style={{ 
                       animationDelay: `${0.7 + i * 0.1}s`,
                       transitionDelay: `${0.7 + i * 0.1}s`,
                       transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                       borderLeft: `3px solid ${i % 2 === 0 ? '#0071ff' : '#ffd700'}`
                     }}>
                  <span className="mr-2">{feature.icon}</span>
                  {feature.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
