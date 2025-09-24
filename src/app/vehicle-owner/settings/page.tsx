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

import { useState, useCallback } from 'react';
import SettingsLayout from '@/components/ui/settings-layout';
import GeneralSettings from '@/components/settings/general-settings';
import SecuritySettings from '@/components/settings/security-settings';
import NotificationSettings from '@/components/settings/notification-settings';
import AppearanceSettings from '@/components/settings/appearance-settings';
import VehicleOwnerSettings from '@/components/settings/vehicle-owner-settings';

export default function VehicleOwnerSettingsPage() {
  // Mock user data
  const [formData, setFormData] = useState({
    // General settings
    language: 'english',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    contactEmail: 'john.doe@example.com',
    address: '123 Main St, City, Country',
    
    // Security settings
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: '30',
    deviceManagement: {
      currentDevice: {
        name: 'Chrome on Windows',
        lastActive: '2023-07-15T10:30:00Z',
        location: 'New York, USA',
      }
    },
    
    // Notification settings
    notifications: {
      account: { email: true, push: true, sms: false },
      updates: { email: true, push: false, sms: false },
      promotions: { email: false, push: false, sms: false },
      security: { email: true, push: true, sms: true },
      serviceUpdates: { email: true, push: true, sms: false }
    },
    notificationPreferences: {
      digestEmails: false,
      quietHours: true
    },
    
    // Appearance settings
    appearance: {
      theme: 'system',
      fontSize: 'medium',
      reducedMotion: false,
      highContrast: false,
      compactView: false
    },
    
    // Vehicle owner specific settings
    vehicleOwnerSettings: {
      shareMaintenanceHistory: false,
      reminderFrequency: 'weekly',
      autoSchedule: false,
      preferredRepairers: [],
      preferredPartsBrands: []
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  
  // Create a wrapper function to match the expected prop type
  const handleFormDataChange = useCallback((data: FormDataType) => {
    setFormData(data);
  }, []);
  
  const handleSave = async (data: unknown) => {
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
        console.log('Saving settings:', data as FormDataType);
  const tabs = [
    {
      id: 'general',
      label: 'General',
      component: <GeneralSettings id="general" formData={formData} setFormData={handleFormDataChange} />
    },
    {
      id: 'security',
      label: 'Security & Privacy',
      component: <SecuritySettings id="security" formData={formData} setFormData={handleFormDataChange} />
    },
    {
      id: 'notifications',
      label: 'Notifications',
      component: <NotificationSettings id="notifications" formData={formData} setFormData={handleFormDataChange} />
    },
    {
      id: 'appearance',
      label: 'Appearance',
      component: <AppearanceSettings id="appearance" formData={formData} setFormData={handleFormDataChange} />
    },
    {
      id: 'vehicle-owner',
      label: 'Vehicle Owner',
      component: <VehicleOwnerSettings id="vehicle-owner" formData={formData} setFormData={handleFormDataChange} />
    }
  ];
  
  return (
    <SettingsLayout 
      heading="Vehicle Settings"
      description="Manage your account settings and vehicle preferences."
      tabs={tabs}
      onSave={handleSave}
      isSaving={isSaving}
      saveSuccess={saveSuccess}
      saveError={saveError}
    />
  );
}
