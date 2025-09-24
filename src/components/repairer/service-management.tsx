'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Service } from '@/types/models';

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingService, setIsAddingService] = useState<boolean>(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    description: '',
    category: '',
    estimatedDuration: '',
    basePrice: 0,
    priceType: 'FIXED'
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // In a real app, fetch from the API
        // For demo, we're using mock data
        const mockServices: Service[] = [
          {
            id: '1',
            repairerId: 'repairer1',
            name: 'Oil Change',
            description: 'Full-service oil change with filter replacement and fluid check',
            category: 'Maintenance',
            estimatedDuration: '30-45 minutes',
            basePrice: 45.00,
            priceType: 'FIXED',
            createdAt: new Date('2025-01-01'),
            updatedAt: new Date('2025-01-01')
          },
          {
            id: '2',
            repairerId: 'repairer1',
            name: 'Brake Service',
            description: 'Comprehensive brake inspection and pad replacement',
            category: 'Repairs',
            estimatedDuration: '1-2 hours',
            basePrice: 150.00,
            priceType: 'FIXED',
            createdAt: new Date('2025-01-01'),
            updatedAt: new Date('2025-01-01')
          },
          {
            id: '3',
            repairerId: 'repairer1',
            name: 'Engine Diagnostics',
            description: 'Complete engine diagnostic using advanced computer systems',
            category: 'Diagnostics',
            estimatedDuration: '1 hour',
            basePrice: 85.00,
            priceType: 'FIXED',
            createdAt: new Date('2025-01-01'),
            updatedAt: new Date('2025-01-01')
          }
        ];

        setServices(mockServices);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching services');
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = () => {
    setIsAddingService(true);
  };

  const handleCancelAdd = () => {
    setIsAddingService(false);
    setNewService({
      name: '',
      description: '',
      category: '',
      estimatedDuration: '',
      basePrice: 0,
      priceType: 'FIXED'
    });
  };

  const handleSaveService = () => {
    // In a real app, you would make an API call here
    const mockNewService: Service = {
      id: `new-${Date.now()}`,
      repairerId: 'repairer1',
      name: newService.name || '',
      description: newService.description || '',
      category: newService.category || '',
      estimatedDuration: newService.estimatedDuration || '',
      basePrice: newService.basePrice || 0,
      priceType: newService.priceType as 'FIXED' | 'HOURLY',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setServices([...services, mockNewService]);
    setIsAddingService(false);
    setNewService({
      name: '',
      description: '',
      category: '',
      estimatedDuration: '',
      basePrice: 0,
      priceType: 'FIXED'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: name === 'basePrice' ? parseFloat(value) : value
    });
  };

  const handleDeleteService = (id: string) => {
    // In a real app, you would make an API call here
    setServices(services.filter(service => service.id !== id));
  };

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Service Management</h2>
        <Button onClick={handleAddService} disabled={isAddingService}>
          Add New Service
        </Button>
      </div>

      {isAddingService && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service Name</label>
              <input
                type="text"
                name="name"
                value={newService.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g. Oil Change"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={newService.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g. Maintenance"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={newService.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Describe the service in detail"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estimated Duration</label>
              <input
                type="text"
                name="estimatedDuration"
                value={newService.estimatedDuration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g. 1-2 hours"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Base Price ($)</label>
              <input
                type="number"
                name="basePrice"
                value={newService.basePrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price Type</label>
              <select
                name="priceType"
                value={newService.priceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="FIXED">Fixed Price</option>
                <option value="HOURLY">Hourly Rate</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancelAdd}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveService}
              disabled={!newService.name || !newService.description}
            >
              Save Service
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{service.category}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${service.basePrice.toFixed(2)}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    {service.priceType === 'HOURLY' ? '/hr' : ''}
                  </span>
                </p>
                <p className="text-sm">{service.estimatedDuration}</p>
              </div>
            </div>
            <p className="my-2 text-gray-600 dark:text-gray-300">{service.description}</p>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleDeleteService(service.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
