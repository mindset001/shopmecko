'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  // Add a state to track client-side mounting to prevent hydration issues
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();
  const router = useRouter();
  
  // Use useEffect to indicate when client-side rendering has occurred
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form with email:', email, 'and password:', password);
    
    try {
      console.log('Attempting to login...');
      await login(email, password);
      console.log('Login successful, user:', localStorage.getItem('shopmeco_user'));
      console.log('Token:', localStorage.getItem('shopmeco_token'));
      
      // Store role in localStorage for easy access
      const userObj = JSON.parse(localStorage.getItem('shopmeco_user') || '{}');
      if (userObj && userObj.role) {
        localStorage.setItem('shopmeco_role', userObj.role);
      }
      
      // Redirect based on user role
      const userRole = userObj?.role;
      console.log('User role:', userRole);
      
      let dashboardUrl = '/dashboard'; // Default for vehicle owners
      
      if (userRole === 'REPAIRER') {
        dashboardUrl = '/repairer/dashboard';
      } else if (userRole === 'SELLER') {
        dashboardUrl = '/seller/dashboard';
      } else if (userRole === 'ADMIN') {
        dashboardUrl = '/admin';
      }
      
      console.log(`Redirecting to ${dashboardUrl} via window.location...`);
      window.location.href = dashboardUrl;
      
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  if (!isMounted) {
    // Show a simple loading state while waiting for client-side hydration
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-blue-800/30 relative overflow-hidden" suppressHydrationWarning>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue orbs */}
        <div className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-shopmeco-blue/15 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-shopmeco-blue/10 animate-float"></div>
        {/* Yellow accents */}
        <div className="absolute top-1/3 right-1/6 w-24 h-24 rounded-full bg-shopmeco-yellow/15 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-shopmeco-yellow/20 animate-float" style={{ animationDelay: '1.5s' }}></div>
        {/* Additional blue elements */}
        <div className="absolute top-2/3 left-1/5 w-48 h-48 rounded-full bg-blue-500/10 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <Card glassmorphic className="w-full max-w-md relative overflow-hidden z-10 border-shopmeco-blue/30 shadow-lg shadow-blue-500/20">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 animate-shimmer opacity-50 pointer-events-none"></div>
        
        {/* Yellow accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-shopmeco-yellow/80 via-shopmeco-yellow/40 to-transparent"></div>
        
        <CardHeader className="space-y-3">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-shopmeco-blue via-blue-400 to-shopmeco-blue text-transparent bg-clip-text animate-gradient">
            ShopMeco
          </CardTitle>
          <div className="flex items-center justify-center">
            <span className="h-0.5 w-8 bg-shopmeco-yellow/60 rounded-full mr-2"></span>
            <CardDescription className="text-center text-white/90 font-medium">
              Log in to your account to continue
            </CardDescription>
            <span className="h-0.5 w-8 bg-shopmeco-yellow/60 rounded-full ml-2"></span>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-2">
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-white px-4 py-3 rounded-md relative">
                <span className="block sm:inline font-medium">{error}</span>
                <span 
                  className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={clearError}
                >
                  <svg className="fill-current h-6 w-6 text-white/80" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                  </svg>
                </span>
              </div>
            )}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                <span className="h-3 w-3 rounded-full bg-shopmeco-blue mr-2"></span>
                Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  glassmorphic
                  className="text-white pl-10 border-shopmeco-blue/30 focus:border-shopmeco-blue/50"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-blue/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-blue mr-2"></span>
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-shopmeco-yellow hover:text-yellow-300 transition-colors font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  glassmorphic
                  className="text-white pl-10 border-shopmeco-blue/30 focus:border-shopmeco-blue/50"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-blue/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-shopmeco-blue to-blue-600 hover:opacity-90 text-white font-medium relative overflow-hidden group" 
              type="submit" 
              disabled={isLoading}
              glassmorphic
            >
              <span className="relative z-10">
                {isLoading ? 'Logging in...' : 'Sign In'}
              </span>
              <span className="absolute inset-0 w-0 bg-shopmeco-yellow/30 group-hover:w-full transition-all duration-300"></span>
            </Button>
            
            <div className="flex items-center justify-center space-x-2 my-2">
              <span className="h-px w-12 bg-white/20"></span>
              <span className="text-white/50 text-xs font-medium">OR</span>
              <span className="h-px w-12 bg-white/20"></span>
            </div>
            
            <div className="text-center text-sm text-white font-medium">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-shopmeco-yellow hover:text-yellow-300 transition-colors">
                Sign up
              </Link>
            </div>
            
            <div className="mt-4 p-4 bg-white/10 rounded-md backdrop-blur-sm">
              <p className="text-sm font-medium text-white">Demo Accounts:</p>
              <ul className="mt-2 space-y-1 text-xs text-white/80">
                <li>Vehicle Owner: john@example.com / password123</li>
                <li>Repairer: mike@autorepair.com / password123</li>
                <li>Seller: sales@autopartsplus.com / password123</li>
                <li>Admin: admin@shopmeco.com / password123</li>
              </ul>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
