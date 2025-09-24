'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from '../dark-mode-toggle';

interface DashboardHeaderProps {
  userType: 'admin' | 'vehicle-owner' | 'repairer' | 'seller';
  userName?: string;
}

export default function DashboardHeader({ userType, userName = 'User' }: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine dashboard home based on user type
  const dashboardHome = `/${userType}/dashboard`;
  
  // Generate navigation links based on user type
  const getNavLinks = () => {
    switch (userType) {
      case 'admin':
        return [
          { name: 'Dashboard', href: '/admin/dashboard' },
          { name: 'Users', href: '/admin/users' },
          { name: 'Services', href: '/admin/services' },
          { name: 'Settings', href: '/admin/settings' },
        ];
      case 'vehicle-owner':
        return [
          { name: 'Dashboard', href: '/vehicle-owner/dashboard' },
          { name: 'My Vehicles', href: '/vehicle-owner/vehicles' },
          { name: 'Service History', href: '/vehicle-owner/history' },
          { name: 'Find Services', href: '/services' },
        ];
      case 'repairer':
        return [
          { name: 'Dashboard', href: '/repairer/dashboard' },
          { name: 'Service Requests', href: '/repairer/service-requests' },
          { name: 'Workshop Profile', href: '/repairer/profile' },
          { name: 'Calendar', href: '/repairer/calendar' },
        ];
      case 'seller':
        return [
          { name: 'Dashboard', href: '/seller/dashboard' },
          { name: 'Products', href: '/seller/products' },
          { name: 'Orders', href: '/seller/orders' },
          { name: 'Store Profile', href: '/seller/profile' },
        ];
      default:
        return [
          { name: 'Dashboard', href: dashboardHome },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">ShopMeco</span>
            </Link>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
              {userType.replace('-', ' ')} Dashboard
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side - User menu and dark mode toggle */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            
            {/* User dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {userName}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                  <Link
                    href={`/${userType}/profile`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      // Handle logout - for now just redirect to login page
                      window.location.href = '/login';
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-base font-medium ${
                    pathname === link.href
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
