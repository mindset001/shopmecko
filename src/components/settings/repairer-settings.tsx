'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface RepairerSettingsProps {
  id: string;
  formData: any;
  setFormData: (data: any) => void;
}

export default function RepairerSettings({
  id = 'repairer',
  formData,
  setFormData
}: RepairerSettingsProps) {
  // Initialize repairer settings if they don't exist
  const repairerSettings = formData.repairerSettings || {
    serviceArea: 30,
    autoAcceptBookings: false,
    showAvailableSlots: true,
    offerMobileService: false,
    offerPickupService: false,
    autoOrderParts: false,
    instantQuotes: true,
    diagnosticToolIntegration: false,
    blockBookingSlots: 1, // Hours per booking slot
    minimumLeadTime: 24 // Hours
  };

  const handleNumberChange = (field: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setFormData({
      ...formData,
      repairerSettings: {
        ...formData.repairerSettings,
        [field]: numValue
      }
    });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData({
      ...formData,
      repairerSettings: {
        ...formData.repairerSettings,
        [field]: checked
      }
    });
  };

  return (
    <div id={id} className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Repairer Settings</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Customize your workshop and service delivery settings.
      </p>
      
      {/* Service Area */}
      <div className="space-y-2">
        <Label htmlFor="serviceArea" className="text-sm font-medium">Service Area Radius (km)</Label>
        <div className="flex items-center">
          <Input
            id="serviceArea"
            type="number"
            min="1"
            max="200"
            value={repairerSettings.serviceArea || 30}
            onChange={(e) => handleNumberChange('serviceArea', e.target.value)}
            className="max-w-[120px]"
          />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Maximum distance you're willing to service
          </span>
        </div>
      </div>
      
      {/* Booking Settings */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Booking Settings</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoAcceptBookings"
            checked={repairerSettings.autoAcceptBookings || false}
            onChange={(e) => handleCheckboxChange('autoAcceptBookings', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="autoAcceptBookings" className="ml-2 block text-sm">
            Automatically accept bookings that fit your schedule
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showAvailableSlots"
            checked={repairerSettings.showAvailableSlots || false}
            onChange={(e) => handleCheckboxChange('showAvailableSlots', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="showAvailableSlots" className="ml-2 block text-sm">
            Show available booking slots on your public profile
          </Label>
        </div>
        
        <div className="pt-2">
          <Label htmlFor="blockBookingSlots" className="text-sm font-medium">Booking Slot Duration (hours)</Label>
          <div className="flex items-center mt-1">
            <Input
              id="blockBookingSlots"
              type="number"
              min="0.5"
              step="0.5"
              max="8"
              value={repairerSettings.blockBookingSlots || 1}
              onChange={(e) => handleNumberChange('blockBookingSlots', e.target.value)}
              className="max-w-[120px]"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <Label htmlFor="minimumLeadTime" className="text-sm font-medium">Minimum Lead Time (hours)</Label>
          <div className="flex items-center mt-1">
            <Input
              id="minimumLeadTime"
              type="number"
              min="1"
              max="72"
              value={repairerSettings.minimumLeadTime || 24}
              onChange={(e) => handleNumberChange('minimumLeadTime', e.target.value)}
              className="max-w-[120px]"
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Minimum notice required for bookings
            </span>
          </div>
        </div>
      </div>
      
      {/* Service Offerings */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Service Offerings</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="offerMobileService"
            checked={repairerSettings.offerMobileService || false}
            onChange={(e) => handleCheckboxChange('offerMobileService', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="offerMobileService" className="ml-2 block text-sm">
            Offer mobile repair services
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="offerPickupService"
            checked={repairerSettings.offerPickupService || false}
            onChange={(e) => handleCheckboxChange('offerPickupService', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="offerPickupService" className="ml-2 block text-sm">
            Offer vehicle pickup and delivery service
          </Label>
        </div>
      </div>
      
      {/* Parts and Diagnostics */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Parts & Diagnostics</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoOrderParts"
            checked={repairerSettings.autoOrderParts || false}
            onChange={(e) => handleCheckboxChange('autoOrderParts', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="autoOrderParts" className="ml-2 block text-sm">
            Automatically order parts for confirmed repairs
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="instantQuotes"
            checked={repairerSettings.instantQuotes || false}
            onChange={(e) => handleCheckboxChange('instantQuotes', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="instantQuotes" className="ml-2 block text-sm">
            Provide instant quotes for common repairs
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="diagnosticToolIntegration"
            checked={repairerSettings.diagnosticToolIntegration || false}
            onChange={(e) => handleCheckboxChange('diagnosticToolIntegration', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="diagnosticToolIntegration" className="ml-2 block text-sm">
            Enable diagnostic tool integration
          </Label>
        </div>
      </div>
    </div>
  );
}
