'use client';

import { useState, useEffect } from 'react';
import { Repairer } from '@/types/models';
import Link from 'next/link';
import LocationMap from '../ui/location-map';
import { getNearbyRepairers } from '@/lib/mock-repairers';

// Mock data for repairers
const mockRepairers: Repairer[] = [
  {
    id: '1',
    name: 'Premier Auto Repair',
    email: 'contact@premierauto.com',
    phoneNumber: '(555) 123-4567',
    role: 'REPAIRER',
    businessName: 'Premier Auto Repair',
    businessDescription: 'Full-service auto repair shop specializing in domestic and import vehicles. We offer everything from routine maintenance to complex repairs.',
    specializations: ['General Repairs', 'Engine Diagnostics', 'Brake Service', 'Electrical Systems'],
    workshopImages: ['/car-mechanic-service.jpg'],
    rating: 4.8,
    completedJobs: 523,
    services: [
      {
        id: '101',
        repairerId: '1',
        name: 'Oil Change',
        description: 'Full-service oil change with filter replacement and fluid check',
        category: 'Maintenance',
        estimatedDuration: '30-45 minutes',
        basePrice: 45.00,
        priceType: 'FIXED',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      },
      {
        id: '102',
        repairerId: '1',
        name: 'Brake Service',
        description: 'Comprehensive brake inspection and pad replacement',
        category: 'Repairs',
        estimatedDuration: '1-2 hours',
        basePrice: 150.00,
        priceType: 'FIXED',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      }
    ],
    reviews: [],
    location: {
      address: '123 Mechanic Lane',
      city: 'Autoville',
      state: 'CA',
      country: 'USA',
      coordinates: {
        latitude: 34.05,
        longitude: -118.24
      }
    },
    createdAt: new Date('2022-06-15'),
    updatedAt: new Date('2023-03-20')
  },
  {
    id: '2',
    name: 'Elite Auto Care',
    email: 'service@eliteauto.com',
    phoneNumber: '(555) 987-6543',
    role: 'REPAIRER',
    businessName: 'Elite Auto Care',
    businessDescription: 'Luxury vehicle specialists with certified technicians for European and high-end automobiles.',
    specializations: ['Luxury Vehicles', 'Performance Tuning', 'Computerized Diagnostics', 'Custom Modifications'],
    workshopImages: ['/car-mechanic-service.jpg'],
    rating: 4.9,
    completedJobs: 341,
    services: [
      {
        id: '201',
        repairerId: '2',
        name: 'Performance Diagnostic',
        description: 'Complete system diagnostic for luxury and performance vehicles',
        category: 'Diagnostics',
        estimatedDuration: '1-2 hours',
        basePrice: 120.00,
        priceType: 'FIXED',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      }
    ],
    reviews: [],
    location: {
      address: '456 Luxury Drive',
      city: 'Motorville',
      state: 'NY',
      country: 'USA',
      coordinates: {
        latitude: 40.71,
        longitude: -74.01
      }
    },
    createdAt: new Date('2022-09-10'),
    updatedAt: new Date('2023-02-15')
  },
  {
    id: '3',
    name: 'Quick Fix Auto',
    email: 'support@quickfixauto.com',
    phoneNumber: '(555) 456-7890',
    role: 'REPAIRER',
    businessName: 'Quick Fix Auto',
    businessDescription: 'Fast and affordable repairs for all vehicle types. Specializing in same-day service for common issues.',
    specializations: ['Quick Repairs', 'Tire Service', 'Battery Replacement', 'Minor Maintenance'],
    workshopImages: ['/car-mechanic-service.jpg'],
    rating: 4.6,
    completedJobs: 789,
    services: [
      {
        id: '301',
        repairerId: '3',
        name: 'Express Oil Change',
        description: 'Quick oil and filter change service - 20 minutes or less',
        category: 'Maintenance',
        estimatedDuration: '15-20 minutes',
        basePrice: 35.00,
        priceType: 'FIXED',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      }
    ],
    reviews: [],
    location: {
      address: '789 Speed Street',
      city: 'Quickburg',
      state: 'TX',
      country: 'USA',
      coordinates: {
        latitude: 29.76,
        longitude: -95.37
      }
    },
    createdAt: new Date('2022-05-20'),
    updatedAt: new Date('2023-04-10')
  }
];

