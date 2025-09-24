'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// Mock system settings
const defaultSettings = {
  general: {
    siteName: 'ShopMeco',
    siteDescription: 'Connecting vehicle owners with mechanics and auto parts sellers.',
    contactEmail: 'support@shopmeco.com',
    supportPhone: '(555) 123-4567'
  },
  appearance: {
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico'
  },
  security: {
    requireEmailVerification: true,
    twoFactorAuthEnabled: false,
    passwordMinLength: 8,
    passwordRequireSpecialChar: true
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true
  },
  integrations: {
    googleMapsApiKey: 'MOCK_API_KEY_XXXXX',
    paymentGateway: 'stripe',
    cloudStorageProvider: 'aws'
  }
};

export default function SystemSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'general' | 'appearance' | 'security' | 'notifications' | 'integrations'>('general');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleInputChange = (
    section: keyof typeof settings,
    field: string,
    value: string | boolean | number
  ) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof typeof settings],
        [field]: value
      }
    });
  };
  
  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, you would make an API request to save the settings
    console.log('Saving settings:', settings);
    
    setIsSaving(false);
    alert('Settings saved successfully!');
  };
  
  const handleBackupDatabase = async () => {
    setIsBackupModalOpen(false);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // In a real app, this would initiate a database backup
    alert('Database backup completed successfully!');
  };
  
  const handleRestartSystem = async () => {
    setIsRestartModalOpen(false);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // In a real app, this would restart the server
    alert('System restarted successfully!');
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">System Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure platform settings and preferences</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsBackupModalOpen(true)}
          >
            Backup Database
          </Button>
          <Button 
            variant="destructive"
            onClick={() => setIsRestartModalOpen(true)}
          >
            Restart System
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <nav className="p-4">
              <ul className="space-y-1">
                {Object.keys(settings).map((section) => (
                  <li key={section}>
                    <button
                      type="button"
                      onClick={() => setActiveSection(section as any)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        activeSection === section
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            {activeSection === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">General Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.general.siteName}
                      onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                      id="siteDescription"
                      value={settings.general.siteDescription}
                      onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      value={settings.general.supportPhone}
                      onChange={(e) => handleInputChange('general', 'supportPhone', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">Appearance Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primaryColor"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                      />
                      <div 
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600" 
                        style={{ backgroundColor: settings.appearance.primaryColor }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="secondaryColor"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                      />
                      <div 
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600" 
                        style={{ backgroundColor: settings.appearance.secondaryColor }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      value={settings.appearance.logoUrl}
                      onChange={(e) => handleInputChange('appearance', 'logoUrl', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="faviconUrl">Favicon URL</Label>
                    <Input
                      id="faviconUrl"
                      value={settings.appearance.faviconUrl}
                      onChange={(e) => handleInputChange('appearance', 'faviconUrl', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">Security Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="requireEmailVerification"
                        checked={settings.security.requireEmailVerification}
                        onChange={(e) => handleInputChange('security', 'requireEmailVerification', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="twoFactorAuthEnabled"
                        checked={settings.security.twoFactorAuthEnabled}
                        onChange={(e) => handleInputChange('security', 'twoFactorAuthEnabled', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="twoFactorAuthEnabled">Enable Two-Factor Authentication</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min="6"
                      max="32"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="passwordRequireSpecialChar"
                        checked={settings.security.passwordRequireSpecialChar}
                        onChange={(e) => handleInputChange('security', 'passwordRequireSpecialChar', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="passwordRequireSpecialChar">Require Special Characters in Passwords</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">Notification Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="emailNotifications"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="smsNotifications"
                        checked={settings.notifications.smsNotifications}
                        onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="smsNotifications">Enable SMS Notifications</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="pushNotifications"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="pushNotifications">Enable Push Notifications</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="adminAlerts"
                        checked={settings.notifications.adminAlerts}
                        onChange={(e) => handleInputChange('notifications', 'adminAlerts', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="adminAlerts">Enable Admin Alerts</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'integrations' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">Integration Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="googleMapsApiKey">Google Maps API Key</Label>
                    <Input
                      id="googleMapsApiKey"
                      type="password"
                      value={settings.integrations.googleMapsApiKey}
                      onChange={(e) => handleInputChange('integrations', 'googleMapsApiKey', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paymentGateway">Payment Gateway</Label>
                    <select
                      id="paymentGateway"
                      value={settings.integrations.paymentGateway}
                      onChange={(e) => handleInputChange('integrations', 'paymentGateway', e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="stripe">Stripe</option>
                      <option value="paypal">PayPal</option>
                      <option value="square">Square</option>
                      <option value="flutterwave">Flutterwave</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cloudStorageProvider">Cloud Storage Provider</Label>
                    <select
                      id="cloudStorageProvider"
                      value={settings.integrations.cloudStorageProvider}
                      onChange={(e) => handleInputChange('integrations', 'cloudStorageProvider', e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="aws">AWS S3</option>
                      <option value="gcp">Google Cloud Storage</option>
                      <option value="azure">Azure Blob Storage</option>
                      <option value="local">Local Storage</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Restart System Modal */}
      <Dialog open={isRestartModalOpen} onOpenChange={setIsRestartModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restart System</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to restart the system? This will temporarily disrupt service for all users.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestartModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRestartSystem}>
              Restart System
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Backup Database Modal */}
      <Dialog open={isBackupModalOpen} onOpenChange={setIsBackupModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backup Database</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300">
              This will create a full backup of the database. The process may take several minutes to complete.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBackupModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBackupDatabase}>
              Start Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
