'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { UserRole } from '@/types/models';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start as loading
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Check if we have a user in local storage on initial load
  useEffect(() => {
    setMounted(true);
    
    try {
      const storedUser = localStorage.getItem('shopmeco_user');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error loading auth state from localStorage:', err);
    } finally {
      setIsLoading(false);
    }

    // Check if user is still authenticated with server
    const validateSession = async () => {
      try {
        const userData = await api.auth.getCurrentUser();
        if (userData) {
          setUser(userData);
          localStorage.setItem('shopmeco_user', JSON.stringify(userData));
        } else {
          // If server says user is not authenticated, clear local data
          setUser(null);
          localStorage.removeItem('shopmeco_user');
          localStorage.removeItem('shopmeco_role');
        }
      } catch (err) {
        console.error('Error validating session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Sending login request to API...');
      const data = await api.auth.login({ email, password });
      console.log('Login API response:', data);
      
      setUser(data.user);
      
      // Store user in localStorage
      localStorage.setItem('shopmeco_user', JSON.stringify(data.user));
      if (data.user.role) {
        localStorage.setItem('shopmeco_role', data.user.role);
      }
      
      return Promise.resolve(); // Explicitly resolve the promise for success
    } catch (err: unknown) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
      return Promise.reject(err); // Explicitly reject the promise for errors
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.auth.register({
        email: userData.email,
        password: userData.password,
        fullName: userData.fullName,
        role: userData.role,
        phone: userData.phone
      });
      
      // Registration successful, but user needs to login
      setUser(null);
    } catch (err: unknown) {
      setError(err.message || 'An error occurred during registration');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('shopmeco_user');
    localStorage.removeItem('shopmeco_role');
    
    // Clear cookies by making a request to the logout API endpoint
    // This is necessary because client-side code cannot modify httpOnly cookies
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError
  };

  // Only render children when client-side mounted to prevent hydration issues
  if (!mounted) {
    return <div suppressHydrationWarning>Loading authentication...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
