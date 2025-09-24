'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Repairer, Vehicle, ServiceRequest } from '@/types/models';

// Mock data for repairers - in a real app, this would come from an API
const mockRepairers: Repairer[] = [
  {
    id: '1',
    name: 'Premier Auto Repair',
    email: 'contact@premierauto.com',
    phoneNumber: '(555) 123-4567',
    role: 'REPAIRER',
    businessName: 'Premier Auto Repair',
    businessDescription: 'Full-service auto repair shop specializing in domestic and import vehicles.',
    specializations: ['General Repairs', 'Engine Diagnostics', 'Brake Service', 'Electrical Systems'],
    rating: 4.8,
    completedJobs: 523,
    services: [],
    reviews: [],
    createdAt: new Date('2022-06-15'),
    updatedAt: new Date('2023-03-20')
  },
  {
    id: '2',
    name: 'Elite Auto Care',
    email: 'service@eliteauto.com',
    phoneNumber: '(555) 987-6543',
    role: 'REPAIRER',
    businessName: 'Elite Auto Care',
    businessDescription: 'Luxury vehicle specialists with certified technicians for European and high-end automobiles.',
    specializations: ['Luxury Vehicles', 'Performance Tuning', 'Computerized Diagnostics'],
    rating: 4.9,
    completedJobs: 341,
    services: [],
    reviews: [],
    createdAt: new Date('2022-09-10'),
    updatedAt: new Date('2023-02-15')
  },
  {
    id: '3',
    name: 'Quick Fix Auto',
    email: 'support@quickfixauto.com',
    phoneNumber: '(555) 456-7890',
    role: 'REPAIRER',
    businessName: 'Quick Fix Auto',
    businessDescription: 'Fast and affordable repairs for all vehicle types. Specializing in same-day service.',
    specializations: ['Quick Repairs', 'Tire Service', 'Battery Replacement', 'Minor Maintenance'],
    rating: 4.6,
    completedJobs: 789,
    services: [],
    reviews: [],
    createdAt: new Date('2022-05-20'),
    updatedAt: new Date('2023-04-10')
  }
];

interface ServiceRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicles: Vehicle[];
  onSubmit: (serviceRequest: Partial<ServiceRequest>) => void;
  initialRepairerId?: string; // Optional repairer ID to pre-select
}

export default function ServiceRequestForm({ 
  open, 
  onOpenChange, 
  vehicles, 
  onSubmit,
  initialRepairerId
}: ServiceRequestFormProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY'>('MEDIUM');
  const [selectedRepairerId, setSelectedRepairerId] = useState<string>(initialRepairerId || '');
  const [budget, setBudget] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repairers, setRepairers] = useState<Repairer[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('');

  // Fetch repairers data
  useEffect(() => {
    // In a real app, this would be an API call
    setRepairers(mockRepairers);
    
    // If a repairer ID was passed in, make sure it's selected
    if (initialRepairerId) {
      setSelectedRepairerId(initialRepairerId);
    }
  }, [initialRepairerId]);

  // Get unique specializations from all repairers
  const allSpecializations = Array.from(
    new Set(
      repairers.flatMap(repairer => 
        repairer.specializations
      )
    )
  ).sort();

  // Filter repairers based on search and specialty
  const filteredRepairers = repairers.filter(repairer => {
    const matchesSearch = searchQuery === '' || 
      repairer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repairer.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      repairer.businessDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === '' || 
      repairer.specializations.includes(specialtyFilter);
    
    return matchesSearch && matchesSpecialty;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceRequest: Partial<ServiceRequest> = {
      vehicleId: selectedVehicleId,
      serviceType,
      description,
      urgency,
      repairerId: selectedRepairerId, // Added repairer ID to the service request
      budget: budget ? parseFloat(budget) : undefined,
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
      status: 'PENDING',
    };

    // Simulate API call delay
    setTimeout(() => {
      onSubmit(serviceRequest);
      resetForm();
      setIsLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  const resetForm = () => {
    setSelectedVehicleId('');
    setServiceType('');
    setDescription('');
    setUrgency('MEDIUM');
    setSelectedRepairerId('');
    setBudget('');
    setPreferredDate('');
    setSearchQuery('');
    setSpecialtyFilter('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Request a New Service</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Vehicle Selection */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vehicle" className="text-right">
                Vehicle
              </Label>
              <select
                id="vehicle"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.registrationNumber}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serviceType" className="text-right">
                Service Type
              </Label>
              <input
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g., Oil Change, Brake Repair, Diagnostics"
                required
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Describe the issue or service needed"
                required
              />
            </div>

            {/* Urgency */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="urgency" className="text-right">
                Urgency
              </Label>
              <select
                id="urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="LOW">Low - Not urgent</option>
                <option value="MEDIUM">Medium - Within a week</option>
                <option value="HIGH">High - Within 48 hours</option>
                <option value="EMERGENCY">Emergency - As soon as possible</option>
              </select>
            </div>

            {/* Budget */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budget" className="text-right">
                Budget (Optional)
              </Label>
              <input
                id="budget"
                type="number"
                min="0"
                step="0.01"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Your budget for this service"
              />
            </div>

            {/* Preferred Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preferredDate" className="text-right">
                Preferred Date
              </Label>
              <input
                id="preferredDate"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Repairer Selection Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
              <h3 className="font-medium mb-4">Select a Repairer</h3>
              
              {/* Repairer Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search repairers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 pl-8 pr-3 text-sm"
                  />
                  <svg className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="flex-shrink-0 sm:w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-sm"
                >
                  <option value="">All Specialties</option>
                  {allSpecializations.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
              
              {/* Repairers List */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto p-1">
                {filteredRepairers.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No repairers found matching your criteria.
                  </div>
                ) : (
                  filteredRepairers.map((repairer) => (
                    <div 
                      key={repairer.id}
                      className={`border p-4 rounded-md cursor-pointer transition-colors ${
                        selectedRepairerId === repairer.id 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                      onClick={() => setSelectedRepairerId(repairer.id)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{repairer.businessName}</h4>
                          <div className="flex items-center mt-1 text-sm">
                            <div className="flex items-center text-yellow-500">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="ml-1">{repairer.rating}</span>
                            </div>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-gray-500">{repairer.completedJobs} jobs</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {repairer.specializations.slice(0, 2).map((specialty, index) => (
                            <span 
                              key={index}
                              className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {repairer.businessDescription}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button 
                type="button"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={isLoading || !selectedVehicleId || !serviceType || !description || !selectedRepairerId}
              className="ml-3 inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 disabled:bg-blue-300 dark:disabled:bg-blue-900/50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Request'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
