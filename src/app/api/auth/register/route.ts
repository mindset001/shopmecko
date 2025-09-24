import { NextRequest, NextResponse } from 'next/server';
import { User, UserRole } from '@/types/models';

// Mock user database (same as in login route)
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
  // Other users would be here...
];

// Mock of password hashes - in a real application, these would be securely hashed
const passwords: Record<string, string> = {
  'john@example.com': 'password123',
  'sarah@example.com': 'password123',
  'mike@autorepair.com': 'password123',
  'sales@autopartsplus.com': 'password123'
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phoneNumber, role, location } = await request.json();
    
    // Validation
    if (!name || !email || !password || !phoneNumber || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate role
    const validRoles: UserRole[] = ['VEHICLE_OWNER', 'REPAIRER', 'SELLER'];
    if (!validRoles.includes(role as UserRole)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be one of: VEHICLE_OWNER, REPAIRER, SELLER' },
        { status: 400 }
      );
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }
    
    // Create new user
    const newUser: User = {
      id: `user${users.length + 1}`, // In a real app, use a UUID generator
      name,
      email,
      phoneNumber,
      role: role as UserRole,
      location,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Save user to database (mock)
    users.push(newUser);
    
    // Save password (mock) - In a real app, this would be hashed
    passwords[email] = password;
    
    // Return user data without sensitive information
    const { id, name: userName, email: userEmail, role: userRole } = newUser;
    const userData = { id, name: userName, email: userEmail, role: userRole };
    
    return NextResponse.json({
      message: 'Registration successful',
      user: userData
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
