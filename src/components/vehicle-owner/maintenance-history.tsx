'use client';

import { useState, useEffect } from 'react';
import { Vehicle, MaintenanceRecord } from '@/types/models';

export default function MaintenanceHistory() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/vehicles');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch vehicles');
        }

        setVehicles(data.vehicles);
        
        // Select the first vehicle by default if available
        if (data.vehicles.length > 0) {
          setSelectedVehicleId(data.vehicles[0].id);
        }
      } catch (err: unknown) {
        setError(err.message || 'An error occurred while fetching vehicles');
        console.error('Error fetching vehicles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    if (!selectedVehicleId) return;

    const fetchMaintenanceRecords = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/vehicles/${selectedVehicleId}/maintenance`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch maintenance records');
        }

        setMaintenanceRecords(data.maintenanceHistory || []);
      } catch (err: unknown) {
        setError(err.message || 'An error occurred while fetching maintenance records');
        console.error('Error fetching maintenance records:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaintenanceRecords();
  }, [selectedVehicleId]);

  const addMaintenanceRecord = () => {
    // In a real app, this would open a modal or navigate to a form
    alert('Add new maintenance record functionality would open a form here');
  };

  if (isLoading && !vehicles.length) {
    return (
      <div className="flex justify-center items-center py-12" suppressHydrationWarning>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !vehicles.length) {
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

  if (vehicles.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-200">No vehicles added yet</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">You need to add a vehicle before you can track its maintenance history.</p>
        <button
          onClick={() => alert('Navigate to add vehicle')}
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Your First Vehicle
        </button>
      </div>
    );
  }

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Maintenance History</h2>
        {selectedVehicleId && (
          <button
            onClick={addMaintenanceRecord}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Record
          </button>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="vehicle-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Vehicle
        </label>
        <select
          id="vehicle-select"
          value={selectedVehicleId || ''}
          onChange={(e) => setSelectedVehicleId(e.target.value)}
          className="w-full md:w-64 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.registrationNumber})
            </option>
          ))}
        </select>
      </div>

      {isLoading && selectedVehicleId ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error && selectedVehicleId ? (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-800 dark:text-red-200">
          <p>{error}</p>
          <button 
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      ) : (
        <div>
          {selectedVehicle && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">Make & Model</span>
                  <span className="font-medium">{selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">Registration</span>
                  <span className="font-medium">{selectedVehicle.registrationNumber}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">Total Records</span>
                  <span className="font-medium">{maintenanceRecords.length}</span>
                </div>
              </div>
            </div>
          )}

          {maintenanceRecords.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-200">No maintenance records</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Start tracking your vehicle&apos;s maintenance by adding your first record.</p>
              <button
                onClick={addMaintenanceRecord}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add First Maintenance Record
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Service Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Mileage
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {maintenanceRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {new Date(record.serviceDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {record.serviceType}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {record.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {record.mileage ? `${record.mileage} km` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {record.cost ? `$${record.cost.toFixed(2)}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          className="text-blue-600 dark:text-blue-400 hover:underline mr-3"
                          onClick={() => alert(`View details of record ${record.id}`)}
                        >
                          View
                        </button>
                        <button
                          className="text-gray-600 dark:text-gray-400 hover:underline"
                          onClick={() => alert(`Edit record ${record.id}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
