'use client';

// Define FormData type based on the state structure
type FormDataType = {
  language: string;
  timezone: string;
  dateFormat: string;
  contactEmail: string;
  address: string;
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  sessionTimeout: string;
  deviceManagement: {
    currentDevice: {
      name: string;
      lastActive: string;
      location: string;
    }
  };
  notifications: {
    account: { email: boolean; push: boolean; sms: boolean };
    updates: { email: boolean; push: boolean; sms: boolean };
    promotions: { email: boolean; push: boolean; sms: boolean };
    security: { email: boolean; push: boolean; sms: boolean };
    serviceUpdates: { email: boolean; push: boolean; sms: boolean };
  };
  notificationPreferences: {
    digestEmails: boolean;
    quietHours: boolean;
  };
  appearance: {
    theme: string;
    fontSize: string;
    reducedMotion: boolean;
    highContrast: boolean;
    compactView: boolean;
  };
  repairerSettings?: {
    serviceArea: number;
    autoAcceptBookings: boolean;
    showAvailableSlots: boolean;
    offerMobileService: boolean;
    offerPickupService: boolean;
    autoOrderParts: boolean;
    instantQuotes: boolean;
    diagnosticToolIntegration: boolean;
    blockBookingSlots: number;
    minimumLeadTime: number;
  };
  sellerSettings?: {
    acceptReturns: boolean;
    shippingOptions: string[];
    offerPickup: boolean;
    offerInstallation: boolean;
    offerWarranty: boolean;
    warrantyPeriod: string;
    returnsWindow: number;
    restockingFee: number;
    autoAcceptOrders: boolean;
  };
  vehicleOwnerSettings?: {
    shareMaintenanceHistory: boolean;
    reminderFrequency: string;
    autoSchedule: boolean;
    preferredRepairers: string[];
    preferredPartsBrands: string[];
  };
  // Admin specific settings
  adminSettings?: {
    systemEmail: string;
    maintenanceMode: boolean;
    loggingLevel: string;
    analyticsEnabled: boolean;
    backupFrequency: string;
  };
};

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SellerSettingsProps {
  id: string;
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

export default function SellerSettings({
  id = 'seller',
  formData,
  setFormData
}: SellerSettingsProps) {
  // Initialize seller settings if they don&apos;t exist
  const sellerSettings = formData.sellerSettings || {
    shippingRadius: 100,
    minOrderValue: 10,
    freeShippingThreshold: 50,
    autoAcceptOrders: false,
    showStockLevels: true,
    allowPickups: true,
    bulkDiscounts: true,
    offerExpeditedShipping: true,
    lowStockThreshold: 5,
    autoRestock: false,
    partCompatibilityCheck: true
  };

  const handleNumberChange = (field: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    setFormData({
      ...formData,
      sellerSettings: {
        ...formData.sellerSettings,
        [field]: numValue
      }
    });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData({
      ...formData,
      sellerSettings: {
        ...formData.sellerSettings,
        [field]: checked
      }
    });
  };

  return (
    <div id={id} className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Seller Settings</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Customize your store and order fulfillment settings.
      </p>
      
      {/* Shipping and Order Settings */}
      <div className="space-y-2">
        <Label htmlFor="shippingRadius" className="text-sm font-medium">Shipping Radius (km)</Label>
        <div className="flex items-center">
          <Input
            id="shippingRadius"
            type="number"
            min="1"
            max="1000"
            value={sellerSettings.shippingRadius || 100}
            onChange={(e) => handleNumberChange('shippingRadius', e.target.value)}
            className="max-w-[120px]"
          />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Maximum distance you&apos;re willing to ship to
          </span>
        </div>
      </div>
      
      <div className="space-y-2 pt-3">
        <Label htmlFor="minOrderValue" className="text-sm font-medium">Minimum Order Value</Label>
        <div className="flex items-center">
          <Input
            id="minOrderValue"
            type="number"
            min="0"
            step="0.01"
            value={sellerSettings.minOrderValue || 10}
            onChange={(e) => handleNumberChange('minOrderValue', e.target.value)}
            className="max-w-[120px]"
          />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Minimum amount required for checkout
          </span>
        </div>
      </div>
      
      <div className="space-y-2 pt-3">
        <Label htmlFor="freeShippingThreshold" className="text-sm font-medium">Free Shipping Threshold</Label>
        <div className="flex items-center">
          <Input
            id="freeShippingThreshold"
            type="number"
            min="0"
            step="0.01"
            value={sellerSettings.freeShippingThreshold || 50}
            onChange={(e) => handleNumberChange('freeShippingThreshold', e.target.value)}
            className="max-w-[120px]"
          />
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Order value at which free shipping is offered
          </span>
        </div>
      </div>
      
      {/* Order Management */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Order Management</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoAcceptOrders"
            checked={sellerSettings.autoAcceptOrders || false}
            onChange={(e) => handleCheckboxChange('autoAcceptOrders', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="autoAcceptOrders" className="ml-2 block text-sm">
            Automatically accept orders when payment is confirmed
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowPickups"
            checked={sellerSettings.allowPickups || false}
            onChange={(e) => handleCheckboxChange('allowPickups', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="allowPickups" className="ml-2 block text-sm">
            Allow in-store pickups
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="offerExpeditedShipping"
            checked={sellerSettings.offerExpeditedShipping || false}
            onChange={(e) => handleCheckboxChange('offerExpeditedShipping', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="offerExpeditedShipping" className="ml-2 block text-sm">
            Offer expedited shipping options
          </Label>
        </div>
      </div>
      
      {/* Inventory Management */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Inventory Management</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showStockLevels"
            checked={sellerSettings.showStockLevels || false}
            onChange={(e) => handleCheckboxChange('showStockLevels', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="showStockLevels" className="ml-2 block text-sm">
            Show inventory levels to customers
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoRestock"
            checked={sellerSettings.autoRestock || false}
            onChange={(e) => handleCheckboxChange('autoRestock', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="autoRestock" className="ml-2 block text-sm">
            Enable automatic reordering when inventory is low
          </Label>
        </div>
        
        <div className="pt-2">
          <Label htmlFor="lowStockThreshold" className="text-sm font-medium">Low Stock Threshold</Label>
          <div className="flex items-center mt-1">
            <Input
              id="lowStockThreshold"
              type="number"
              min="1"
              max="100"
              value={sellerSettings.lowStockThreshold || 5}
              onChange={(e) => handleNumberChange('lowStockThreshold', e.target.value)}
              className="max-w-[120px]"
            />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Inventory level that triggers low stock alerts
            </span>
          </div>
        </div>
      </div>
      
      {/* Pricing and Compatibility */}
      <div className="space-y-3 pt-4">
        <h3 className="text-md font-medium">Pricing & Compatibility</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="bulkDiscounts"
            checked={sellerSettings.bulkDiscounts || false}
            onChange={(e) => handleCheckboxChange('bulkDiscounts', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="bulkDiscounts" className="ml-2 block text-sm">
            Enable bulk purchase discounts
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="partCompatibilityCheck"
            checked={sellerSettings.partCompatibilityCheck || false}
            onChange={(e) => handleCheckboxChange('partCompatibilityCheck', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="partCompatibilityCheck" className="ml-2 block text-sm">
            Enable automatic part compatibility checking
          </Label>
        </div>
      </div>
    </div>
  );
}
