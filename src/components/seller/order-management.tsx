'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Order = {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderDate: Date;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethod: string;
  trackingNumber?: string;
  total: number;
  notes?: string;
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real app, this would fetch from the API
        // For demo purposes, we're using mock data
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const mockOrders: Order[] = [
          {
            id: 'ORD-2025-001',
            customerId: 'cust1',
            customerName: 'John Smith',
            customerEmail: 'john@example.com',
            orderDate: today,
            status: 'PENDING',
            items: [
              {
                productId: '1',
                productName: 'Brake Pads (Front)',
                quantity: 1,
                price: 89.99
              },
              {
                productId: '2',
                productName: 'Oil Filter',
                quantity: 2,
                price: 12.99
              }
            ],
            shippingAddress: {
              street: '123 Main St',
              city: 'New York',
              state: 'NY',
              zipCode: '10001',
              country: 'USA'
            },
            shippingMethod: 'Standard Shipping',
            total: 115.97
          },
          {
            id: 'ORD-2025-002',
            customerId: 'cust2',
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah@example.com',
            orderDate: yesterday,
            status: 'SHIPPED',
            items: [
              {
                productId: '3',
                productName: 'Alternator - Remanufactured',
                quantity: 1,
                price: 159.99
              }
            ],
            shippingAddress: {
              street: '456 Oak Ave',
              city: 'Chicago',
              state: 'IL',
              zipCode: '60601',
              country: 'USA'
            },
            shippingMethod: 'Express Shipping',
            trackingNumber: '1Z999AA10123456784',
            total: 159.99,
            notes: 'Customer requested careful packaging'
          },
          {
            id: 'ORD-2025-003',
            customerId: 'cust3',
            customerName: 'Michael Brown',
            customerEmail: 'michael@example.com',
            orderDate: twoDaysAgo,
            status: 'DELIVERED',
            items: [
              {
                productId: '4',
                productName: 'Spark Plugs (Set of 4)',
                quantity: 2,
                price: 42.99
              },
              {
                productId: '5',
                productName: 'Air Filter',
                quantity: 1,
                price: 18.99
              }
            ],
            shippingAddress: {
              street: '789 Pine St',
              city: 'Los Angeles',
              state: 'CA',
              zipCode: '90001',
              country: 'USA'
            },
            shippingMethod: 'Standard Shipping',
            trackingNumber: '1Z999AA10123456785',
            total: 104.97
          }
        ];

        setOrders(mockOrders);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching orders';
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    // In a real app, make an API call here
    setOrders(
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter.toUpperCase());
  
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    b.orderDate.getTime() - a.orderDate.getTime()
  );

  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      case 'SHIPPED':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-500';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      case 'RETURNED':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Order Management</h2>
        <div>
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
          <p className="text-2xl font-bold">{orders.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending Orders</p>
          <p className="text-2xl font-bold">{orders.filter(o => o.status === 'PENDING').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Shipped Orders</p>
          <p className="text-2xl font-bold">{orders.filter(o => o.status === 'SHIPPED').length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Delivered Orders</p>
          <p className="text-2xl font-bold">{orders.filter(o => o.status === 'DELIVERED').length}</p>
        </Card>
      </div>

      {sortedOrders.length === 0 ? (
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            No orders found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {statusFilter !== 'all'
              ? `No orders with status "${statusFilter.toUpperCase()}" found.`
              : 'No orders have been placed yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {sortedOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{order.id}</h3>
                      <div 
                        className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusBadgeClass(order.status)}`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Placed on {order.orderDate.toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xl font-bold mt-2 md:mt-0">${order.total.toFixed(2)}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Customer Information</h4>
                    <p>{order.customerName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.customerEmail}</p>
                    
                    <h4 className="text-sm font-medium mt-4 mb-2">Shipping Address</h4>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    <p>{order.shippingAddress.country}</p>
                    
                    <h4 className="text-sm font-medium mt-4 mb-2">Shipping Method</h4>
                    <p>{order.shippingMethod}</p>
                    
                    {order.trackingNumber && (
                      <>
                        <h4 className="text-sm font-medium mt-4 mb-2">Tracking Number</h4>
                        <p>{order.trackingNumber}</p>
                      </>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Order Items</h4>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Product</th>
                            <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">Qty</th>
                            <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td className="py-2 px-3 text-sm">{item.productName}</td>
                              <td className="py-2 px-3 text-sm text-center">{item.quantity}</td>
                              <td className="py-2 px-3 text-sm text-right">${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <td colSpan={2} className="py-2 px-3 text-sm font-medium text-right">Total:</td>
                            <td className="py-2 px-3 text-sm font-bold text-right">${order.total.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    
                    {order.notes && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Order Notes</h4>
                        <p className="text-sm italic text-gray-600 dark:text-gray-400">{order.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t flex flex-wrap justify-end gap-2">
                  {order.status === 'PENDING' && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleStatusChange(order.id, 'PROCESSING')}
                      >
                        Process Order
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleStatusChange(order.id, 'CANCELLED')}
                      >
                        Cancel Order
                      </Button>
                    </>
                  )}
                  
                  {order.status === 'PROCESSING' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusChange(order.id, 'SHIPPED')}
                    >
                      Mark as Shipped
                    </Button>
                  )}
                  
                  {order.status === 'SHIPPED' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                    >
                      Mark as Delivered
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline">Print Invoice</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
