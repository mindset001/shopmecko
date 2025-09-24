import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { IUser } from '@/models/User';

// JWT Secret key - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Interface for JWT payload
interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Authentication middleware for API routes
 * 
 * Verifies the JWT token and attaches the user to the request
 * 
 * @param handler - The API route handler
 * @param requiresAuth - Whether authentication is required
 * @param allowedRoles - Array of allowed roles (optional)
 * @returns The handler with authentication
 */
export function withAuth(
  handler: (req: NextRequest, user?: JwtPayload) => Promise<NextResponse>,
  { requiresAuth = true, allowedRoles = [] }: { requiresAuth?: boolean; allowedRoles?: string[] } = {}
) {
  return async (req: NextRequest) => {
    try {
      // Get token from cookies
      const token = req.cookies.get('token')?.value;
      
      // If token is required but not present, return unauthorized
      if (requiresAuth && !token) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      // If token is not required and not present, proceed
      if (!requiresAuth && !token) {
        return handler(req);
      }

      // Verify token
      let decodedToken: JwtPayload;
      try {
        decodedToken = jwt.verify(token as string, JWT_SECRET) as JwtPayload;
      } catch (error: unknown) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Check if user role is allowed (if roles are specified)
      if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.role)) {
        return NextResponse.json(
          { error: 'Unauthorized access: insufficient permissions' },
          { status: 403 }
        );
      }

      // Call handler with user data
      return handler(req, decodedToken);
    } catch (error: unknown) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Generate JWT token for user
 * @param user - User document
 * @returns JWT token
 */
export function generateToken(user: IUser): string {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Set auth cookies in the response
 * @param res - NextResponse object
 * @param token - JWT token
 * @param role - User role
 * @returns Response with cookies
 */
export function setAuthCookies(res: NextResponse, token: string, role: string): NextResponse {
  // Set httpOnly cookie for the token (can't be accessed by JavaScript)
  res.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
  
  // Set non-httpOnly cookie for the role (can be accessed by JavaScript)
  res.cookies.set({
    name: 'role',
    value: role,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
  
  return res;
}

/**
 * Clear auth cookies in the response
 * @param res - NextResponse object
 * @returns Response with cleared cookies
 */
export function clearAuthCookies(res: NextResponse): NextResponse {
  res.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  
  res.cookies.set({
    name: 'role',
    value: '',
    httpOnly: false,
    expires: new Date(0),
    path: '/',
  });
  
  return res;
}
