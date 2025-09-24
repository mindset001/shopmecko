'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import ServiceManagement from "@/components/repairer/service-management";
import AppointmentScheduler from "@/components/repairer/appointment-scheduler";
import WorkshopProfile from "@/components/repairer/workshop-profile";
import ServiceQuotes from "@/components/repairer/service-quotes";
import DashboardHeader from "@/components/ui/dashboard-header";

export default function RepairerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      } else if (userRole && userRole !== 'REPAIRER') {
        console.log("Not a repairer, redirecting to appropriate dashboard");
        if (userRole === 'VEHICLE_OWNER') {
          router.push('/dashboard'); // Vehicle owner dashboard
        } else {
          router.push('/'); // Default homepage
        }
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </main>
    );
  }
  
  return (
    <>
      <DashboardHeader userType="repairer" userName={user?.name || 'Workshop'} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Repairer Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your services, appointments, and workshop profile all in one place.
            </p>
          </div>
        <div className="mt-4 md:mt-0">
          {user && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="font-medium text-blue-800 dark:text-blue-300">
                Welcome, {user.name}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {user.email || "Workshop Manager"}
              </p>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="services" className="mt-6">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="quotes">Service Quotes</TabsTrigger>
          <TabsTrigger value="profile">Workshop Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="border rounded-lg p-6 dark:border-gray-700">
          <ServiceManagement />
        </TabsContent>

        <TabsContent value="appointments" className="border rounded-lg p-6 dark:border-gray-700">
          <AppointmentScheduler />
        </TabsContent>

        <TabsContent value="quotes" className="border rounded-lg p-6 dark:border-gray-700">
          <ServiceQuotes />
        </TabsContent>
        
        <TabsContent value="profile" className="border rounded-lg p-6 dark:border-gray-700">
          <WorkshopProfile />
        </TabsContent>
      </Tabs>
    </main>
    </>
  );
}
