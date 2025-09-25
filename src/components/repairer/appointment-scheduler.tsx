'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Appointment = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleDetails: string;
  serviceType: string;
  date: Date;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
};

export default function AppointmentScheduler() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // In a real app, fetch from the API
        // For demo, we're using mock data
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const mockAppointments: Appointment[] = [
          {
            id: '1',
            customerName: 'John Smith',
            customerEmail: 'john@example.com',
            customerPhone: '555-123-4567',
            vehicleDetails: '2020 Toyota Camry',
            serviceType: 'Oil Change',
            date: today,
            time: '10:00 AM',
            status: 'CONFIRMED'
          },
          {
            id: '2',
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah@example.com',
            customerPhone: '555-987-6543',
            vehicleDetails: '2018 Honda Civic',
            serviceType: 'Brake Service',
            date: tomorrow,
            time: '2:30 PM',
            status: 'PENDING'
          },
          {
            id: '3',
            customerName: 'Michael Brown',
            customerEmail: 'michael@example.com',
            customerPhone: '555-456-7890',
            vehicleDetails: '2019 Ford F-150',
            serviceType: 'Engine Diagnostics',
            date: nextWeek,
            time: '9:00 AM',
            status: 'PENDING',
            notes: 'Customer mentioned unusual engine noise'
          }
        ];

        setAppointments(mockAppointments);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching appointments';
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filterAppointmentsByDate = (date: string) => {
    return appointments.filter(
      appointment => appointment.date.toISOString().split('T')[0] === date
    );
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleUpdateStatus = (id: string, newStatus: Appointment['status']) => {
    // In a real app, make an API call here
    setAppointments(
      appointments.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
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

  const filteredAppointments = filterAppointmentsByDate(selectedDate);
  
  const getStatusBadgeClass = (status: Appointment['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointment Scheduler</h2>
        <div>
          <label htmlFor="date-selector" className="mr-2 font-medium">
            Select Date:
          </label>
          <input
            id="date-selector"
            type="date"
            className="px-3 py-2 border rounded-md"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            No appointments for this date
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Select a different date or add new appointments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="p-4">
              <div className="flex flex-wrap md:flex-nowrap justify-between">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold">{appointment.customerName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {appointment.customerEmail}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {appointment.customerPhone}
                  </p>
                </div>

                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <p className="text-sm font-medium">Vehicle</p>
                  <p className="text-gray-600 dark:text-gray-300">{appointment.vehicleDetails}</p>
                  <p className="text-sm font-medium mt-2">Service</p>
                  <p className="text-gray-600 dark:text-gray-300">{appointment.serviceType}</p>
                </div>

                <div className="w-full md:w-1/3 text-right">
                  <p className="text-lg font-semibold">{appointment.time}</p>
                  <div 
                    className={`inline-block px-2 py-1 rounded-md text-xs font-medium mt-1 ${getStatusBadgeClass(appointment.status)}`}
                  >
                    {appointment.status}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2 justify-end">
                    {appointment.status === 'PENDING' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateStatus(appointment.id, 'CONFIRMED')}
                        >
                          Confirm
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleUpdateStatus(appointment.id, 'CANCELLED')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    
                    {appointment.status === 'CONFIRMED' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleUpdateStatus(appointment.id, 'COMPLETED')}
                      >
                        Mark Completed
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {appointment.notes && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.notes}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
