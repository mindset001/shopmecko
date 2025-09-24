import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types/models';

// Mock database for products (spare parts)
const products: Product[] = [
  {
    id: '1',
    sellerId: 'seller1',
    name: 'Bosch Oil Filter',
    description: 'Premium oil filter for most Toyota, Honda, and Nissan vehicles.',
    category: 'Filters',
    compatibleVehicles: [
      { make: 'Toyota', model: 'Camry', yearStart: 2018, yearEnd: 2023 },
      { make: 'Toyota', model: 'Corolla', yearStart: 2017, yearEnd: 2023 },
      { make: 'Honda', model: 'Accord', yearStart: 2018, yearEnd: 2022 }
    ],
    condition: 'NEW',
    price: 15.99,
    stock: 50,
    images: ['/products/oil-filter-1.jpg', '/products/oil-filter-2.jpg'],
    specifications: {
      'Brand': 'Bosch',
      'Part Number': 'BF-3300',
      'Material': 'Steel/Filter Paper',
      'Dimensions': '3.5 x 3.5 x 3.8 inches'
    },
    rating: 4.8,
    reviews: [],
    createdAt: new Date('2025-03-15'),
    updatedAt: new Date('2025-03-15')
  },
  {
    id: '2',
    sellerId: 'seller1',
    name: 'AC Delco Brake Pads',
    description: 'Front ceramic brake pads for improved stopping power and reduced noise.',
    category: 'Brakes',
    compatibleVehicles: [
      { make: 'Chevrolet', model: 'Cruze', yearStart: 2016, yearEnd: 2022 },
      { make: 'Chevrolet', model: 'Malibu', yearStart: 2016, yearEnd: 2021 },
      { make: 'Buick', model: 'Regal', yearStart: 2017, yearEnd: 2020 }
    ],
    condition: 'NEW',
    price: 45.99,
    stock: 30,
    images: ['/products/brake-pads-1.jpg', '/products/brake-pads-2.jpg'],
    specifications: {
      'Brand': 'AC Delco',
      'Part Number': 'ACD-BP-5500',
      'Material': 'Ceramic',
      'Position': 'Front'
    },
    rating: 4.5,
    reviews: [],
    createdAt: new Date('2025-03-20'),
    updatedAt: new Date('2025-03-20')
  },
  {
    id: '3',
    sellerId: 'seller2',
    name: 'Refurbished Alternator',
    description: 'Professionally refurbished alternator for Ford F-150 trucks.',
    category: 'Electrical',
    compatibleVehicles: [
      { make: 'Ford', model: 'F-150', yearStart: 2015, yearEnd: 2020 }
    ],
    condition: 'REFURBISHED',
    price: 179.99,
    discountPrice: 159.99,
    stock: 10,
    images: ['/products/alternator-1.jpg', '/products/alternator-2.jpg'],
    specifications: {
      'Brand': 'Denso',
      'Part Number': 'ALT-4400-R',
      'Output': '120 Amp',
      'Warranty': '1 Year'
    },
    rating: 4.2,
    reviews: [],
    createdAt: new Date('2025-04-05'),
    updatedAt: new Date('2025-04-05')
  }
];

export async function GET(request: NextRequest) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const sellerId = searchParams.get('sellerId');
  const category = searchParams.get('category');
  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : null;
  const condition = searchParams.get('condition');
  
  let filteredProducts = [...products];
  
  // Apply filters if provided
  if (sellerId) {
    filteredProducts = filteredProducts.filter(product => product.sellerId === sellerId);
  }
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (condition) {
    filteredProducts = filteredProducts.filter(product => 
      product.condition === condition.toUpperCase()
    );
  }
  
  // Filter by compatible vehicle
  if (make) {
    filteredProducts = filteredProducts.filter(product => 
      product.compatibleVehicles.some(vehicle => 
        vehicle.make.toLowerCase() === make.toLowerCase()
      )
    );
    
    // Further filter by model if provided
    if (model) {
      filteredProducts = filteredProducts.filter(product => 
        product.compatibleVehicles.some(vehicle => 
          vehicle.make.toLowerCase() === make.toLowerCase() &&
          vehicle.model?.toLowerCase() === model.toLowerCase()
        )
      );
    }
    
    // Further filter by year if provided
    if (year) {
      filteredProducts = filteredProducts.filter(product => 
        product.compatibleVehicles.some(vehicle => 
          vehicle.make.toLowerCase() === make.toLowerCase() &&
          (!model || vehicle.model?.toLowerCase() === model.toLowerCase()) &&
          (!vehicle.yearStart || year >= vehicle.yearStart) &&
          (!vehicle.yearEnd || year <= vehicle.yearEnd)
        )
      );
    }
  }
  
  return NextResponse.json({ products: filteredProducts });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sellerId, name, description, category, compatibleVehicles, condition, price, stock, images } = body;
    
    // Validation
    if (!sellerId || !name || !description || !category || !compatibleVehicles || !condition || !price || !stock || !images) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate condition
    const validConditions = ['NEW', 'USED', 'REFURBISHED'];
    if (!validConditions.includes(condition)) {
      return NextResponse.json(
        { error: 'Invalid condition. Must be one of: NEW, USED, REFURBISHED' },
        { status: 400 }
      );
    }
    
    // Create new product
    const newProduct: Product = {
      id: `${products.length + 1}`, // In a real app, use a UUID generator
      sellerId,
      name,
      description,
      category,
      compatibleVehicles,
      condition: condition as 'NEW' | 'USED' | 'REFURBISHED',
      price,
      stock,
      images,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...body // Spread the rest of the optional fields
    };
    
    products.push(newProduct);
    
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
