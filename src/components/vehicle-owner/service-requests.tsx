'use client';

import { useState, useEffect } from 'react';
import { ServiceRequest, Vehicle } from '@/types/models';
import Link from 'next/link';
import ServiceRequestForm from './service-request-form';
import { api } from '@/lib/api-client';

export default function ServiceRequests() {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch service requests using API client
        const requestsData = await api.serviceRequests.getServiceRequests();
        setServiceRequests(requestsData.serviceRequests || []);

        // Fetch vehicles to display vehicle details in requests
        const vehiclesData = await api.vehicles.getVehicles();
        setVehicles(vehiclesData.vehicles || []);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching data';
        setError(errorMessage);
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  
  const createNewRequest = () => {
    setIsRequestModalOpen(true);
  };
  
  const handleServiceRequestSubmit = async (serviceRequest: Partial<ServiceRequest>) => {
    try {
      // Using the API client to create a new service request
      const result = await api.serviceRequests.createServiceRequest({
        vehicleId: serviceRequest.vehicleId!,
        serviceType: serviceRequest.serviceType!,
        description: serviceRequest.description!,
        appointmentDate: serviceRequest.preferredDate?.toISOString(),
        location: {
          address: "Auto-detected from user profile", // In a real app, this would come from user's profile
          city: "Auto-detected",
          state: "Auto-detected",
          postalCode: "Auto-detected"
        }
      });
      
      // Update the state with the new request from the API response
      if (result.serviceRequest) {
        setServiceRequests([result.serviceRequest, ...serviceRequests]);
      }
      
      // Show success message
      alert('Service request submitted successfully!');
    } catch (err: unknown) {
      console.error('Error submitting service request:', err);
      alert('Failed to submit service request. Please try again.');
    }
  };

  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle';
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'ACCEPTED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      case 'IN_PROGRESS':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-500';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  const getUrgencyBadgeClass = (urgency: string) => {
    switch (urgency) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-500';
      case 'EMERGENCY':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  // Filter service requests based on status
  const filteredRequests = filterStatus === 'all' 
    ? serviceRequests 
    : serviceRequests.filter(request => request.status === filterStatus);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12" suppressHydrationWarning>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-800 dark:text-red-200">
        <p>{error}</p>
        <button 
          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Service Requests</h2>
        
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="flex items-center">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              Status:
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          
          <button
            onClick={createNewRequest}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Request
          </button>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-200">
            {serviceRequests.length === 0 
              ? 'No service requests yet' 
              : 'No matching service requests'}
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {serviceRequests.length === 0 
              ? 'Start by requesting a service from a mechanic or repair shop.' 
              : 'Try changing your filter selection to see more requests.'}
          </p>
          {serviceRequests.length === 0 && (
            <button
              onClick={createNewRequest}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Request
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-lg font-semibold">{request.serviceType}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {getVehicleInfo(request.vehicleId)}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyBadgeClass(request.urgency)}`}>
                      {request.urgency} Priority
                    </span>
                  </div>
                </div>
                
                <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm">
                  {request.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">Requested On</span>
                    <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                  </div>
                  {request.preferredDate && (
                    <div>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">Preferred Date</span>
                      <span>{new Date(request.preferredDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {request.budget && (
                    <div>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">Budget</span>
                      <span>${request.budget.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="mb-2 md:mb-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Quotes:</span>
                    <span className="font-medium text-sm">{request.quotes.length}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
                      onClick={() => alert(`View details of request ${request.id}`)}
                    >
                      View Details
                    </button>
                    
                    {request.status === 'PENDING' && (
                      <button
                        className="text-sm px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-800 dark:text-red-200 rounded"
                        onClick={() => alert(`Cancel request ${request.id}`)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Service Request Modal */}
      <ServiceRequestForm
        open={isRequestModalOpen}
        onOpenChange={setIsRequestModalOpen}
        vehicles={vehicles}
        onSubmit={handleServiceRequestSubmit}
      />
    </div>
  );
}
