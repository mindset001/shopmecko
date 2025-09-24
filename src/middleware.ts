import { NextRequest, NextResponse } from 'next/server';

// Define which paths require authentication
const authRequiredPaths = [
  '/dashboard',
  '/vehicles',
  '/service-requests',
  '/vehicle-owner/dashboard',
  '/repairer/dashboard',
  '/workshop',
  '/seller/dashboard',
  '/store',
  '/orders',
  '/profile',
  '/admin',
];

// Define role-specific paths
const roleSpecificPaths = {
  VEHICLE_OWNER: ['/dashboard', '/vehicle-owner/dashboard', '/vehicles', '/service-requests'],
  REPAIRER: ['/repairer/dashboard', '/workshop', '/service-quotes'],
  SELLER: ['/seller/dashboard', '/store', '/products', '/orders'],
  ADMIN: ['/admin'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if path requires authentication
  const requiresAuth = authRequiredPaths.some(path => pathname.startsWith(path));
  
  if (requiresAuth) {
    // Check for authentication token
    const token = request.cookies.get('shopmeco_token')?.value;
    
    if (!token) {
      // Redirect to login page if no token found
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // In a real app, you would verify the token's validity here
    // For demo purposes, we'll assume the token is valid
    
    // Check for role-specific access
    // This is just a placeholder - in a real app, you'd decode the JWT to get the user role
    const userRole = request.cookies.get('shopmeco_role')?.value;
    
    if (userRole) {
      // Redirect to appropriate dashboard if user visits the root dashboard path
      if (pathname === '/dashboard') {
        if (userRole === 'REPAIRER') {
          return NextResponse.redirect(new URL('/repairer/dashboard', request.url));
        } else if (userRole === 'SELLER') {
          return NextResponse.redirect(new URL('/seller/dashboard', request.url));
        } else if (userRole === 'VEHICLE_OWNER') {
          return NextResponse.redirect(new URL('/vehicle-owner/dashboard', request.url));
        } else if (userRole === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
        // For other roles, you could add additional redirections here
      }
      
      // Check if the path is role-specific and the user doesn't have access
      const isRoleSpecificPath = Object.values(roleSpecificPaths).some(paths => 
        paths.some(path => pathname.startsWith(path))
      );
      
      if (isRoleSpecificPath) {
        // Check if user has access to this path
        const hasAccess = roleSpecificPaths[userRole as keyof typeof roleSpecificPaths]?.some(path => 
          pathname.startsWith(path)
        );
        
        if (!hasAccess) {
          // Redirect to appropriate dashboard based on role
          if (userRole === 'VEHICLE_OWNER') {
            return NextResponse.redirect(new URL('/vehicle-owner/dashboard', request.url));
          } else if (userRole === 'REPAIRER') {
            return NextResponse.redirect(new URL('/repairer/dashboard', request.url));
          } else if (userRole === 'SELLER') {
            return NextResponse.redirect(new URL('/seller/dashboard', request.url));
          } else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin', request.url));
          } else {
            // Default for now
            return NextResponse.redirect(new URL('/', request.url));
          }
        }
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - public folder files
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
