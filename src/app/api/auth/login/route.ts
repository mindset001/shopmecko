import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/models';

// Mock user database
const users: User[] = [
  {
    id: 'user1',
    name: 'John Smith',
    email: 'john@example.com',
    phoneNumber: '555-123-4567',
    role: 'VEHICLE_OWNER',
    avatar: '/avatars/john.jpg',
    location: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10')
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phoneNumber: '555-987-6543',
    role: 'VEHICLE_OWNER',
    location: {
      address: '456 Oak Ave',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
    },
    createdAt: new Date('2025-02-15'),
    updatedAt: new Date('2025-02-15')
  },
  {
    id: 'repairer1',
    name: 'Mike\'s Auto Repair',
    email: 'mike@autorepair.com',
    phoneNumber: '555-234-5678',
    role: 'REPAIRER',
    avatar: '/avatars/mike.jpg',
    location: {
      address: '789 Mechanic St',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: 'seller1',
    name: 'AutoParts Plus',
    email: 'sales@autopartsplus.com',
    phoneNumber: '555-345-6789',
    role: 'SELLER',
    avatar: '/avatars/autoparts.jpg',
    location: {
      address: '101 Parts Blvd',
      city: 'Detroit',
      state: 'MI',
      country: 'USA',
    },
    createdAt: new Date('2025-03-05'),
    updatedAt: new Date('2025-03-05')
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@shopmeco.com',
    phoneNumber: '555-789-0123',
    role: 'ADMIN',
    avatar: '/avatars/admin.jpg',
    location: {
      address: '999 Admin Rd',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
    },
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
];

// Mock of password hashes - in a real application, these would be securely hashed
// These are simulating bcrypt hashes (in actual implementation, we would use bcrypt.compare)
const passwords = {
  'john@example.com': { hash: '$2a$10$AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQr', salt: 'AbCdEfGhIj' },
  'sarah@example.com': { hash: '$2a$10$KlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzA', salt: 'KlMnOpQrSt' },
  'mike@autorepair.com': { hash: '$2a$10$StUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGh', salt: 'StUvWxYzAb' },
  'sales@autopartsplus.com': { hash: '$2a$10$EfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrS', salt: 'EfGhIjKlMn' },
  'admin@shopmeco.com': { hash: '$2a$10$ZyXaAdMiNoPqRsTuVwXyZaBcDeFgHijKlMnOpQrStUv', salt: 'ZyXaAdMiNo' }
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = users.find(u => u.email === email);
    
    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check password - in a real app, this would use bcrypt.compare
    // For demo purposes, we're simulating secure password comparison
    // and allowing any password that's "password123" to work
    if (password !== "password123") {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // In a real application, you would generate a JWT token here
    // For simplicity, we'll just return the user data (minus sensitive info)
    const { id, name, email: userEmail, role, avatar } = user;
    const userData = { id, name, email: userEmail, role, avatar };
    
    const token = 'mock-jwt-token'; // This would be a real JWT in production
    
    // Create the response
    const response = NextResponse.json({
      message: 'Login successful',
      user: userData,
      token: token
    });
    
    // Set cookies for use by middleware
    response.cookies.set('shopmeco_token', token, { 
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });
    
    response.cookies.set('shopmeco_role', role, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
