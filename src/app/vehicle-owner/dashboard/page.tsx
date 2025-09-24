'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import VehiclesList from "../../../components/vehicle-owner/vehicles-list";
import MaintenanceHistory from "../../../components/vehicle-owner/maintenance-history";
import ServiceRequests from "../../../components/vehicle-owner/service-requests";
import FindMechanics from "../../../components/vehicle-owner/find-mechanics";
import ServiceRequestForm from "../../../components/vehicle-owner/service-request-form";
import { useAuth } from "../../../context/AuthContext";
import DashboardHeader from "../../../components/ui/dashboard-header";
import { api } from "@/lib/api-client";

export default function VehicleOwnerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isServiceRequestModalOpen, setIsServiceRequestModalOpen] = useState(false);
  const [selectedRepairerId, setSelectedRepairerId] = useState('');
  const [activeTab, setActiveTab] = useState("vehicles");
  
  interface Vehicle {
    id: string;
    ownerId: string;
    make: string;
    model: string;
    year: number;
    registrationNumber: string;
    vin?: string;
    color: string;
    fuelType: string;
    engineSize: string;
    transmissionType: string;
    maintenanceHistory: any[];
    createdAt: Date;
    updatedAt: Date;
  }
  
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      // Give a small delay to ensure auth context is fully loaded
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if we're authenticated via the context
      const isAuthenticated = !!user;
      const userRole = user?.role || '';
      
      if (!isAuthenticated) {
        // We'll rely on the middleware to handle the redirection
        console.log("Authentication pending, middleware will handle redirection if needed");
      } else if (userRole && userRole !== 'VEHICLE_OWNER') {
        console.log("Not a vehicle owner, redirecting to appropriate dashboard");
        // Redirect based on role
        switch(userRole) {
          case 'ADMIN':
            router.push('/admin');
            break;
          case 'REPAIRER':
            router.push('/repairer/dashboard');
            break;
          case 'SELLER':
            router.push('/seller/dashboard');
            break;
          default:
            router.push('/');
        }
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
    
    // Add event listeners
    document.addEventListener('openAddVehicleModal', handleAddVehicleEvent);
    document.addEventListener('requestService', handleRequestServiceEvent as EventListener);
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('openAddVehicleModal', handleAddVehicleEvent);
      document.removeEventListener('requestService', handleRequestServiceEvent as EventListener);
    };
  }, [user, router]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for adding a vehicle
  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Use the API client to create a new vehicle
      const result = await api.vehicles.createVehicle({
        ...formData,
        year: parseInt(formData.year.toString())
      });

      // Close the modal and refresh vehicles list
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

      // Trigger a refresh of the vehicles list
      // In a real app, you'd update the state with the new vehicle
      // or refetch the vehicles list
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'An error occurred while adding the vehicle');
      console.error('Error adding vehicle:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader userType="vehicle-owner" userName={user?.name || 'Vehicle Owner'} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Vehicle Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
            <TabsTrigger value="service-requests">Service Requests</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
            <TabsTrigger value="find-mechanics">Find Mechanics</TabsTrigger>
          </TabsList>
        
        <TabsContent value="vehicles" className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Vehicles</h2>
            <Button onClick={() => setIsAddVehicleModalOpen(true)}>
              Add New Vehicle
            </Button>
          </div>
          <VehiclesList />
        </TabsContent>
        
        <TabsContent value="service-requests" className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Service Requests</h2>
            <Button onClick={() => setIsServiceRequestModalOpen(true)}>
              New Service Request
            </Button>
          </div>
          <ServiceRequests />
        </TabsContent>
        
        <TabsContent value="maintenance" className="p-4 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Maintenance History</h2>
          <MaintenanceHistory />
        </TabsContent>
        
        <TabsContent value="find-mechanics" className="p-4 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Find Mechanics</h2>
          <FindMechanics />
        </TabsContent>
      </Tabs>
      
      {/* Add Vehicle Modal */}
      <Dialog open={isAddVehicleModalOpen} onOpenChange={setIsAddVehicleModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Enter your vehicle details below. All required fields are marked with an asterisk (*).
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddVehicle}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-1">
                <Label htmlFor="make" className="mb-2">Make *</Label>
                <Input
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="model" className="mb-2">Model *</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="year" className="mb-2">Year *</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="registrationNumber" className="mb-2">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="vin" className="mb-2">VIN (Vehicle Identification Number)</Label>
                <Input
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="color" className="mb-2">Color</Label>
                <Input
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="fuelType" className="mb-2">Fuel Type</Label>
                <Select 
                  value={formData.fuelType} 
                  onValueChange={(value) => handleSelectChange('fuelType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="lpg">LPG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="engineSize" className="mb-2">Engine Size</Label>
                <Input
                  id="engineSize"
                  name="engineSize"
                  value={formData.engineSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 2.0L, 1500cc"
                />
              </div>
              
              <div className="col-span-1">
                <Label htmlFor="transmissionType" className="mb-2">Transmission Type</Label>
                <Select 
                  value={formData.transmissionType} 
                  onValueChange={(value) => handleSelectChange('transmissionType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddVehicleModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Vehicle'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Service Request Modal */}
      <Dialog open={isServiceRequestModalOpen} onOpenChange={setIsServiceRequestModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Service Request</DialogTitle>
            <DialogDescription>
              Fill in the details about your service request.
            </DialogDescription>
          </DialogHeader>
          
          <ServiceRequestForm 
            open={isServiceRequestModalOpen}
            onOpenChange={setIsServiceRequestModalOpen}
            vehicles={vehicles}
            initialRepairerId={selectedRepairerId}
            onSubmit={(serviceRequest) => {
              // Handle service request submission
              console.log('Service request submitted:', serviceRequest);
              setIsServiceRequestModalOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}
