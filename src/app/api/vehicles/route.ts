import { NextRequest, NextResponse } from 'next/server';
import { Vehicle } from '@/types/models';

// Mock database for vehicles
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
    maintenanceHistory: [],
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

export async function GET(request: NextRequest) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get('ownerId');
  const make = searchParams.get('make');
  
  let filteredVehicles = [...vehicles];
  
  // Apply filters if provided
  if (ownerId) {
    filteredVehicles = filteredVehicles.filter(vehicle => vehicle.ownerId === ownerId);
  }
  
  if (make) {
    filteredVehicles = filteredVehicles.filter(vehicle => 
      vehicle.make.toLowerCase().includes(make.toLowerCase())
    );
  }
  
  return NextResponse.json({ vehicles: filteredVehicles });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ownerId, make, model, year, registrationNumber } = body;
    
    // Validation
    if (!ownerId || !make || !model || !year || !registrationNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new vehicle
    const newVehicle: Vehicle = {
      id: `${vehicles.length + 1}`, // In a real app, use a UUID generator
      ownerId,
      make,
      model,
      year,
      registrationNumber,
      maintenanceHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...body // Spread the rest of the optional fields
    };
    
    vehicles.push(newVehicle);
    
    return NextResponse.json({ vehicle: newVehicle }, { status: 201 });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
