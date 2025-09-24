'use client';

import { useState, useEffect } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

// Mock data for demonstration
const mockStats = {
  totalUsers: 1248,
  totalRepairers: 87,
  totalSellers: 42,
  activeServiceRequests: 156,
  completedServices: 978,
  productsListed: 1532
};

// Growth percentages
const mockGrowth = {
  totalUsers: 12.5,
  totalRepairers: 8.3,
  totalSellers: 15.7,
  activeServiceRequests: -3.2,
  completedServices: 24.6,
  productsListed: 5.9
};

export default function AnalyticsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [growth, setGrowth] = useState(mockGrowth);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, change, icon }: StatCardProps) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h3>
          <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">from last month</span>
          </div>
        </div>
        <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow h-32 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Platform Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          change={growth.totalUsers}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          } 
        />
        
        <StatCard 
          title="Total Repairers" 
          value={stats.totalRepairers} 
          change={growth.totalRepairers}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          } 
        />
        
        <StatCard 
          title="Total Sellers" 
          value={stats.totalSellers} 
          change={growth.totalSellers}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          } 
        />
        
        <StatCard 
          title="Active Service Requests" 
          value={stats.activeServiceRequests} 
          change={growth.activeServiceRequests}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          } 
        />
        
        <StatCard 
          title="Completed Services" 
          value={stats.completedServices} 
          change={growth.completedServices}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          } 
        />
        
        <StatCard 
          title="Products Listed" 
          value={stats.productsListed} 
          change={growth.productsListed}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          } 
        />
      </div>

      {/* Recent Activity Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">John Smith signed up as a vehicle owner</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">10 minutes ago</span>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Service request completed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Oil change service by Premium Auto Repair</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">35 minutes ago</span>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">New repairer approved</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Elite Auto Mechanics has joined the platform</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</span>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full">
                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">System alert</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">High number of failed payment attempts detected</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</span>
              </div>
            </li>
            <li className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">User reported issue</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Service payment dispute opened by customer</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">1 day ago</span>
              </div>
            </li>
          </ul>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline">View All Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
}
