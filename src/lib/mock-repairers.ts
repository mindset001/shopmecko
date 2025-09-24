'use client';

import { Repairer } from '@/types/models';

// This file provides mock data for nearby repairers
export const getNearbyRepairers = (): Repairer[] => {
  return [
    {
      id: 'repairer1',
      name: 'Mike\'s Auto Repair',
      email: 'mike@autorepair.com',
      phoneNumber: '555-234-5678',
      role: 'REPAIRER',
      businessName: 'Mike\'s Auto Repair',
      businessDescription: 'Full-service auto repair shop specializing in domestic and import vehicles.',
      specializations: ['General Repairs', 'Engine Diagnostics', 'Brake Service'],
      rating: 4.8,
      completedJobs: 523,
      reviews: [],
      services: [],
      avatar: '/avatars/mike.jpg',
      location: {
        address: '789 Mechanic St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        coordinates: {
          latitude: 34.052235,
          longitude: -118.243683
        }
      },
      createdAt: new Date('2025-01-20'),
      updatedAt: new Date('2025-01-20')
    },
    {
      id: 'repairer2',
      name: 'Elite Auto Care',
      email: 'service@eliteauto.com',
      phoneNumber: '555-987-6543',
      role: 'REPAIRER',
      businessName: 'Elite Auto Care',
      businessDescription: 'Luxury vehicle specialists with certified technicians for European and high-end automobiles.',
      specializations: ['Luxury Vehicles', 'Performance Tuning'],
      rating: 4.9,
      completedJobs: 341,
      reviews: [],
      services: [],
      location: {
        address: '456 Elite Way',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        coordinates: {
          latitude: 34.0536,
          longitude: -118.2518
        }
      },
      createdAt: new Date('2022-09-10'),
      updatedAt: new Date('2023-02-15')
    },
    {
      id: 'repairer3',
      name: 'Quick Fix Auto',
      email: 'support@quickfixauto.com',
      phoneNumber: '555-456-7890',
      role: 'REPAIRER',
      businessName: 'Quick Fix Auto',
      businessDescription: 'Fast and affordable repairs for all vehicle types. Specializing in same-day service.',
      specializations: ['Quick Repairs', 'Tire Service'],
      rating: 4.6,
      completedJobs: 287,
      reviews: [],
      services: [],
      location: {
        address: '123 Speed Ln',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        coordinates: {
          latitude: 34.0625,
          longitude: -118.2363
        }
      },
      createdAt: new Date('2022-05-20'),
      updatedAt: new Date('2023-04-10')
    },
    {
      id: 'repairer4',
      name: 'Green Valley Mechanics',
      email: 'info@greenvalleymech.com',
      phoneNumber: '555-222-3333',
      role: 'REPAIRER',
      businessName: 'Green Valley Mechanics',
      businessDescription: 'Eco-friendly auto shop specializing in hybrid and electric vehicles.',
      specializations: ['Hybrid/Electric', 'Eco-Friendly Repairs'],
      rating: 4.7,
      completedJobs: 189,
      reviews: [],
      services: [],
      location: {
        address: '789 Green St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        coordinates: {
          latitude: 34.0481,
          longitude: -118.2591
        }
      },
      createdAt: new Date('2023-03-15'),
      updatedAt: new Date('2023-03-15')
    },
    {
      id: 'repairer5',
      name: 'AutoTech Solutions',
      email: 'support@autotechsolutions.com',
      phoneNumber: '555-777-8888',
      role: 'REPAIRER',
      businessName: 'AutoTech Solutions',
      businessDescription: 'Technology-focused auto repair using the latest diagnostic equipment.',
      specializations: ['Computer Diagnostics', 'Software Updates'],
      rating: 4.5,
      completedJobs: 213,
      reviews: [],
      services: [],
      location: {
        address: '456 Tech Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        coordinates: {
          latitude: 34.0689,
          longitude: -118.2195
        }
      },
      createdAt: new Date('2023-01-10'),
      updatedAt: new Date('2023-01-10')
    }
  ];
};
