'use client';

import { FormDataType } from '@/types/settings';
import { Label } from '@/components/ui/label';

interface NotificationSettingsProps {
  id: string;
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

export default function NotificationSettings({ 
  id = 'notifications', 
  formData, 
  setFormData 
}: NotificationSettingsProps) {
  const handleCheckboxChange = (category: string, channel: string, checked: boolean) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [category]: {
          ...formData.notifications?.[category],
          [channel]: checked
        }
      }
    });
  };

  // Make sure we have all the notification categories
  const notifications = formData.notifications || {
    account: { email: true, push: true, sms: false },
    updates: { email: true, push: false, sms: false },
    promotions: { email: false, push: false, sms: false },
    security: { email: true, push: true, sms: true },
    serviceUpdates: { email: true, push: true, sms: false }
  };

  return (
    <div id={id} className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Notification Settings</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Choose how and when you want to be notified.
      </p>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50">
            <th className="text-left p-3 font-medium text-sm">Notification Type</th>
            <th className="text-center p-3 font-medium text-sm">Email</th>
            <th className="text-center p-3 font-medium text-sm">Push</th>
            <th className="text-center p-3 font-medium text-sm">SMS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
            <td className="p-3">
              <div className="font-medium">Account</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Updates about your account status</div>
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.account?.email || false}
                onChange={(e) => handleCheckboxChange('account', 'email', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.account?.push || false}
                onChange={(e) => handleCheckboxChange('account', 'push', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.account?.sms || false}
                onChange={(e) => handleCheckboxChange('account', 'sms', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
          </tr>
          
          <tr>
            <td className="p-3">
              <div className="font-medium">Updates & News</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Product updates, new features, and news</div>
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.updates?.email || false}
                onChange={(e) => handleCheckboxChange('updates', 'email', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.updates?.push || false}
                onChange={(e) => handleCheckboxChange('updates', 'push', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.updates?.sms || false}
                onChange={(e) => handleCheckboxChange('updates', 'sms', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
          </tr>
          
          <tr>
            <td className="p-3">
              <div className="font-medium">Promotions</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Deals, discounts, and promotional offers</div>
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.promotions?.email || false}
                onChange={(e) => handleCheckboxChange('promotions', 'email', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.promotions?.push || false}
                onChange={(e) => handleCheckboxChange('promotions', 'push', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.promotions?.sms || false}
                onChange={(e) => handleCheckboxChange('promotions', 'sms', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
          </tr>
          
          <tr>
            <td className="p-3">
              <div className="font-medium">Security Alerts</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Important security notifications</div>
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.security?.email || false}
                onChange={(e) => handleCheckboxChange('security', 'email', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.security?.push || false}
                onChange={(e) => handleCheckboxChange('security', 'push', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.security?.sms || false}
                onChange={(e) => handleCheckboxChange('security', 'sms', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
          </tr>
          
          <tr>
            <td className="p-3">
              <div className="font-medium">Service Updates</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Updates about services and appointments</div>
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.serviceUpdates?.email || false}
                onChange={(e) => handleCheckboxChange('serviceUpdates', 'email', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.serviceUpdates?.push || false}
                onChange={(e) => handleCheckboxChange('serviceUpdates', 'push', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td className="text-center p-3">
              <input
                type="checkbox"
                checked={notifications.serviceUpdates?.sms || false}
                onChange={(e) => handleCheckboxChange('serviceUpdates', 'sms', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
          </tr>
        </tbody>
      </table>
      
      <div className="pt-4">
        <h3 className="text-md font-medium mb-2">Notification Preferences</h3>
        
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="digestEmails"
            checked={formData.notificationPreferences?.digestEmails || false}
            onChange={(e) => setFormData({
              ...formData,
              notificationPreferences: {
                ...formData.notificationPreferences,
                digestEmails: e.target.checked
              }
            })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="digestEmails" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Receive daily digest emails instead of individual notifications
          </Label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="quietHours"
            checked={formData.notificationPreferences?.quietHours || false}
            onChange={(e) => setFormData({
              ...formData,
              notificationPreferences: {
                ...formData.notificationPreferences,
                quietHours: e.target.checked
              }
            })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <Label htmlFor="quietHours" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Enable quiet hours (10PM - 8AM)
          </Label>
        </div>
      </div>
    </div>
  );
}
