'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import DashboardHeader from '@/components/ui/dashboard-header';

interface SettingsLayoutProps {
  heading?: string;
  description?: string;
  tabs: {
    id: string;
    label: string;
    component: React.ReactNode;
  }[];
  onSave: (data: unknown) => Promise<void>;
  isSaving?: boolean;
  saveSuccess?: boolean;
  saveError?: string;
}

export default function SettingsLayout({
  heading = 'Settings',
  description = 'Manage your account settings and preferences.',
  tabs,
  onSave,
  isSaving = false,
  saveSuccess = false,
  saveError = ''
}: SettingsLayoutProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader 
        userType={user?.role === 'VEHICLE_OWNER' ? 'vehicle-owner' : 
                 user?.role === 'REPAIRER' ? 'repairer' :
                 user?.role === 'SELLER' ? 'seller' : 
                 user?.role === 'ADMIN' ? 'admin' : 'vehicle-owner'} 
        userName={user?.name || 'User'} 
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{heading}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>

        {/* Tabs navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-3 px-1 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${activeTab === tab.id ? 'block' : 'hidden'}`}
            >
              {tab.component}
            </div>
          ))}
        </div>

        {/* Success and error messages */}
        {saveSuccess && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-md mt-6">
            Settings saved successfully!
          </div>
        )}

        {saveError && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-md mt-6">
            {saveError}
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={() => onSave({})}
            disabled={isSaving}
            className="px-4 py-2"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
