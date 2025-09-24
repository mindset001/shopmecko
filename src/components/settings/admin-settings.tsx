'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface AdminSettingsProps {
  id: string;
  formData: any;
  setFormData: (data: any) => void;
}

export default function AdminSettings({
  id = 'admin',
  formData,
  setFormData
}: AdminSettingsProps) {
  // Initialize admin settings if they don't exist
  const adminSettings = formData.adminSettings || {
    userApprovalRequired: true,
    autoSuspendThreshold: 3,
    maintenanceMode: false,
    maintenanceMessage: 'The system is currently undergoing scheduled maintenance. Please check back later.',
    systemLoggingLevel: 'info',
    dataRetentionPeriod: 90,
    autoBackupFrequency: 'daily',
    maxFileUploadSize: 10,
    enableBetaFeatures: false,
    sellerVerificationRequired: true,
    repairerVerificationRequired: true
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      adminSettings: {
        ...formData.adminSettings,
        [field]: value
      }
    });
  };

  const handleNumberChange = (field: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setFormData({
      ...formData,
      adminSettings: {
        ...formData.adminSettings,
        [field]: numValue
      }
    });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData({
      ...formData,
      adminSettings: {
        ...formData.adminSettings,
        [field]: checked
      }
    });
  };

  return (
    <div id={id} className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Admin Settings</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Configure system-wide settings and policies.
      </p>
      
      {/* User Management */}
      <div className="space-y-3">
        <h3 className="text-md font-medium">User Management</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="userApprovalRequired"
            checked={adminSettings.userApprovalRequired || false}
            onChange={(e) => handleCheckboxChange('userApprovalRequired', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="userApprovalRequired" className="ml-2 block text-sm">
            Require admin approval for new user registrations
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sellerVerificationRequired"
            checked={adminSettings.sellerVerificationRequired || false}
            onChange={(e) => handleCheckboxChange('sellerVerificationRequired', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="sellerVerificationRequired" className="ml-2 block text-sm">
            Require verification for seller accounts
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="repairerVerificationRequired"
            checked={adminSettings.repairerVerificationRequired || false}
            onChange={(e) => handleCheckboxChange('repairerVerificationRequired', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="repairerVerificationRequired" className="ml-2 block text-sm">
            Require verification for repairer accounts
          </Label>
        </div>
        
        <div className="pt-2">
          <Label htmlFor="autoSuspendThreshold" className="text-sm font-medium">Auto-Suspension Threshold</Label>
          <div className="flex items-center mt-1">
            <Input
              id="autoSuspendThreshold"
              type="number"
              min="0"
              max="10"
              value={adminSettings.autoSuspendThreshold || 3}
              onChange={(e) => handleNumberChange('autoSuspendThreshold', e.target.value)}
              className="max-w-[120px]"
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Number of reports before automatic account suspension
            </span>
          </div>
        </div>
      </div>
      
      {/* System Settings */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">System Settings</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="maintenanceMode"
            checked={adminSettings.maintenanceMode || false}
            onChange={(e) => handleCheckboxChange('maintenanceMode', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="maintenanceMode" className="ml-2 block text-sm">
            Enable maintenance mode
          </Label>
        </div>
        
        {adminSettings.maintenanceMode && (
          <div className="pl-6 pt-2">
            <Label htmlFor="maintenanceMessage" className="text-sm font-medium">Maintenance Message</Label>
            <Input
              id="maintenanceMessage"
              type="text"
              value={adminSettings.maintenanceMessage || ''}
              onChange={(e) => handleInputChange('maintenanceMessage', e.target.value)}
              className="mt-1"
            />
          </div>
        )}
        
        <div className="flex items-center pt-2">
          <input
            type="checkbox"
            id="enableBetaFeatures"
            checked={adminSettings.enableBetaFeatures || false}
            onChange={(e) => handleCheckboxChange('enableBetaFeatures', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="enableBetaFeatures" className="ml-2 block text-sm">
            Enable beta features platform-wide
          </Label>
        </div>
        
        <div className="pt-2">
          <Label htmlFor="systemLoggingLevel" className="text-sm font-medium">System Logging Level</Label>
          <select
            id="systemLoggingLevel"
            value={adminSettings.systemLoggingLevel || 'info'}
            onChange={(e) => handleInputChange('systemLoggingLevel', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
            <option value="verbose">Verbose</option>
          </select>
        </div>
      </div>
      
      {/* Data Management */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Data Management</h3>
        
        <div>
          <Label htmlFor="dataRetentionPeriod" className="text-sm font-medium">Data Retention Period (days)</Label>
          <div className="flex items-center mt-1">
            <Input
              id="dataRetentionPeriod"
              type="number"
              min="30"
              max="365"
              value={adminSettings.dataRetentionPeriod || 90}
              onChange={(e) => handleNumberChange('dataRetentionPeriod', e.target.value)}
              className="max-w-[120px]"
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Number of days to retain user activity data
            </span>
          </div>
        </div>
        
        <div className="pt-2">
          <Label htmlFor="autoBackupFrequency" className="text-sm font-medium">Automatic Backup Frequency</Label>
          <select
            id="autoBackupFrequency"
            value={adminSettings.autoBackupFrequency || 'daily'}
            onChange={(e) => handleInputChange('autoBackupFrequency', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <div className="pt-2">
          <Label htmlFor="maxFileUploadSize" className="text-sm font-medium">Max File Upload Size (MB)</Label>
          <div className="flex items-center mt-1">
            <Input
              id="maxFileUploadSize"
              type="number"
              min="1"
              max="100"
              value={adminSettings.maxFileUploadSize || 10}
              onChange={(e) => handleNumberChange('maxFileUploadSize', e.target.value)}
              className="max-w-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
