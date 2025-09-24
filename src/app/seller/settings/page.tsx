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
import SettingsLayout from '@/components/ui/settings-layout';
import GeneralSettings from '@/components/settings/general-settings';
import SecuritySettings from '@/components/settings/security-settings';
import NotificationSettings from '@/components/settings/notification-settings';
import AppearanceSettings from '@/components/settings/appearance-settings';
import SellerSettings from '@/components/settings/seller-settings';

export default function SellerSettingsPage() {
  // Mock user data
  const [formData, setFormData] = useState({
    // General settings
    language: 'english',
    timezone: 'UTC-8',
    dateFormat: 'MM/DD/YYYY',
    contactEmail: 'parts.store@example.com',
    address: '789 Market St, Commerce City, Country',
    
    // Security settings
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: '30',
    deviceManagement: {
      currentDevice: {
        name: 'Firefox on Windows',
        lastActive: '2023-07-20T09:15:00Z',
        location: 'Chicago, USA',
      }
    },
    
    // Notification settings
    notifications: {
      account: { email: true, push: true, sms: false },
      updates: { email: true, push: true, sms: false },
      promotions: { email: true, push: true, sms: false },
      security: { email: true, push: true, sms: true },
      serviceUpdates: { email: true, push: true, sms: false }
    },
    notificationPreferences: {
      digestEmails: false,
      quietHours: false
    },
    
    // Appearance settings
    appearance: {
      theme: 'light',
      fontSize: 'small',
      reducedMotion: false,
      highContrast: false,
      compactView: true
    },
    
    // Seller specific settings
    sellerSettings: {
      shippingRadius: 100,
      minOrderValue: 25,
      freeShippingThreshold: 100,
      autoAcceptOrders: true,
      showStockLevels: true,
      allowPickups: true,
      bulkDiscounts: true,
      offerExpeditedShipping: true,
      lowStockThreshold: 5,
      autoRestock: true,
      partCompatibilityCheck: true
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  
  const handleSave = async (data: FormDataType) => {
    setIsSaving(true);
    setSaveError('');
    
    // Mock API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => setSaveSuccess(false), 3000);
        
        // Here you would normally send the data to your API
        console.log('Saving settings:', data);
        resolve();
      }, 1000);
    });
  };
  
  const tabs = [
    {
      id: 'general',
      label: 'General',
      component: <GeneralSettings id="general" formData={formData} setFormData={setFormData} />
    },
    {
      id: 'security',
      label: 'Security & Privacy',
      component: <SecuritySettings id="security" formData={formData} setFormData={setFormData} />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      component: <NotificationSettings id="notifications" formData={formData} setFormData={setFormData} />
    },
    {
      id: 'appearance',
      label: 'Appearance',
      component: <AppearanceSettings id="appearance" formData={formData} setFormData={setFormData} />
    },
    {
      id: 'seller',
      label: 'Store Settings',
      component: <SellerSettings id="seller" formData={formData} setFormData={setFormData} />
    }
  ];
  
  return (
    <SettingsLayout 
      heading="Store Settings"
      description="Manage your store profile, inventory, and sales preferences."
      tabs={tabs}
      onSave={handleSave}
      isSaving={isSaving}
      saveSuccess={saveSuccess}
      saveError={saveError}
    />
  );
}
