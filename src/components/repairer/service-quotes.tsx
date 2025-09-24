'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type ServiceQuote = {
  id: string;
  customerName: string;
  customerEmail: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
  };
  serviceType: string;
  description: string;
  estimatedCost: number;
  estimatedTime: string;
  status: 'PENDING' | 'SENT' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED';
  createdAt: Date;
  expiresAt?: Date;
};

export default function ServiceQuotes() {
  const [quotes, setQuotes] = useState<ServiceQuote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // In a real app, fetch from the API
        // For demo, we're using mock data
        const today = new Date();
        
        // Set expiration date 7 days in future
        const expiresAt = new Date(today);
        expiresAt.setDate(expiresAt.getDate() + 7);
        
        // Set a date 2 days ago
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const mockQuotes: ServiceQuote[] = [
          {
            id: '1',
            customerName: 'John Smith',
            customerEmail: 'john@example.com',
            vehicleInfo: {
              make: 'Toyota',
              model: 'Camry',
              year: 2020
            },
            serviceType: 'Brake Repair',
            description: 'Front brake pad replacement and rotor inspection',
            estimatedCost: 350.00,
            estimatedTime: '2-3 hours',
            status: 'SENT',
            createdAt: today,
            expiresAt
          },
          {
            id: '2',
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah@example.com',
            vehicleInfo: {
              make: 'Honda',
              model: 'Civic',
              year: 2018
            },
            serviceType: 'Major Engine Service',
            description: 'Complete engine tune-up including spark plug replacement',
            estimatedCost: 850.00,
            estimatedTime: '4-5 hours',
            status: 'PENDING',
            createdAt: twoDaysAgo
          },
          {
            id: '3',
            customerName: 'Mike Williams',
            customerEmail: 'mike@example.com',
            vehicleInfo: {
              make: 'Ford',
              model: 'F-150',
              year: 2019
            },
            serviceType: 'Suspension Repair',
            description: 'Replace front struts and alignment',
            estimatedCost: 650.00,
            estimatedTime: '3-4 hours',
            status: 'ACCEPTED',
            createdAt: twoDaysAgo
          }
        ];

        setQuotes(mockQuotes);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching service quotes');
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: ServiceQuote['status']) => {
    // In a real app, make an API call here
    setQuotes(
      quotes.map(quote => 
        quote.id === id ? { ...quote, status: newStatus } : quote
      )
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
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

  const filteredQuotes = filter === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.status === filter.toUpperCase());
  
  const getStatusBadgeClass = (status: ServiceQuote['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'SENT':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'DECLINED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      case 'COMPLETED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Service Quotes</h2>
        <div>
          <label htmlFor="status-filter" className="mr-2 font-medium">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            className="px-3 py-2 border rounded-md"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Quotes</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredQuotes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            No service quotes found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try changing your filter or create a new quote.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredQuotes.map((quote) => (
            <Card key={quote.id} className="p-4">
              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-auto mb-3 md:mb-0">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">{quote.customerName}</h3>
                    <div 
                      className={`ml-2 px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeClass(quote.status)}`}
                    >
                      {quote.status}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {quote.customerEmail}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">${quote.estimatedCost.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Est. Time: {quote.estimatedTime}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm font-medium">Vehicle</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {quote.vehicleInfo.year} {quote.vehicleInfo.make} {quote.vehicleInfo.model}
                </p>
                
                <p className="text-sm font-medium mt-2">Service</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {quote.serviceType}
                </p>
                
                <p className="text-sm font-medium mt-2">Description</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {quote.description}
                </p>
              </div>
              
              <div className="mt-4 flex flex-wrap justify-between items-center">
                <div className="text-sm text-gray-500">
                  {quote.expiresAt && (
                    <p>Expires: {quote.expiresAt.toLocaleDateString()}</p>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  {quote.status === 'PENDING' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleUpdateStatus(quote.id, 'SENT')}
                    >
                      Send Quote
                    </Button>
                  )}
                  
                  {quote.status === 'ACCEPTED' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleUpdateStatus(quote.id, 'COMPLETED')}
                    >
                      Mark Completed
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                  >
                    Edit Quote
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
