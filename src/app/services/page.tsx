"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';
import One from '../../../public/car-parts.jpg';
import Two from '../../../public/car-mechanic-service.jpg';
import Three from '../../../public/car-maintenance.jpg';

// Animation helper for scroll reveal
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.id) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('[data-scroll]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return isVisible;
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHighlighted?: boolean;
}

const ServiceCard = ({ icon, title, description, isHighlighted = false }: ServiceCardProps) => {
  return (
    <div className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${isHighlighted ? 'border-2 border-blue-500 transform hover:-translate-y-2' : 'transform hover:-translate-y-1'}`}>
      <div className="p-6 h-full flex flex-col">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isHighlighted ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 flex-grow">{description}</p>
        <Link href="#" className="text-blue-500 hover:text-blue-700 font-medium flex items-center group">
          Learn more
          <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialCard = ({ quote, name, role, image }: TestimonialCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start mb-4">
        <svg className="w-8 h-8 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5 3.871 3.871 0 01-2.748-1.179z"></path>
        </svg>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image 
            src={image} 
            alt={name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default function Services() {
  const isVisible = useScrollReveal();
  
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Header Component */}
      <Header />
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div style={{ height: '4rem' }}></div>

      <main className="flex-1">
        {/* Hero Section with Glassmorphism */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden">
          {/* Floating glass shapes for glassmorphism effect */}
          <div className="absolute top-20 right-10 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 left-1/4 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
          
          {/* Background image with enhanced opacity for glass effect */}
          <div className="absolute inset-0 bg-[url('/hero-car-service.jpg')] opacity-15 bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12">
              <div className="lg:w-1/2">
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Services Tailored to Your Automotive Needs
                  </h1>
                  <p className="text-xl text-blue-100 mb-8">
                    Discover how ShopMeco connects vehicle owners, service providers, and parts sellers in a seamless ecosystem.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-white">
                      <Link href="#vehicle-owners">For Vehicle Owners</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-white border-white/70 backdrop-blur-sm hover:bg-white/20">
                      <Link href="#service-providers">For Service Providers</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 p-2 border border-white/20">
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <Image 
                      src={One}
                      alt="Vehicle service"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-white/30 backdrop-blur-md rounded-lg p-4 border border-white/40 shadow-lg">
                    <p className="font-medium text-white">Trusted by 500+ service providers and 10,000+ vehicle owners</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center text-white p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transform transition-transform hover:scale-105">
                  <div className="text-3xl font-bold mb-2 text-white">10K+</div>
                  <div className="text-blue-100">Vehicle Owners</div>
                </div>
                <div className="text-center text-white p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transform transition-transform hover:scale-105">
                  <div className="text-3xl font-bold mb-2 text-white">500+</div>
                  <div className="text-blue-100">Service Providers</div>
                </div>
                <div className="text-center text-white p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transform transition-transform hover:scale-105">
                  <div className="text-3xl font-bold mb-2 text-white">250+</div>
                  <div className="text-blue-100">Parts Sellers</div>
                </div>
                <div className="text-center text-white p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transform transition-transform hover:scale-105">
                  <div className="text-3xl font-bold mb-2 text-white">50K+</div>
                  <div className="text-blue-100">Services Completed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Vehicle Owners Section */}
        <section id="vehicle-owners" className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">For Vehicle Owners</h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                Simplify your vehicle maintenance with our comprehensive services
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div 
                id="owner-service-1" 
                data-scroll
                className={`transition-all duration-700 ${isVisible['owner-service-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <ServiceCard 
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                  title="Trusted Mechanics"
                  description="Connect with verified, top-rated mechanics in your area who specialize in your vehicle make and model."
                />
              </div>
              <div 
                id="owner-service-2" 
                data-scroll
                className={`transition-all duration-700 delay-150 ${isVisible['owner-service-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <ServiceCard 
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  title="Maintenance Tracking"
                  description="Keep track of service history, upcoming maintenance, and receive timely reminders for optimal vehicle performance."
                  isHighlighted={true}
                />
              </div>
              <div 
                id="owner-service-3" 
                data-scroll
                className={`transition-all duration-700 delay-300 ${isVisible['owner-service-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <ServiceCard 
                  icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  title="Cost Comparison"
                  description="Compare service prices from different providers to ensure you're getting the best value for your money."
                />
              </div>
            </div>

            <div className="relative w-full aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
              <div 
                id="owner-image" 
                data-scroll
                className={`transition-all duration-700 ${isVisible['owner-image'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              >
                <Image
                  src={Three}
                  alt="Vehicle maintenance"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 left-0 p-8">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Average 4.8/5 rating from users</span>
                      </div>
                      <p className="text-sm">Schedule service appointments with top-rated mechanics in your area.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Service Providers Section */}
        <section id="service-providers" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">For Service Providers</h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                Grow your business and streamline your operations
              </p>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-12 items-center mb-16">
              <div className="md:w-1/2">
                <div 
                  id="provider-content" 
                  data-scroll
                  className={`transition-all duration-700 ${isVisible['provider-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                >
                  <h3 className="text-2xl font-bold mb-6">Connect with Vehicle Owners</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 h-8 w-8 rounded-full flex items-center justify-center">
                          <span className="font-bold">1</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Expand Your Customer Base</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          Reach thousands of vehicle owners actively looking for quality service providers in your area.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 h-8 w-8 rounded-full flex items-center justify-center">
                          <span className="font-bold">2</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Manage Appointments</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          Streamline your scheduling with our easy-to-use appointment management system.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 h-8 w-8 rounded-full flex items-center justify-center">
                          <span className="font-bold">3</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Build Your Reputation</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          Collect reviews and ratings to showcase your quality service and attract more customers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button asChild className="bg-blue-500 hover:bg-blue-600">
                      <Link href="/register?type=provider">Join as Service Provider</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
                  <div 
                    id="provider-image" 
                    data-scroll
                    className={`transition-all duration-700 ${isVisible['provider-image'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  >
                    <Image
                      src={Two}
                      alt="Car mechanic service"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 p-8">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                          <div className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm font-medium">32% average business growth</span>
                          </div>
                          <p className="text-sm">Service providers report significant growth in their customer base within the first 3 months.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Parts Sellers Section */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">For Parts Sellers</h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                Connect with service providers and vehicle owners directly
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
                  <div 
                    id="parts-image" 
                    data-scroll
                    className={`transition-all duration-700 ${isVisible['parts-image'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  >
                    <Image
                      src={One}
                      alt="Car parts"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 p-8">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
                          <div className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm font-medium">Connected with 42 local repair shops</span>
                          </div>
                          <p className="text-sm">Expand your business by reaching vehicle owners and repair shops in your area.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div 
                  id="parts-content" 
                  data-scroll
                  className={`transition-all duration-700 ${isVisible['parts-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                >
                  <h3 className="text-2xl font-bold mb-6">Streamlined Parts Distribution</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 h-8 w-8 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Inventory Management</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          List your inventory with detailed specifications to help buyers find exactly what they need.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 h-8 w-8 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Direct Communication</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          Chat directly with service providers to fulfill orders quickly and efficiently.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 h-8 w-8 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">Order Tracking</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                          Monitor orders and shipments with our integrated tracking system for complete transparency.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button asChild className="bg-blue-500 hover:bg-blue-600">
                      <Link href="/register?type=seller">Join as Parts Seller</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                Don't just take our word for it - hear from the people who use ShopMeco every day
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div 
                id="testimonial-1" 
                data-scroll
                className={`transition-all duration-700 ${isVisible['testimonial-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <TestimonialCard
                  quote="ShopMeco has completely changed how I maintain my vehicles. Finding reliable mechanics used to be a nightmare, but now it's just a few clicks away."
                  name="Michael Johnson"
                  role="Vehicle Owner"
                  image="/hero-car-service.jpg"
                />
              </div>
              
              <div 
                id="testimonial-2" 
                data-scroll
                className={`transition-all duration-700 delay-150 ${isVisible['testimonial-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <TestimonialCard
                  quote="As a mechanic with my own shop, ShopMeco has helped me reach more customers and grow my business by 40% in just six months."
                  name="Sarah Williams"
                  role="Service Provider"
                  image="/car-mechanic-service.jpg"
                />
              </div>
              
              <div 
                id="testimonial-3" 
                data-scroll
                className={`transition-all duration-700 delay-300 ${isVisible['testimonial-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <TestimonialCard
                  quote="My parts business has thrived since joining ShopMeco. The platform connects us directly with customers who need exactly what we sell."
                  name="David Chen"
                  role="Parts Seller"
                  image="/car-parts.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Plans Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Service Plans</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the right plan for your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div 
                id="plan-1" 
                data-scroll
                className={`transition-all duration-700 ${isVisible['plan-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Card className="relative overflow-hidden border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
                  <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 text-sm font-medium rounded-bl-lg">
                    Free
                  </div>
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                    <CardDescription>For individuals with 1-2 vehicles</CardDescription>
                    <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-100">
                      <span className="text-5xl font-extrabold tracking-tight">$0</span>
                      <span className="ml-1 text-xl font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Up to 2 vehicle registrations</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Basic maintenance tracking</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Service request (3 per month)</span>
                      </li>
                      <li className="flex items-start text-muted-foreground">
                        <svg className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Advanced maintenance alerts</span>
                      </li>
                      <li className="flex items-start text-muted-foreground">
                        <svg className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Service history reports</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div 
                id="plan-2" 
                data-scroll
                className={`transition-all duration-700 delay-150 ${isVisible['plan-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Card className="relative overflow-hidden border-2 border-yellow-500 dark:border-yellow-500 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-gray-900 px-4 py-1 text-sm font-bold rounded-full shadow-md">
                    Most Popular
                  </div>
                  <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-3 py-1 text-sm font-medium rounded-bl-lg">
                    Premium
                  </div>
                  <CardHeader>
                    <CardTitle>Standard</CardTitle>
                    <CardDescription>For individuals with multiple vehicles</CardDescription>
                    <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-100">
                      <span className="text-5xl font-extrabold tracking-tight">$9.99</span>
                      <span className="ml-1 text-xl font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Up to 5 vehicle registrations</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Advanced maintenance tracking</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Unlimited service requests</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Advanced maintenance alerts</span>
                      </li>
                      <li className="flex items-start text-muted-foreground">
                        <svg className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Priority customer support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                      <Link href="/register?plan=standard">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div 
                id="plan-3" 
                data-scroll
                className={`transition-all duration-700 delay-300 ${isVisible['plan-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Card className="relative overflow-hidden border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full">
                  <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 text-sm font-medium rounded-bl-lg">
                    Business
                  </div>
                  <CardHeader>
                    <CardTitle>Professional</CardTitle>
                    <CardDescription>For businesses & fleet management</CardDescription>
                    <div className="mt-4 flex items-baseline text-gray-900 dark:text-gray-100">
                      <span className="text-5xl font-extrabold tracking-tight">$29.99</span>
                      <span className="ml-1 text-xl font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Unlimited vehicle registrations</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Fleet management dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Advanced analytics & reporting</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Advanced maintenance alerts</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Priority customer support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                      <Link href="/register?plan=professional">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700"></div>
          <div className="absolute inset-0 bg-[url('/hero-car-service.jpg')] opacity-10 bg-cover bg-center"></div>
          <div 
            id="cta-content" 
            data-scroll
            className={`relative container mx-auto px-4 text-center z-10 transition-all duration-700 ${isVisible['cta-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Transform Your Vehicle Experience?</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                Join thousands of satisfied users who have streamlined their vehicle maintenance and service through ShopMeco.
              </p>
              <div className="mb-8">
                <h3 className="text-xl text-white mb-3 font-medium">Choose your role:</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-6 text-lg">
                    <Link href="/register" className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Vehicle Owner
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-6 text-lg">
                    <Link href="/register?role=REPAIRER" className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Service Provider
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="bg-purple-400 text-purple-900 hover:bg-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 py-6 text-lg">
                    <Link href="/register?role=SELLER" className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Parts Seller
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:border-white transition-all duration-300 px-8 py-6 text-lg">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
