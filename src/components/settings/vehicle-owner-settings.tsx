'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface VehicleOwnerSettingsProps {
  id: string;
  formData: any;
  setFormData: (data: any) => void;
}

export default function VehicleOwnerSettings({
  id = 'vehicle-owner',
  formData,
  setFormData
}: VehicleOwnerSettingsProps) {
  // Initialize vehicle owner settings if they don't exist
  const vehicleOwnerSettings = formData.vehicleOwnerSettings || {
    defaultServiceRadius: 25,
    preferredRepairers: [],
    preferredSellers: [],
    automaticServiceReminders: true,
    showPriceEstimates: true,
    shareDrivingData: false,
    receivePartSuggestions: true,
    maintenanceAlerts: true
  };

  const handleNumberChange = (field: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setFormData({
      ...formData,
      vehicleOwnerSettings: {
        ...formData.vehicleOwnerSettings,
        [field]: numValue
      }
    });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData({
      ...formData,
      vehicleOwnerSettings: {
        ...formData.vehicleOwnerSettings,
        [field]: checked
      }
    });
  };

  return (
    <div id={id} className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Vehicle Owner Settings</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Customize your vehicle maintenance and service preferences.
      </p>
      
      {/* Service Radius */}
      <div className="space-y-2">
        <Label htmlFor="defaultServiceRadius" className="text-sm font-medium">Default Service Radius (km)</Label>
        <div className="flex items-center">
          <Input
            id="defaultServiceRadius"
            type="number"
            min="1"
            max="100"
            value={vehicleOwnerSettings.defaultServiceRadius || 25}
            onChange={(e) => handleNumberChange('defaultServiceRadius', e.target.value)}
            className="max-w-[120px]"
          />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Maximum distance to search for services
          </span>
        </div>
      </div>
      
      {/* Service and Maintenance Preferences */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Service & Maintenance</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="automaticServiceReminders"
            checked={vehicleOwnerSettings.automaticServiceReminders || false}
            onChange={(e) => handleCheckboxChange('automaticServiceReminders', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="automaticServiceReminders" className="ml-2 block text-sm">
            Enable automatic service reminders based on mileage and time
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPriceEstimates"
            checked={vehicleOwnerSettings.showPriceEstimates || false}
            onChange={(e) => handleCheckboxChange('showPriceEstimates', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="showPriceEstimates" className="ml-2 block text-sm">
            Show price estimates for services and repairs
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="maintenanceAlerts"
            checked={vehicleOwnerSettings.maintenanceAlerts || false}
            onChange={(e) => handleCheckboxChange('maintenanceAlerts', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="maintenanceAlerts" className="ml-2 block text-sm">
            Receive predictive maintenance alerts
          </Label>
        </div>
      </div>
      
      {/* Parts and Products Preferences */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Parts & Products</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="receivePartSuggestions"
            checked={vehicleOwnerSettings.receivePartSuggestions || false}
            onChange={(e) => handleCheckboxChange('receivePartSuggestions', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="receivePartSuggestions" className="ml-2 block text-sm">
            Receive suggestions for compatible parts and accessories
          </Label>
        </div>
      </div>
      
      {/* Data Sharing */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Data Sharing</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="shareDrivingData"
            checked={vehicleOwnerSettings.shareDrivingData || false}
            onChange={(e) => handleCheckboxChange('shareDrivingData', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="shareDrivingData" className="ml-2 block text-sm">
            Share anonymous driving data to improve service recommendations
          </Label>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 pl-6 pt-1">
          This data helps us provide more accurate maintenance schedules based on your driving patterns
        </p>
      </div>
    </div>
  );
}
