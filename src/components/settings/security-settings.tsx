'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SecuritySettingsProps {
  id: string;
  formData: any;
  setFormData: (data: any) => void;
}

export default function SecuritySettings({ 
  id = 'security', 
  formData, 
  setFormData 
}: SecuritySettingsProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      security: {
        ...formData.security,
        [name]: checked
      }
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      passwords: {
        ...formData.passwords,
        [name]: value
      }
    });
  };

  const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      security: {
        ...formData.security,
        sessionTimeout: e.target.value
      }
    });
  };

  return (
    <div id={id} className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Security & Privacy</h2>
      
      <div className="space-y-4">
        <h3 className="text-md font-medium">Account Security</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="twoFactorAuth"
            name="twoFactorAuth"
            checked={formData.security?.twoFactorAuth || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Enable Two-Factor Authentication
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="loginNotifications"
            name="loginNotifications"
            checked={formData.security?.loginNotifications || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="loginNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Email me when there's a new login to my account
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="activityAlerts"
            name="activityAlerts"
            checked={formData.security?.activityAlerts || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="activityAlerts" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Enable account activity alerts
          </Label>
        </div>
      </div>
      
      <div className="pt-4 space-y-4">
        <h3 className="text-md font-medium">Session Management</h3>
        
        <div>
          <Label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Session Timeout
          </Label>
          <select
            id="sessionTimeout"
            name="sessionTimeout"
            value={formData.security?.sessionTimeout || '30m'}
            onChange={handleSessionChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
          >
            <option value="15m">15 minutes</option>
            <option value="30m">30 minutes</option>
            <option value="1h">1 hour</option>
            <option value="2h">2 hours</option>
            <option value="4h">4 hours</option>
            <option value="8h">8 hours</option>
            <option value="24h">24 hours</option>
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            You will be logged out after this period of inactivity.
          </p>
        </div>
        
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
        >
          Sign out from all other sessions
        </button>
      </div>
      
      <div className="pt-4 space-y-4">
        <h3 className="text-md font-medium">Change Password</h3>
        
        <div>
          <Label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Current Password
          </Label>
          <Input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.passwords?.currentPassword || ''}
            onChange={handlePasswordChange}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Password
          </Label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.passwords?.newPassword || ''}
            onChange={handlePasswordChange}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm New Password
          </Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.passwords?.confirmPassword || ''}
            onChange={handlePasswordChange}
            className="w-full"
          />
        </div>
        
        <div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={
              !formData.passwords?.currentPassword || 
              !formData.passwords?.newPassword || 
              formData.passwords?.newPassword !== formData.passwords?.confirmPassword
            }
          >
            Update Password
          </button>
        </div>
      </div>
      
      <div className="pt-4 space-y-4">
        <h3 className="text-md font-medium">Privacy</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="shareUsageData"
            name="shareUsageData"
            checked={formData.security?.shareUsageData || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="shareUsageData" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Share anonymous usage data to help improve the platform
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="allowCookies"
            name="allowCookies"
            checked={formData.security?.allowCookies || false}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="allowCookies" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Allow non-essential cookies
          </Label>
        </div>
      </div>
    </div>
  );
}
