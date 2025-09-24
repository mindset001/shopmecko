'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'VEHICLE_OWNER' as UserRole,
    address: '',
    city: '',
    state: '',
    country: '',
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const { register, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user types in fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
    if (name === 'email') {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Basic validation
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    try {
      await register({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        role: formData.role,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: '' // Add a default empty value for postalCode
        }
      });
      
      // Redirect to login page after successful registration with a success message
      router.push('/login?registered=true');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-700/30 via-blue-600/20 to-blue-500/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue elements */}
        <div className="absolute top-[15%] right-[25%] w-72 h-72 rounded-full bg-shopmeco-blue/15 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-[20%] w-96 h-96 rounded-full bg-shopmeco-blue/10 animate-float"></div>
        <div className="absolute top-1/2 right-[15%] w-64 h-64 rounded-full bg-blue-600/10 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        
        {/* Yellow accent elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-shopmeco-yellow/20 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-shopmeco-yellow/15 animate-pulse-slow" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-[15%] left-[15%] w-24 h-24 rounded-full bg-shopmeco-yellow/10 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Card glassmorphic className="w-full max-w-2xl relative overflow-hidden z-10 border-shopmeco-blue/30 shadow-lg shadow-blue-500/20">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 animate-shimmer opacity-50 pointer-events-none"></div>
        
        {/* Yellow accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-shopmeco-yellow/80 via-shopmeco-yellow/40 to-transparent"></div>
        
        <CardHeader className="space-y-4">
          <div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-shopmeco-blue via-blue-400 to-shopmeco-blue text-transparent bg-clip-text animate-gradient">
              Create an Account
            </CardTitle>
            <div className="h-0.5 w-32 bg-shopmeco-yellow/40 mx-auto mt-2"></div>
          </div>
          <div className="flex items-center justify-center">
            <span className="h-0.5 w-8 bg-shopmeco-blue/60 rounded-full mr-2"></span>
            <CardDescription className="text-center text-white/90 font-medium">
              Join ShopMeco to connect with vehicle owners, repairers, and part sellers
            </CardDescription>
            <span className="h-0.5 w-8 bg-shopmeco-blue/60 rounded-full ml-2"></span>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-white px-4 py-3 rounded-md relative">
                <div className="flex items-center">
                  <div className="mr-3 text-shopmeco-yellow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <span className="block sm:inline font-medium">{error}</span>
                </div>
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
            
            {/* Account Type Selection */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-white" htmlFor="role">
                <span className="h-3 w-3 rounded-full bg-shopmeco-yellow mr-2"></span>
                Account Type
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-shopmeco-blue/30 bg-white/10 backdrop-blur-sm pl-10 px-3 py-2 text-sm text-white focus:border-shopmeco-blue/50 focus:bg-white/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-shopmeco-blue/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="VEHICLE_OWNER" className="bg-gray-800">Vehicle Owner</option>
                  <option value="REPAIRER" className="bg-gray-800">Repair Service Provider</option>
                  <option value="SELLER" className="bg-gray-800">Spare Parts Seller</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-yellow/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="name">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-blue mr-2"></span>
                  {formData.role === 'VEHICLE_OWNER' ? 'Full Name' : 'Business Name'}
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    placeholder={formData.role === 'VEHICLE_OWNER' ? "John Smith" : "Your Business Name"}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    glassmorphic
                    className="text-white pl-10 border-shopmeco-blue/30 focus:border-shopmeco-blue/50"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-blue/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="phoneNumber">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-blue mr-2"></span>
                  Phone Number
                </label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="e.g. 555-123-4567"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    glassmorphic
                    className="text-white pl-10 border-shopmeco-blue/30 focus:border-shopmeco-blue/50"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-blue/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="email">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-blue mr-2"></span>
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
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
                {emailError && (
                  <div className="text-sm text-red-400 mt-1 pl-5 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {emailError}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="address">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-blue mr-2"></span>
                  Address
                </label>
                <div className="relative">
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    glassmorphic
                    className="text-white pl-10 border-shopmeco-blue/30 focus:border-shopmeco-blue/50"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-blue/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="city">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-yellow mr-2"></span>
                  City
                </label>
                <div className="relative">
                  <Input
                    id="city"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    glassmorphic
                    className="text-white pl-10 border-shopmeco-yellow/30 focus:border-shopmeco-yellow/50"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-yellow/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="state">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-yellow mr-2"></span>
                  State
                </label>
                <div className="relative">
                  <Input
                    id="state"
                    name="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    glassmorphic
                    className="text-white pl-10 border-shopmeco-yellow/30 focus:border-shopmeco-yellow/50"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-yellow/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="country">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-yellow mr-2"></span>
                  Country
                </label>
                <div className="relative">
                  <Input
                    id="country"
                    name="country"
                    placeholder="USA"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    glassmorphic
                    className="text-white pl-10 border-shopmeco-yellow/30 focus:border-shopmeco-yellow/50"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-yellow/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Password Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="password">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-blue mr-2"></span>
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
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
              
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-white" htmlFor="confirmPassword">
                  <span className="h-3 w-3 rounded-full bg-shopmeco-blue mr-2"></span>
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    glassmorphic
                    className="text-white pl-10 border-shopmeco-blue/30 focus:border-shopmeco-blue/50"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-shopmeco-blue/70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {passwordError && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-white px-4 py-3 rounded-md animate-pulse-slow">
                <div className="flex items-center">
                  <div className="mr-3 text-shopmeco-yellow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <span className="font-medium">{passwordError}</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-shopmeco-blue to-blue-500 hover:opacity-90 text-white font-medium relative overflow-hidden group" 
              type="submit" 
              disabled={isLoading}
              glassmorphic
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? 'Creating Account...' : 'Create Account'}
                {!isLoading && 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                }
              </span>
              <span className="absolute inset-0 w-0 bg-shopmeco-yellow/30 group-hover:w-full transition-all duration-300"></span>
            </Button>
            
            <div className="flex items-center justify-center space-x-2 my-1">
              <span className="h-px w-16 bg-white/20"></span>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                <span className="text-white/60 text-xs font-medium">OR</span>
              </div>
              <span className="h-px w-16 bg-white/20"></span>
            </div>
            
            <div className="text-center text-sm text-white font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-shopmeco-yellow hover:text-yellow-300 transition-colors">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
