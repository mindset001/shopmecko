import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simulated database for products
const mockProducts = [
  {
    id: '1',
    sellerId: 'seller1',
    name: 'Brake Pads (Front)',
    description: 'High-performance ceramic brake pads for optimal stopping power and reduced brake dust.',
    category: 'Brakes',
    compatibleVehicles: [
      { make: 'Toyota', model: 'Camry', yearStart: 2018, yearEnd: 2022 },
      { make: 'Honda', model: 'Accord', yearStart: 2018, yearEnd: 2022 }
    ],
    condition: 'NEW',
    price: 89.99,
    stock: 24,
    images: ['/car-parts.jpg'],
    specifications: {
      manufacturer: 'BrakeMaster',
      warranty: '2 years',
      material: 'Ceramic'
    },
    rating: 4.7,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    sellerId: 'seller1',
    name: 'Oil Filter',
    description: 'Premium oil filter that removes contaminants for cleaner engine operation.',
    category: 'Engine',
    compatibleVehicles: [
      { make: 'Toyota', yearStart: 2015, yearEnd: 2023 },
      { make: 'Honda', yearStart: 2015, yearEnd: 2023 },
      { make: 'Ford', yearStart: 2016, yearEnd: 2023 }
    ],
    condition: 'NEW',
    price: 12.99,
    stock: 18,
    images: ['/car-parts.jpg'],
    specifications: {
      manufacturer: 'FilterPro',
      warranty: '1 year',
      filterType: 'Full-Flow'
    },
    rating: 4.5,
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-01-20')
  },
  {
    id: '3',
    sellerId: 'seller1',
    name: 'Alternator - Remanufactured',
    description: 'Remanufactured alternator with new components for reliable performance.',
    category: 'Electrical',
    compatibleVehicles: [
      { make: 'Ford', model: 'F-150', yearStart: 2015, yearEnd: 2020 },
      { make: 'Ford', model: 'Explorer', yearStart: 2016, yearEnd: 2019 }
    ],
    condition: 'REFURBISHED',
    price: 159.99,
    stock: 7,
    images: ['/car-parts.jpg'],
    specifications: {
      manufacturer: 'ElectriPower',
      warranty: '1 year',
      amperage: '120A'
    },
    rating: 4.3,
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-02-10')
  },
  {
    id: '4',
    sellerId: 'seller1',
    name: 'Spark Plugs (Set of 4)',
    description: 'Iridium spark plugs for improved fuel efficiency and engine performance.',
    category: 'Ignition',
    compatibleVehicles: [
      { make: 'Chevrolet', model: 'Malibu', yearStart: 2016, yearEnd: 2022 },
      { make: 'Buick', model: 'Regal', yearStart: 2014, yearEnd: 2020 }
    ],
    condition: 'NEW',
    price: 42.99,
    stock: 32,
    images: ['/car-parts.jpg'],
    specifications: {
      manufacturer: 'SparkTech',
      warranty: '2 years',
      material: 'Iridium'
    },
    rating: 4.8,
    createdAt: new Date('2023-02-12'),
    updatedAt: new Date('2023-02-12')
  }
];

export async function GET(request: NextRequest) {
  try {
    // Get search params
    const { searchParams } = new URL(request.url);
    const sellerId = searchParams.get('sellerId');
    const category = searchParams.get('category');
    const searchTerm = searchParams.get('search');
    
    // Filter products based on query parameters
    let filteredProducts = [...mockProducts];
    
    if (sellerId) {
      filteredProducts = filteredProducts.filter(p => p.sellerId === sellerId);
    }
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(
        p => p.name.toLowerCase().includes(term) || 
             p.description.toLowerCase().includes(term)
      );
    }
    
    return NextResponse.json({
      products: filteredProducts,
      count: filteredProducts.length
    });
  } catch (error) {
    console.error('Error getting products:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.name || !body.price || !body.category || !body.sellerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In a real app, we would add this to the database
    // Here we'll just return a success message with a mock ID
    const newProduct = {
      id: `${mockProducts.length + 1}`,
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return NextResponse.json({
      success: true,
      product: newProduct
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the product' },
      { status: 500 }
    );
  }
}
