'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface GeneralSettingsProps {
  id: string;
  formData: any;
  setFormData: (data: any) => void;
}

export default function GeneralSettings({ 
  id = 'general',
  formData, 
  setFormData 
}: GeneralSettingsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      language: e.target.value
    });
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      timezone: e.target.value
    });
  };

  return (
    <div id={id} className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">General Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Language
          </Label>
          <select
            id="language"
            name="language"
            value={formData.language || 'en-US'}
            onChange={handleLanguageChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese (Simplified)</option>
            <option value="ja">Japanese</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Timezone
          </Label>
          <select
            id="timezone"
            name="timezone"
            value={formData.timezone || 'America/New_York'}
            onChange={handleTimezoneChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
          >
            <option value="America/New_York">Eastern Time (US & Canada)</option>
            <option value="America/Chicago">Central Time (US & Canada)</option>
            <option value="America/Denver">Mountain Time (US & Canada)</option>
            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
            <option value="America/Anchorage">Alaska</option>
            <option value="Pacific/Honolulu">Hawaii</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
            <option value="Australia/Sydney">Sydney</option>
          </select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date Format
        </Label>
        <select
          id="dateFormat"
          name="dateFormat"
          value={formData.dateFormat || 'MM/DD/YYYY'}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
        >
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Choose how dates are displayed throughout the application.
        </p>
      </div>
    </div>
  );
}
