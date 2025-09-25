'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Admin components
import dynamic from 'next/dynamic';
import DashboardHeader from "@/components/ui/dashboard-header";

const UserManagement = dynamic(() => import('@/components/admin/user-management'), { 
  ssr: false,
  loading: () => <p>Loading user management...</p>
});
const RepairerManagement = dynamic(() => import('@/components/admin/repairer-management'), {
  ssr: false,
  loading: () => <p>Loading repairer management...</p>
});
const SellerManagement = dynamic(() => import('@/components/admin/seller-management'), {
  ssr: false,
  loading: () => <p>Loading seller management...</p>
});
const ServiceRequestManagement = dynamic(() => import('@/components/admin/service-request-management'), {
  ssr: false,
  loading: () => <p>Loading service request management...</p>
});
const AnalyticsDashboard = dynamic(() => import('@/components/admin/analytics-dashboard'), {
  ssr: false,
  loading: () => <p>Loading analytics dashboard...</p>
});
const SystemSettings = dynamic(() => import('@/components/admin/system-settings'), {
  ssr: false,
  loading: () => <p>Loading system settings...</p>
});

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // Using state for active tab and keeping the setter for future use
  const [, setActiveTab] = useState("overview");

  useEffect(() => {
    // Check authentication status
    console.log("Admin Dashboard - Auth check - User:", user);
    
    const checkAuth = async () => {
      // Give a small delay to ensure auth context is fully loaded
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if we're authenticated via the context
      const isAuthenticated = !!user;
      const userRole = user?.role || '';
      
      console.log("IsAuthenticated:", isAuthenticated);
      console.log("UserRole:", userRole);
      
      if (!isAuthenticated) {
        // We'll rely on the middleware to handle the redirection
        console.log("Authentication pending, middleware will handle redirection if needed");
      } else if (userRole !== 'ADMIN') {
        console.log("Not an admin, redirecting to appropriate dashboard");
        router.push('/');
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [user, router]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <div className="flex flex-col items-center" suppressHydrationWarning>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading admin dashboard...</p>
        </div>
      </main>
    );
  }
  
  return (
    <>
      <DashboardHeader userType="admin" userName={user?.name || 'Administrator'} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage users, services, and platform settings
            </p>
            {user && <p className="text-sm text-blue-500">Administrator: {user.name}</p>}
          </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Tabs defaultValue="overview" className="w-full" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger value="overview" className="py-4 px-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Overview
            </TabsTrigger>
            
            <TabsTrigger value="users" className="py-4 px-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Users
            </TabsTrigger>
            
            <TabsTrigger value="repairers" className="py-4 px-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Repairers
            </TabsTrigger>
            
            <TabsTrigger value="sellers" className="py-4 px-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Sellers
            </TabsTrigger>
            
            <TabsTrigger value="service-requests" className="py-4 px-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Service Requests
            </TabsTrigger>
            
            <TabsTrigger value="settings" className="py-4 px-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="overview">
              <AnalyticsDashboard />
            </TabsContent>
            
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
            
            <TabsContent value="repairers">
              <RepairerManagement />
            </TabsContent>
            
            <TabsContent value="sellers">
              <SellerManagement />
            </TabsContent>
            
            <TabsContent value="service-requests">
              <ServiceRequestManagement />
            </TabsContent>
            
            <TabsContent value="settings">
              <SystemSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
    </>
  );
}
