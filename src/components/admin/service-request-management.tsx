'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ServiceRequest } from '@/types/models';

// Mock service request data
const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    vehicleId: 'v1',
    ownerId: 'u1',
    serviceType: 'Engine Repair',
    description: 'Car is making strange noises when accelerating. Need diagnostic and repair.',
    urgency: 'HIGH',
    status: 'PENDING',
    location: {
      address: '123 Main St, Cityville, CV 12345',
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    preferredDate: new Date('2023-08-15'),
    budget: 500,
    quotes: [],
    createdAt: new Date('2023-08-10'),
    updatedAt: new Date('2023-08-10')
  },
  {
    id: '2',
    vehicleId: 'v2',
    ownerId: 'u2',
    serviceType: 'Regular Maintenance',
    description: 'Need oil change, filter replacement, and general inspection.',
    urgency: 'MEDIUM',
    status: 'ACCEPTED',
    repairerId: 'r1',
    location: {
      address: '456 Oak Ave, Townsville, TS 67890',
      coordinates: {
        latitude: 34.1522,
        longitude: -118.3437
      }
    },
    preferredDate: new Date('2023-08-20'),
    budget: 150,
    quotes: [
      {
        id: 'q1',
        serviceRequestId: '2',
        repairerId: 'r1',
        price: 120,
        estimatedDuration: '1-2 hours',
        description: 'Standard maintenance package including oil change, filter replacement and multi-point inspection.',
        status: 'ACCEPTED',
        createdAt: new Date('2023-08-11'),
        updatedAt: new Date('2023-08-12')
      }
    ],
    createdAt: new Date('2023-08-11'),
    updatedAt: new Date('2023-08-12')
  },
  {
    id: '3',
    vehicleId: 'v3',
    ownerId: 'u3',
    serviceType: 'Brake Replacement',
    description: 'Brakes are squeaking and stopping distance has increased. Need new brake pads and possibly rotors.',
    urgency: 'HIGH',
    status: 'IN_PROGRESS',
    repairerId: 'r2',
    location: {
      address: '789 Pine Rd, Villagetown, VT 45678',
      coordinates: {
        latitude: 34.2522,
        longitude: -118.4437
      }
    },
    preferredDate: new Date('2023-08-18'),
    budget: 350,
    quotes: [
      {
        id: 'q2',
        serviceRequestId: '3',
        repairerId: 'r2',
        price: 300,
        estimatedDuration: '3-4 hours',
        description: 'Full brake service including new pads, inspection of rotors, and brake fluid flush.',
        status: 'ACCEPTED',
        createdAt: new Date('2023-08-15'),
        updatedAt: new Date('2023-08-16')
      },
      {
        id: 'q3',
        serviceRequestId: '3',
        repairerId: 'r3',
        price: 350,
        estimatedDuration: '2-3 hours',
        description: 'Premium brake service with ceramic brake pads and rotor resurfacing if needed.',
        status: 'REJECTED',
        createdAt: new Date('2023-08-15'),
        updatedAt: new Date('2023-08-16')
      }
    ],
    createdAt: new Date('2023-08-14'),
    updatedAt: new Date('2023-08-16')
  },
  {
    id: '4',
    vehicleId: 'v4',
    ownerId: 'u4',
    serviceType: 'A/C Repair',
    description: 'Air conditioning not cooling properly.',
    urgency: 'MEDIUM',
    status: 'COMPLETED',
    repairerId: 'r1',
    location: {
      address: '101 Cedar Ln, Hamletville, HV 23456',
      coordinates: {
        latitude: 34.3522,
        longitude: -118.5437
      }
    },
    preferredDate: new Date('2023-08-10'),
    budget: 250,
    quotes: [
      {
        id: 'q4',
        serviceRequestId: '4',
        repairerId: 'r1',
        price: 200,
        estimatedDuration: '2-3 hours',
        description: 'A/C diagnostics and recharge. Additional costs may apply if components need replacement.',
        status: 'ACCEPTED',
        createdAt: new Date('2023-08-05'),
        updatedAt: new Date('2023-08-06')
      }
    ],
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2023-08-11')
  }
];

// Utility function to get status badge classes
const getStatusBadgeClasses = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'ACCEPTED':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'IN_PROGRESS':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

