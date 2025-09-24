'use client';

import { useState } from 'react';
import SettingsLayout from '@/components/ui/settings-layout';
import GeneralSettings from '@/components/settings/general-settings';
import SecuritySettings from '@/components/settings/security-settings';
import NotificationSettings from '@/components/settings/notification-settings';
import AppearanceSettings from '@/components/settings/appearance-settings';
import RepairerSettings from '@/components/settings/repairer-settings';

export default function RepairerSettingsPage() {
  // Mock user data
  const [formData, setFormData] = useState({
    // General settings
    language: 'english',
    timezone: 'UTC-5',
    dateFormat: 'MM/DD/YYYY',
    contactEmail: 'mike.smith@example.com',
    address: '456 Repair Ave, Workshop City, Country',
    
    // Security settings
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: '60',
    deviceManagement: {
      currentDevice: {
        name: 'Chrome on MacOS',
        lastActive: '2023-07-18T14:20:00Z',
        location: 'Los Angeles, USA',
      }
    },
    
    // Notification settings
    notifications: {
      account: { email: true, push: true, sms: true },
      updates: { email: true, push: false, sms: false },
      promotions: { email: false, push: false, sms: false },
      security: { email: true, push: true, sms: true },
      serviceUpdates: { email: true, push: true, sms: true }
    },
    notificationPreferences: {
      digestEmails: true,
      quietHours: true
    },
    
    // Appearance settings
    appearance: {
      theme: 'dark',
      fontSize: 'medium',
      reducedMotion: false,
      highContrast: false,
      compactView: true
    },
    
    // Repairer specific settings
    repairerSettings: {
      serviceArea: 30,
      autoAcceptBookings: false,
      showAvailableSlots: true,
      offerMobileService: true,
      offerPickupService: true,
      autoOrderParts: false,
      instantQuotes: true,
      diagnosticToolIntegration: true,
      blockBookingSlots: 2,
      minimumLeadTime: 12
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  
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
    repairerSettings: {
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
  };
  
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
      id: 'repairer',
      label: 'Workshop Settings',
      component: <RepairerSettings id="repairer" formData={formData} setFormData={setFormData} />
    }
  ];
  
  return (
    <SettingsLayout 
      heading="Workshop Settings"
      description="Manage your workshop profile, services, and preferences."
      tabs={tabs}
      onSave={handleSave}
      isSaving={isSaving}
      saveSuccess={saveSuccess}
      saveError={saveError}
    />
  );
}
