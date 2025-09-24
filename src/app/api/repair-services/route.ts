import { NextRequest, NextResponse } from 'next/server';
import { RepairService } from '@/types/models';

// Mock database for repair services
const repairServices: RepairService[] = [
  {
    id: '1',
    repairerId: 'repairer1',
    name: 'Oil Change Service',
    description: 'Complete oil change with filter replacement and fluid top-up.',
    category: 'Maintenance',
    estimatedDuration: '1 hour',
    basePrice: 50.00,
    priceType: 'FIXED',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10')
  },
  {
    id: '2',
    repairerId: 'repairer1',
    name: 'Brake Pad Replacement',
    description: 'Front or rear brake pad replacement with inspection.',
    category: 'Brakes',
    estimatedDuration: '2-3 hours',
    basePrice: 150.00,
    priceType: 'FIXED',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '3',
    repairerId: 'repairer2',
    name: 'Engine Diagnostic',
    description: 'Comprehensive engine diagnostic with computer analysis.',
    category: 'Diagnostics',
    estimatedDuration: '1-2 hours',
    basePrice: 80.00,
    priceType: 'FIXED',
    createdAt: new Date('2025-02-05'),
    updatedAt: new Date('2025-02-05')
  },
  {
    id: '4',
    repairerId: 'repairer2',
    name: 'Custom Engine Tuning',
    description: 'Performance tuning and optimization for your specific vehicle.',
    category: 'Performance',
    estimatedDuration: 'Varies',
    priceType: 'QUOTE_REQUIRED',
    createdAt: new Date('2025-02-10'),
    updatedAt: new Date('2025-02-10')
  }
];

export async function GET(request: NextRequest) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const repairerId = searchParams.get('repairerId');
  const category = searchParams.get('category');
  
  let filteredServices = [...repairServices];
  
  // Apply filters if provided
  if (repairerId) {
    filteredServices = filteredServices.filter(service => service.repairerId === repairerId);
  }
  
  if (category) {
    filteredServices = filteredServices.filter(service => 
      service.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  return NextResponse.json({ repairServices: filteredServices });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repairerId, name, description, category, priceType } = body;
    
    // Validation
    if (!repairerId || !name || !description || !category || !priceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate price type
    const validPriceTypes = ['FIXED', 'HOURLY', 'QUOTE_REQUIRED'];
    if (!validPriceTypes.includes(priceType)) {
      return NextResponse.json(
        { error: 'Invalid price type. Must be one of: FIXED, HOURLY, QUOTE_REQUIRED' },
        { status: 400 }
      );
    }
    
    // Create new repair service
    const newService: RepairService = {
      id: `${repairServices.length + 1}`, // In a real app, use a UUID generator
      repairerId,
      name,
      description,
      category,
      priceType: priceType as 'FIXED' | 'HOURLY' | 'QUOTE_REQUIRED',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...body // Spread the rest of the optional fields
    };
    
    repairServices.push(newService);
    
    return NextResponse.json({ repairService: newService }, { status: 201 });
  } catch (error) {
    console.error('Error creating repair service:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
