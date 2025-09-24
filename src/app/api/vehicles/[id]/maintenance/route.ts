import { NextRequest, NextResponse } from 'next/server';
import { MaintenanceRecord, Vehicle } from '@/types/models';

// Mock database - would be shared with the main vehicles route in a real app
const vehicles: Vehicle[] = [
  {
    id: '1',
    ownerId: 'user1',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    registrationNumber: 'ABC-123-XYZ',
    color: 'Silver',
    fuelType: 'Petrol',
    engineSize: '2.5L',
    transmissionType: 'Automatic',
    maintenanceHistory: [
      {
        id: '101',
        vehicleId: '1',
        serviceDate: new Date('2023-06-15'),
        serviceType: 'Oil Change',
        description: 'Regular oil change and filter replacement',
        mileage: 15000,
        cost: 75.50,
        createdAt: new Date('2023-06-15')
      },
      {
        id: '102',
        vehicleId: '1',
        serviceDate: new Date('2023-09-10'),
        serviceType: 'Brake Service',
        description: 'Front brake pads replacement',
        mileage: 22000,
        cost: 220.00,
        createdAt: new Date('2023-09-10')
      }
    ],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    ownerId: 'user1',
    make: 'Honda',
    model: 'CR-V',
    year: 2019,
    registrationNumber: 'XYZ-789-ABC',
    color: 'Blue',
    fuelType: 'Petrol',
    engineSize: '1.5L',
    transmissionType: 'CVT',
    maintenanceHistory: [],
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  },
  {
    id: '3',
    ownerId: 'user2',
    make: 'Ford',
    model: 'F-150',
    year: 2021,
    registrationNumber: 'DEF-456-UVW',
    color: 'Red',
    fuelType: 'Diesel',
    engineSize: '3.5L',
    transmissionType: 'Automatic',
    maintenanceHistory: [],
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-05')
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return NextResponse.json(
      { error: 'Vehicle not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ 
    vehicleId: id, 
    maintenanceHistory: vehicle.maintenanceHistory 
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  const vehicleIndex = vehicles.findIndex(v => v.id === id);
  
  if (vehicleIndex === -1) {
    return NextResponse.json(
      { error: 'Vehicle not found' },
      { status: 404 }
    );
  }
  
  try {
    const body = await request.json();
    const { serviceDate, serviceType, description } = body;
    
    // Validation
    if (!serviceDate || !serviceType || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new maintenance record
    const newRecord: MaintenanceRecord = {
      id: `${Date.now()}`, // In a real app, use a UUID generator
      vehicleId: id,
      serviceDate: new Date(serviceDate),
      serviceType,
      description,
      createdAt: new Date(),
      ...body // Spread the rest of the optional fields
    };
    
    // Add to vehicle's maintenance history
    vehicles[vehicleIndex].maintenanceHistory.push(newRecord);
    
    return NextResponse.json({ maintenanceRecord: newRecord }, { status: 201 });
  } catch (error) {
    console.error('Error adding maintenance record:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
