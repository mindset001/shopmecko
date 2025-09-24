'use client';

import { useState } from 'react';
import SettingsLayout from '@/components/ui/settings-layout';
import GeneralSettings from '@/components/settings/general-settings';
import SecuritySettings from '@/components/settings/security-settings';
import NotificationSettings from '@/components/settings/notification-settings';
import AppearanceSettings from '@/components/settings/appearance-settings';
import AdminSettings from '@/components/settings/admin-settings';

export default function AdminSettingsPage() {
  // Mock user data
  const [formData, setFormData] = useState({
    // General settings
    language: 'english',
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
    contactEmail: 'admin@shopmeco.com',
    address: '1 Admin Plaza, HQ City, Country',
    
    // Security settings
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: '15',
    deviceManagement: {
      currentDevice: {
        name: 'Chrome on Windows',
        lastActive: '2023-07-21T10:30:00Z',
        location: 'HQ Office, Secure Network',
      }
    },
    
    // Notification settings
    notifications: {
      account: { email: true, push: true, sms: true },
      updates: { email: true, push: true, sms: false },
      promotions: { email: false, push: false, sms: false },
      security: { email: true, push: true, sms: true },
      serviceUpdates: { email: true, push: true, sms: true }
    },
    notificationPreferences: {
      digestEmails: false,
      quietHours: false
    },
    
    // Appearance settings
    appearance: {
      theme: 'system',
      fontSize: 'medium',
      reducedMotion: false,
      highContrast: false,
      compactView: true
    },
    
    // Admin specific settings
    adminSettings: {
      userApprovalRequired: true,
      autoSuspendThreshold: 3,
      maintenanceMode: false,
      maintenanceMessage: 'The system is currently undergoing scheduled maintenance. Please check back later.',
      systemLoggingLevel: 'info',
      dataRetentionPeriod: 90,
      autoBackupFrequency: 'daily',
      maxFileUploadSize: 10,
      enableBetaFeatures: true,
      sellerVerificationRequired: true,
      repairerVerificationRequired: true
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  
  // Define a type for the form data structure
  type AdminSettingsFormData = typeof formData;
  
  const handleSave = async (data: AdminSettingsFormData) => {
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
      id: 'admin',
      label: 'System Settings',
      component: <AdminSettings id="admin" formData={formData} setFormData={setFormData} />
    }
  ];
  
  return (
    <SettingsLayout 
      heading="System Settings"
      description="Manage system-wide settings, user accounts, and platform configuration."
      tabs={tabs}
      onSave={handleSave}
      isSaving={isSaving}
      saveSuccess={saveSuccess}
      saveError={saveError}
    />
  );
}
