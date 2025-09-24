'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import ProductCatalog from "@/components/seller/product-catalog";
import OrderManagement from "@/components/seller/order-management";
import StoreProfile from "@/components/seller/store-profile";
import InventoryManagement from "@/components/seller/inventory-management";
import DashboardHeader from "@/components/ui/dashboard-header";

export default function SellerDashboard() {
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
      } else if (userRole && userRole !== 'SELLER') {
        console.log("Not a seller, redirecting to appropriate dashboard");
        if (userRole === 'VEHICLE_OWNER') {
          router.push('/dashboard'); // Vehicle owner dashboard
        } else if (userRole === 'REPAIRER') {
          router.push('/repairer/dashboard'); // Repairer dashboard
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
      <DashboardHeader userType="seller" userName={user?.name || 'Store Owner'} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your products, inventory, and store profile all in one place.
            </p>
          </div>
        <div className="mt-4 md:mt-0">
          {user && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="font-medium text-blue-800 dark:text-blue-300">
                Welcome, {user.name}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {user?.name || "Parts Seller"}
              </p>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="products" className="mt-6">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="store">Store Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="border rounded-lg p-6 dark:border-gray-700">
          <ProductCatalog />
        </TabsContent>

        <TabsContent value="inventory" className="border rounded-lg p-6 dark:border-gray-700">
          <InventoryManagement />
        </TabsContent>

        <TabsContent value="orders" className="border rounded-lg p-6 dark:border-gray-700">
          <OrderManagement />
        </TabsContent>
        
        <TabsContent value="store" className="border rounded-lg p-6 dark:border-gray-700">
          <StoreProfile />
        </TabsContent>
      </Tabs>
    </main>
    </>
  );
}
