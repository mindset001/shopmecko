'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TestimonialCard from '@/components/ui/testimonial-card';

interface VisibilityState {
  [key: string]: boolean;
}

export default function ServiceSections() {
  const [isVisible, setIsVisible] = useState<VisibilityState>({
    'owner-content': false,
    'owner-image': false,
    'mechanic-content': false,
    'mechanic-image': false,
    'seller-content': false,
    'seller-image': false,
    'testimonial-1': false,
    'testimonial-2': false,
    'testimonial-3': false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements
    const elements = document.querySelectorAll('[data-scroll]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* For Vehicle Owners */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800" id="vehicle-owners">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              id="owner-content" 
              data-scroll
              className={`transition-all duration-700 ${isVisible['owner-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            >
        <h2 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">For Vehicle Owners</h2>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          ShopMeco offers vehicle owners a streamlined way to maintain and service their vehicles. From finding trusted mechanics to tracking maintenance history, we make vehicle ownership simpler.
        </p>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Vehicle Registration</h3>
              <p className="text-gray-600 dark:text-gray-400">Add your vehicles to your profile for easy maintenance tracking and service history</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Maintenance Reminders</h3>
              <p className="text-gray-600 dark:text-gray-400">Never miss an oil change or service appointment with automated maintenance reminders</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Find Trusted Services</h3>
              <p className="text-gray-600 dark:text-gray-400">Connect with verified repair shops and mechanics with reviews from other vehicle owners</p>
            </div>
          </div>
        </div>
        
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/register?type=owner">Register as Vehicle Owner</Link>
        </Button>
      </div>
      
      <div 
        id="owner-image" 
        data-scroll
        className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${isVisible['owner-image'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      >
        <Image
          src="/car-maintenance.jpg"
          alt="Vehicle maintenance"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm ml-2">5.0 (128 reviews)</span>
              </div>
              <p className="text-sm">"ShopMeco has saved me so much time and money on my vehicle maintenance."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* For Service Providers */}
<section className="py-20" id="service-providers">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div 
        id="mechanic-image" 
        data-scroll
        className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 order-2 lg:order-1 ${isVisible['mechanic-image'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
      >
        <Image
          src="/car-mechanic-service.jpg"
          alt="Car mechanic service"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 left-0 p-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 max-w-xs">
              <div className="flex items-center space-x-1 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Online Now</span>
              </div>
              <p className="text-sm">New service request from John D. - Honda Civic 2020</p>
              <div className="mt-2 text-blue-500 text-sm font-medium">4 new quotes requested today</div>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        id="mechanic-content" 
        data-scroll
        className={`transition-all duration-700 order-1 lg:order-2 ${isVisible['mechanic-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      >
        <h2 className="text-4xl font-bold mb-6 text-yellow-500">For Service Providers</h2>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          ShopMeco helps repair shops and mechanics connect with vehicle owners who need their services, streamlining customer acquisition and business management.
        </p>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Business Profile</h3>
              <p className="text-gray-600 dark:text-gray-400">Create a comprehensive profile showcasing your services, expertise, and customer reviews</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Quote Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Easily create and send professional quotes to customers based on their service requests</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Job Alerts</h3>
              <p className="text-gray-600 dark:text-gray-400">Get instant notifications when vehicle owners in your area need services you provide</p>
            </div>
          </div>
        </div>
        
        <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white">
          <Link href="/register?type=repairer">Register as Service Provider</Link>
        </Button>
      </div>
    </div>
  </div>
</section>

{/* For Parts Sellers */}
<section className="py-20 bg-gradient-to-l from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800" id="parts-sellers">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div 
        id="seller-content" 
        data-scroll
        className={`transition-all duration-700 ${isVisible['seller-content'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">For Parts Sellers</h2>
        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
          ShopMeco connects parts sellers with vehicle owners and repair services, providing a seamless marketplace for automotive parts and accessories.
        </p>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Parts Catalog</h3>
              <p className="text-gray-600 dark:text-gray-400">Create and manage your digital parts catalog with detailed specifications and pricing</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Order Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Streamlined system for processing orders, managing inventory, and handling fulfillment</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Analytics & Insights</h3>
              <p className="text-gray-600 dark:text-gray-400">Track sales performance, monitor inventory levels, and identify popular products</p>
            </div>
          </div>
        </div>
        
        <Button asChild className="bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600">
          <Link href="/register?type=seller">Register as Parts Seller</Link>
        </Button>
      </div>
      
      <div 
        id="seller-image" 
        data-scroll
        className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${isVisible['seller-image'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      >
        <Image
          src="/car-parts.jpg"
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
</section>

{/* Testimonials Section */}
<section className="py-20 bg-white dark:bg-gray-950">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
      <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
        Don&apos;t just take our word for it - hear from the people who use ShopMeco every day
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
          author="Michael Johnson"
          role="Vehicle Owner"
        />
      </div>
      
      <div 
        id="testimonial-2" 
        data-scroll
        className={`transition-all duration-700 delay-150 ${isVisible['testimonial-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <TestimonialCard
          quote="As a mechanic with my own shop, ShopMeco has helped me reach more customers and grow my business by 40% in just six months."
          author="Sarah Williams"
          role="Service Provider"
        />
      </div>
      
      <div 
        id="testimonial-3" 
        data-scroll
        className={`transition-all duration-700 delay-300 ${isVisible['testimonial-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <TestimonialCard
          quote="My parts business has thrived since joining ShopMeco. The platform connects us directly with customers who need exactly what we sell."
          author="David Chen"
          role="Parts Seller"
        />
      </div>
    </div>
  </div>
</section>

{/* CTA Section */}
<section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Vehicle Experience?</h2>
    <p className="text-xl max-w-3xl mx-auto mb-10">
      Join ShopMeco today and experience a better way to manage your vehicles, grow your service business, or sell parts.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
        <Link href="/register">Get Started for Free</Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
        <Link href="/contact">Contact Sales</Link>
      </Button>
    </div>
  </div>
</section>
    </>
  );
}