// Utility function to get urgency badge classes
const getUrgencyBadgeClasses = (urgency: string) => {
  switch (urgency) {
    case 'LOW':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'MEDIUM':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    case 'HIGH':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    case 'EMERGENCY':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export default function ServiceRequestManagement() {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [isRequestDetailsModalOpen, setIsRequestDetailsModalOpen] = useState(false);
  const [isQuotesModalOpen, setIsQuotesModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setServiceRequests(mockServiceRequests);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter service requests
  const filteredRequests = serviceRequests.filter(request => {
    const matchesSearch = 
      request.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location?.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === '' ||
      request.status === statusFilter;
    
    const matchesUrgency = 
      urgencyFilter === '' ||
      request.urgency === urgencyFilter;
    
    return matchesSearch && matchesStatus && matchesUrgency;
  });
  
  const handleViewRequest = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsRequestDetailsModalOpen(true);
  };
  
  const handleViewQuotes = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsQuotesModalOpen(true);
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <h2 className="text-2xl font-semibold">Service Request Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex items-center">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 whitespace-nowrap">
              Status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="urgency-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 whitespace-nowrap">
              Urgency:
            </label>
            <select
              id="urgency-filter"
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Urgencies</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="EMERGENCY">Emergency</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by service type, description, location, or ID..."
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
        {filteredRequests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">No service requests found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div 
              key={request.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold">{request.serviceType}</h3>
                        <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadgeClasses(request.status)}`}>
                          {request.status.replace('_', ' ')}
                        </span>
                        <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${getUrgencyBadgeClasses(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {request.id}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{request.description}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Location:</span> {request.location?.address}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Preferred Date:</span> {request.preferredDate ? formatDate(request.preferredDate) : 'Not specified'}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Budget:</span> ${request.budget?.toFixed(2) || 'Not specified'}
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="font-medium text-gray-500 dark:text-gray-400">Quotes:</span>
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                          {request.quotes.length}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <p>Requested: {formatDate(request.createdAt)}</p>
                      <p>Last Updated: {formatDate(request.updatedAt)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewRequest(request)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewQuotes(request)}
                      disabled={request.quotes.length === 0}
                    >
                      View Quotes ({request.quotes.length})
                    </Button>
                    {request.status === 'PENDING' && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          // In a real app, you would send a request to update the status
                          const updatedRequests = serviceRequests.map(r => {
                            if (r.id === request.id) {
                              return { ...r, status: 'CANCELLED' as const, updatedAt: new Date() };
                            }
                            return r;
                          });
                          setServiceRequests(updatedRequests);
                        }}
                      >
                        Cancel Request
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Service Request Details Modal */}
      <Dialog open={isRequestDetailsModalOpen} onOpenChange={setIsRequestDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Service Request Details</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{selectedRequest.serviceType}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Request ID: {selectedRequest.id}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClasses(selectedRequest.status)}`}>
                    {selectedRequest.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedRequest.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Urgency</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyBadgeClasses(selectedRequest.urgency)}`}>
                    {selectedRequest.urgency}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Budget</h4>
                  <p>${selectedRequest.budget?.toFixed(2) || 'Not specified'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedRequest.location?.address}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Preferred Date</h4>
                  <p>{selectedRequest.preferredDate ? formatDate(selectedRequest.preferredDate) : 'Not specified'}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClasses(selectedRequest.status)}`}>
                    {selectedRequest.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              {selectedRequest.repairerId && (
                <div>
                  <h4 className="font-medium mb-2">Assigned Repairer</h4>
                  <p>ID: {selectedRequest.repairerId}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-2">Request Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Vehicle ID:</p>
                    <p>{selectedRequest.vehicleId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Owner ID:</p>
                    <p>{selectedRequest.ownerId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Created:</p>
                    <p>{formatDate(selectedRequest.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Last Updated:</p>
                    <p>{formatDate(selectedRequest.updatedAt)}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Quotes</h4>
                {selectedRequest.quotes.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No quotes submitted for this request.</p>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      This request has {selectedRequest.quotes.length} quote(s).
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setIsRequestDetailsModalOpen(false);
                        setIsQuotesModalOpen(true);
                      }}
                    >
                      View Quotes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsRequestDetailsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Quotes Modal */}
      <Dialog open={isQuotesModalOpen} onOpenChange={setIsQuotesModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Service Quotes</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <p className="text-sm">
                Quotes for service request: <strong>{selectedRequest.serviceType}</strong> (ID: {selectedRequest.id})
              </p>
              
              {selectedRequest.quotes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No quotes available for this service request.</p>
              ) : (
                <div className="space-y-4">
                  {selectedRequest.quotes.map((quote) => (
                    <div 
                      key={quote.id} 
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Quote #{quote.id}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            From Repairer: {quote.repairerId}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          quote.status === 'ACCEPTED' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : quote.status === 'REJECTED' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {quote.status}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <p className="text-gray-600 dark:text-gray-300">{quote.description}</p>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Price</p>
                          <p className="text-green-600 dark:text-green-400">${quote.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="font-medium">Estimated Duration</p>
                          <p>{quote.estimatedDuration}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <p>Created: {formatDate(quote.createdAt)}</p>
                        <p>Updated: {formatDate(quote.updatedAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsQuotesModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
