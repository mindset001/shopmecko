'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vehicle, MaintenanceRecord } from "@/types/models";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VehiclesList from "@/components/vehicle-owner/vehicles-list";
import MaintenanceHistory from "@/components/vehicle-owner/maintenance-history";
import { useAuth } from "@/context/AuthContext";
import ServiceRequests from "@/components/vehicle-owner/service-requests";
import FindMechanics from "@/components/vehicle-owner/find-mechanics";
import ServiceRequestForm from "@/components/vehicle-owner/service-request-form";

export default function VehicleOwnerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isServiceRequestModalOpen, setIsServiceRequestModalOpen] = useState(false);
  const [selectedRepairerId, setSelectedRepairerId] = useState('');
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    registrationNumber: '',
    vin: '',
    color: '',
    fuelType: '',
    engineSize: '',
    transmissionType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check authentication status
    console.log("Dashboard - Auth check - User:", user);
    
    const checkAuth = async () => {
      // Give a small delay to ensure auth context is fully loaded
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get token from localStorage if needed
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('shopmeco_token') : null;
      
      // Check if we're authenticated via the context
      const isAuthenticated = !!user && !!storedToken;
      const userRole = user?.role || '';
      
      // If not authenticated via context, let the middleware handle the redirect
      
      console.log("IsAuthenticated:", isAuthenticated);
      console.log("UserRole:", userRole);
      
      if (!isAuthenticated) {
        // We'll rely on the middleware to handle the redirection
        console.log("Authentication pending, middleware will handle redirection if needed");
      } else if (userRole && userRole !== 'VEHICLE_OWNER') {
        console.log("Not a vehicle owner, redirecting to appropriate dashboard");
        // In a real app, you might redirect to different dashboards based on role
        router.push('/');
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Listen for custom events
    const handleAddVehicleEvent = () => {
      setIsAddVehicleModalOpen(true);
    };
    
    const handleRequestServiceEvent = (event: CustomEvent) => {
      if (event.detail && event.detail.repairerId) {
        setSelectedRepairerId(event.detail.repairerId);
        setIsServiceRequestModalOpen(true);
      }
    };
    
    // Fetch vehicles for service requests
    const fetchVehicles = async () => {
      try {
        // In a real app, this would be an API call
        // For demo, we'll use mock data
        const mockVehicles = [
          {
            id: 'v1',
            ownerId: 'owner1',
            make: 'Toyota',
            model: 'Camry',
            year: 2019,
            registrationNumber: 'ABC123',
            color: 'Silver',
            fuelType: 'Gasoline',
            engineSize: '2.5L',
            transmissionType: 'Automatic',
            maintenanceHistory: [],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 'v2',
            ownerId: 'owner1',
            make: 'Honda',
            model: 'Civic',
            year: 2020,
            registrationNumber: 'XYZ789',
            color: 'Blue',
            fuelType: 'Gasoline',
            engineSize: '1.8L',
            transmissionType: 'Automatic',
            maintenanceHistory: [],
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        setVehicles(mockVehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    
    fetchVehicles();
    document.addEventListener('openAddVehicleModal', handleAddVehicleEvent);
    window.addEventListener('request-service', handleRequestServiceEvent as EventListener);
    
    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener('openAddVehicleModal', handleAddVehicleEvent);
      window.removeEventListener('request-service', handleRequestServiceEvent as EventListener);
    };
  }, [user, router]);
  
  const handleOpenAddVehicleModal = () => {
    setIsAddVehicleModalOpen(true);
  };
  
  const handleCloseAddVehicleModal = () => {
    setIsAddVehicleModalOpen(false);
    // Reset form data
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      registrationNumber: '',
      vin: '',
      color: '',
      fuelType: '',
      engineSize: '',
      transmissionType: ''
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send data to your backend API
      // Get token from localStorage
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('shopmeco_token') : null;
      
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add vehicle');
      }
      
      // Close the modal on success
      handleCloseAddVehicleModal();
      
      // Reload the page to show the new vehicle
      window.location.reload();
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Failed to add vehicle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
  
  // If user is not authenticated, the useEffect will redirect, so we don't need to handle it here
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Vehicle Owner Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your vehicles, maintenance, and service requests all in one place.
          </p>
          {user && <p className="text-sm text-blue-500">Welcome, {user.name}</p>}
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={handleOpenAddVehicleModal}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Vehicle
          </button>
          
          <Link 
            href="/services"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Request Service
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Tabs defaultValue="vehicles" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger value="vehicles" className="py-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              My Vehicles
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="py-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="service-requests" className="py-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Service Requests
            </TabsTrigger>
            <TabsTrigger value="find-mechanics" className="py-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Mechanics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="p-6">
            <VehiclesList />
          </TabsContent>

          <TabsContent value="maintenance" className="p-6">
            <MaintenanceHistory />
          </TabsContent>

          <TabsContent value="service-requests" className="p-6">
            <ServiceRequests />
          </TabsContent>

          <TabsContent value="find-mechanics" className="p-6">
            <FindMechanics />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Vehicle Modal */}
      <Dialog open={isAddVehicleModalOpen} onOpenChange={handleCloseAddVehicleModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Enter your vehicle details below. This information will help us provide better service recommendations.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Input 
                  id="make" 
                  name="make" 
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="e.g. Toyota" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input 
                  id="model" 
                  name="model" 
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g. Camry" 
                  required 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input 
                  id="year" 
                  name="year" 
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input 
                  id="registrationNumber" 
                  name="registrationNumber" 
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. ABC123" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vin">VIN (Vehicle Identification Number)</Label>
              <Input 
                id="vin" 
                name="vin" 
                value={formData.vin}
                onChange={handleInputChange}
                placeholder="e.g. 1HGBH41JXMN109186" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input 
                  id="color" 
                  name="color" 
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g. Silver" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select name="fuelType" value={formData.fuelType} onValueChange={(value) => handleSelectChange('fuelType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="lpg">LPG</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="engineSize">Engine Size</Label>
                <Input 
                  id="engineSize" 
                  name="engineSize" 
                  value={formData.engineSize}
                  onChange={handleInputChange}
                  placeholder="e.g. 2.0L" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transmissionType">Transmission</Label>
                <Select name="transmissionType" value={formData.transmissionType} onValueChange={(value) => handleSelectChange('transmissionType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                    <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseAddVehicleModal} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : 'Add Vehicle'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Service Request Modal */}
      <ServiceRequestForm
        open={isServiceRequestModalOpen}
        onOpenChange={setIsServiceRequestModalOpen}
        vehicles={vehicles}
        initialRepairerId={selectedRepairerId}
        onSubmit={(serviceRequest) => {
          console.log('Service request submitted:', serviceRequest);
          alert('Service request submitted successfully!');
          setIsServiceRequestModalOpen(false);
          setSelectedRepairerId('');
        }}
      />
    </main>
  );
}
