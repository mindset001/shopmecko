import { NextRequest, NextResponse } from 'next/server';
import { ServiceRequest } from '@/types/models';

// Mock database for service requests
const serviceRequests: ServiceRequest[] = [
  {
    id: '1',
    vehicleId: '1',
    ownerId: 'user1',
    serviceType: 'Oil Change',
    description: 'Need a routine oil change for my Toyota Camry',
    urgency: 'LOW',
    status: 'PENDING',
    preferredDate: new Date('2025-09-20'),
    budget: 80.00,
    quotes: [],
    createdAt: new Date('2025-09-15'),
    updatedAt: new Date('2025-09-15')
  },
  {
    id: '2',
    vehicleId: '1',
    ownerId: 'user1',
    serviceType: 'Brake Inspection',
    description: 'Hearing squeaking noise when braking. Need inspection.',
    urgency: 'MEDIUM',
    status: 'PENDING',
    preferredDate: new Date('2025-09-18'),
    budget: 150.00,
    quotes: [],
    createdAt: new Date('2025-09-14'),
    updatedAt: new Date('2025-09-14')
  },
  {
    id: '3',
    vehicleId: '3',
    ownerId: 'user2',
    serviceType: 'Engine Diagnostics',
    description: 'Check engine light is on. Need comprehensive diagnostics.',
    urgency: 'HIGH',
    status: 'ACCEPTED',
    location: {
      address: '123 Main St, Anytown',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    budget: 200.00,
    quotes: [],
    createdAt: new Date('2025-09-13'),
    updatedAt: new Date('2025-09-14')
  }
];

export async function GET(request: NextRequest) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get('ownerId');
  const status = searchParams.get('status');
  const urgency = searchParams.get('urgency');
  
  let filteredRequests = [...serviceRequests];
  
  // Apply filters if provided
  if (ownerId) {
    filteredRequests = filteredRequests.filter(req => req.ownerId === ownerId);
  }
  
  if (status) {
    filteredRequests = filteredRequests.filter(req => req.status === status.toUpperCase());
  }
  
  if (urgency) {
    filteredRequests = filteredRequests.filter(req => req.urgency === urgency.toUpperCase());
  }
  
  return NextResponse.json({ serviceRequests: filteredRequests });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicleId, ownerId, serviceType, description, urgency } = body;
    
    // Validation
    if (!vehicleId || !ownerId || !serviceType || !description || !urgency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new service request
    const newRequest: ServiceRequest = {
      id: `${serviceRequests.length + 1}`, // In a real app, use a UUID generator
      vehicleId,
      ownerId,
      serviceType,
      description,
      urgency: urgency.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY',
      status: 'PENDING',
      quotes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...body // Spread the rest of the optional fields
    };
    
    serviceRequests.push(newRequest);
    
    return NextResponse.json({ serviceRequest: newRequest }, { status: 201 });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
