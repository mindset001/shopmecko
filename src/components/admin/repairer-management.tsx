'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Repairer } from '@/types/models';

// Mock repairer data for demonstration
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

export default function RepairerManagement() {
  const [repairers, setRepairers] = useState<Repairer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [isRepairerDetailsModalOpen, setIsRepairerDetailsModalOpen] = useState(false);
  const [selectedRepairer, setSelectedRepairer] = useState<Repairer | null>(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isEditSpecializationsModalOpen, setIsEditSpecializationsModalOpen] = useState(false);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [repairerSpecializations, setRepairerSpecializations] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setRepairers(mockRepairers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get unique specializations from all repairers
  const allSpecializations = Array.from(
    new Set(
      repairers.flatMap(repairer => repairer.specializations)
    )
  ).sort();
  
  // Filter repairers based on search query and specialization filter
  const filteredRepairers = repairers.filter(repairer => {
    const matchesSearch = 
      repairer.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repairer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repairer.businessDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = 
      specializationFilter === '' ||
      repairer.specializations.includes(specializationFilter);
    
    return matchesSearch && matchesSpecialization;
  });
  
  const handleViewRepairer = (repairer: Repairer) => {
    setSelectedRepairer(repairer);
    setIsRepairerDetailsModalOpen(true);
  };
  
  const handleVerifyRepairer = (repairer: Repairer) => {
    setSelectedRepairer(repairer);
    setIsVerificationModalOpen(true);
  };
  
  const handleEditSpecializations = (repairer: Repairer) => {
    setSelectedRepairer(repairer);
    setRepairerSpecializations([...repairer.specializations]);
    setIsEditSpecializationsModalOpen(true);
  };
  
  const handleAddSpecialization = () => {
    if (newSpecialization.trim() !== '' && !repairerSpecializations.includes(newSpecialization)) {
      setRepairerSpecializations([...repairerSpecializations, newSpecialization]);
      setNewSpecialization('');
    }
  };
  
  const handleRemoveSpecialization = (specialization: string) => {
    setRepairerSpecializations(repairerSpecializations.filter(s => s !== specialization));
  };
  
  const handleSaveSpecializations = () => {
    if (selectedRepairer) {
      const updatedRepairers = repairers.map(repairer => {
        if (repairer.id === selectedRepairer.id) {
          return {
            ...repairer,
            specializations: repairerSpecializations,
            updatedAt: new Date()
          };
        }
        return repairer;
      });
      
      setRepairers(updatedRepairers);
      setIsEditSpecializationsModalOpen(false);
      setSelectedRepairer(null);
    }
  };
  
  const handleVerifySubmit = () => {
    // In a real app, this would update the repairer's verification status via an API call
    alert(`${selectedRepairer?.businessName} has been verified successfully!`);
    setIsVerificationModalOpen(false);
  };
  
  const handleDeleteRepairer = (repairerId: string) => {
    if (confirm('Are you sure you want to delete this repairer? This action cannot be undone.')) {
      // In a real app, this would send a DELETE request to your API
      setRepairers(repairers.filter(repairer => repairer.id !== repairerId));
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Repairer Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex items-center">
            <label htmlFor="specialization-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 whitespace-nowrap">
              Specialization:
            </label>
            <select
              id="specialization-filter"
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Specializations</option>
              {allSpecializations.map((specialization) => (
                <option key={specialization} value={specialization}>{specialization}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search repairers by name, email, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 pl-10 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredRepairers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">No repairers found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          filteredRepairers.map((repairer) => (
            <div 
              key={repairer.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold">{repairer.businessName}</h3>
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {repairer.role}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300">{repairer.businessDescription}</p>
                    
                    <div className="flex items-center mt-2 text-sm">
                      <div className="flex items-center text-yellow-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm font-medium">{repairer.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-500">{repairer.completedJobs} jobs completed</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {repairer.specializations.map((specialization, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                        >
                          {specialization}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <p>Contact: {repairer.email} • {repairer.phoneNumber}</p>
                      <p>Registered: {new Date(repairer.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewRepairer(repairer)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleVerifyRepairer(repairer)}
                    >
                      Verify Repairer
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditSpecializations(repairer)}
                    >
                      Edit Specializations
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteRepairer(repairer.id)}
                    >
                      Remove Repairer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Repairer Details Modal */}
      <Dialog open={isRepairerDetailsModalOpen} onOpenChange={setIsRepairerDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Repairer Details</DialogTitle>
          </DialogHeader>
          
          {selectedRepairer && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{selectedRepairer.businessName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedRepairer.email} • {selectedRepairer.phoneNumber}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Business Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedRepairer.businessDescription}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRepairer.specializations.map((specialization, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Rating</h4>
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-lg font-medium">{selectedRepairer.rating}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Completed Jobs</h4>
                  <p className="text-lg">{selectedRepairer.completedJobs}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Account Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Account Created:</p>
                    <p>{new Date(selectedRepairer.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Last Updated:</p>
                    <p>{new Date(selectedRepairer.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsRepairerDetailsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Verification Modal */}
      <Dialog open={isVerificationModalOpen} onOpenChange={setIsVerificationModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Verify Repairer</DialogTitle>
          </DialogHeader>
          
          {selectedRepairer && (
            <div className="space-y-4">
              <p>
                You are about to verify <strong>{selectedRepairer.businessName}</strong> as a legitimate repairer on the platform.
              </p>
              <p>
                This will give them a verified badge and improve their visibility in search results.
              </p>
              <div className="space-y-2">
                <Label htmlFor="verificationNotes">Verification Notes (Internal Use Only)</Label>
                <textarea
                  id="verificationNotes"
                  className="w-full min-h-[100px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2"
                  placeholder="Enter any notes about the verification process..."
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerificationModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifySubmit}>
              Verify Repairer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Specializations Modal */}
      <Dialog open={isEditSpecializationsModalOpen} onOpenChange={setIsEditSpecializationsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Specializations</DialogTitle>
          </DialogHeader>
          
          {selectedRepairer && (
            <div className="space-y-4">
              <p>
                Editing specializations for <strong>{selectedRepairer.businessName}</strong>
              </p>
              
              <div className="flex gap-2">
                <Input
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  placeholder="Enter a specialization"
                />
                <Button type="button" onClick={handleAddSpecialization}>Add</Button>
              </div>
              
              <div>
                <Label>Current Specializations</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {repairerSpecializations.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No specializations added</p>
                  ) : (
                    repairerSpecializations.map((specialization, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                      >
                        {specialization}
                        <button
                          type="button"
                          className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          onClick={() => handleRemoveSpecialization(specialization)}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSpecializationsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSpecializations}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