export default function FindMechanics() {
  const [repairers, setRepairers] = useState<Repairer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [userLocation, setUserLocation] = useState({ lat: 34.052235, lng: -118.243683 }); // Default to LA
  const [selectedRepairer, setSelectedRepairer] = useState<Repairer | null>(null);
  
  // Unique list of specializations from all repairers
  const allSpecializations = Array.from(
    new Set(
      mockRepairers.flatMap(repairer => 
        repairer.specializations
      )
    )
  ).sort();

  // Handle selection of a repairer
  const handleSelectRepairer = (repairer: Repairer) => {
    setSelectedRepairer(repairer);
  };

  // Simulate getting user location
  const getUserLocation = () => {
    // In a real app, we would use the browser's geolocation API:
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setUserLocation({
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   });
    // });
    
    // For this demo, we'll just toggle to map view with our default location
    setViewMode('map');
  };

  useEffect(() => {
    // Simulate API call to get repairers
    const fetchRepairers = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we're using mock data
        setTimeout(() => {
          // Combine our mock repairers with the nearby repairers from the map component
          const combinedRepairers = [...mockRepairers, ...getNearbyRepairers()];
          // Remove duplicates based on id
          const uniqueRepairers = Array.from(
            new Map(combinedRepairers.map(repairer => [repairer.id, repairer])).values()
          );
          
          setRepairers(uniqueRepairers);
          setIsLoading(false);
        }, 1000);
      } catch (err: any) {
        setError('Failed to load mechanics. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchRepairers();
  }, []);

  // Filter repairers based on search query and specialty
  const filteredRepairers = repairers.filter(repairer => {
    const matchesSearch = searchQuery === '' || 
      repairer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repairer.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      repairer.businessDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === '' || 
      repairer.specializations.includes(specialtyFilter);
    
    return matchesSearch && matchesSpecialty;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12" suppressHydrationWarning>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-800 dark:text-red-200">
        <p>{error}</p>
        <button 
          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Find Trusted Mechanics</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Discover top-rated mechanics and repair shops in your area. Read reviews, compare services, and connect directly with professionals.
        </p>
        
        {/* View mode toggle */}
        <div className="flex items-center mt-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'
              } transition-colors`}
              onClick={() => setViewMode('list')}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                List View
              </span>
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                viewMode === 'map' 
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'
              } transition-colors`}
              onClick={getUserLocation}
            >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Map View
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, service, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 pl-10 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="w-full md:w-64">
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Specialties</option>
            {allSpecializations.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredRepairers.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-200">No mechanics found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria to find available mechanics.</p>
          <button
            onClick={() => { setSearchQuery(''); setSpecialtyFilter(''); }}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === 'map' ? (
        <div className="w-full h-[600px] mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <LocationMap 
            userLocation={userLocation}
            providers={filteredRepairers}
            onSelectProvider={handleSelectRepairer}
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRepairers.map((repairer) => (
            <div key={repairer.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="md:w-1/4 relative h-48 md:h-auto rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img 
                      src={repairer.workshopImages?.[0] || '/car-mechanic-service.jpg'} 
                      alt={repairer.businessName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <div className="md:w-3/4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{repairer.businessName}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm font-medium">{repairer.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{repairer.completedJobs} jobs completed</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {repairer.specializations.slice(0, 3).map((specialty, index) => (
                          <span 
                            key={index}
                            className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {repairer.specializations.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                            +{repairer.specializations.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {repairer.businessDescription}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Services:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {repairer.services.slice(0, 4).map((service) => (
                          <li key={service.id} className="flex items-center">
                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>
                              {service.name} 
                              {service.basePrice !== undefined 
                                ? ` - $${service.basePrice.toFixed(2)}` 
                                : service.priceType === 'QUOTE_REQUIRED' 
                                  ? ' - Quote Required' 
                                  : ''}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <button
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => window.dispatchEvent(new CustomEvent('request-service', { detail: { repairerId: repairer.id } }))}
                      >
                        Request Service
                      </button>
                      <button
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => alert(`View profile of ${repairer.businessName}`)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
