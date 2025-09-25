'use client';

import { FormDataType } from '@/types/settings';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

interface AppearanceSettingsProps {
  id: string;
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
}

export default function AppearanceSettings({
  id = 'appearance',
  formData,
  setFormData
}: AppearanceSettingsProps) {
  // Initialize appearance preferences if they don't exist
  const appearance = formData.appearance || {
    theme: 'system',
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false,
    compactView: false
  };

  const handleThemeChange = (theme: string) => {
    setFormData({
      ...formData,
      appearance: {
        ...formData.appearance,
        theme
      }
    });
  };

  const handleFontSizeChange = (fontSize: string) => {
    setFormData({
      ...formData,
      appearance: {
        ...formData.appearance,
        fontSize
      }
    });
  };

  const handleCheckboxChange = (setting: string, checked: boolean) => {
    setFormData({
      ...formData,
      appearance: {
        ...formData.appearance,
        [setting]: checked
      }
    });
  };

  return (
    <div id={id} className="space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2 mb-4">Appearance Settings</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Customize how ShopMeco looks and feels for you.
      </p>
      
      {/* Theme Selection */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Theme</Label>
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div 
            className={`border rounded-lg p-3 cursor-pointer transition ${
              appearance.theme === 'light' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <div className="h-24 bg-white border mb-2 rounded overflow-hidden">
              <div className="h-6 bg-gray-100 border-b"></div>
              <div className="p-2">
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="text-sm font-medium text-center">Light</div>
          </div>
          
          <div 
            className={`border rounded-lg p-3 cursor-pointer transition ${
              appearance.theme === 'dark' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <div className="h-24 bg-gray-800 border mb-2 rounded overflow-hidden">
              <div className="h-6 bg-gray-900 border-b"></div>
              <div className="p-2">
                <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
            <div className="text-sm font-medium text-center">Dark</div>
          </div>
          
          <div 
            className={`border rounded-lg p-3 cursor-pointer transition ${
              appearance.theme === 'system' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => handleThemeChange('system')}
          >
            <div className="h-24 bg-gradient-to-r from-white to-gray-800 border mb-2 rounded overflow-hidden">
              <div className="h-6 bg-gradient-to-r from-gray-100 to-gray-900 border-b"></div>
              <div className="p-2 flex">
                <div className="w-1/2">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-1/2">
                  <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="text-sm font-medium text-center">System</div>
          </div>
        </div>
      </div>
      
      {/* Font Size */}
      <div className="space-y-2 pt-4">
        <Label className="text-base font-medium">Font Size</Label>
        <div className="flex space-x-4 pt-2">
          {['small', 'medium', 'large', 'x-large'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleFontSizeChange(size)}
              className={`px-4 py-2 rounded-md border ${
                appearance.fontSize === size
                  ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/40 dark:border-blue-500 dark:text-blue-300'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50'
              }`}
            >
              <span className={`
                ${size === 'small' && 'text-sm'}
                ${size === 'medium' && 'text-base'}
                ${size === 'large' && 'text-lg'}
                ${size === 'x-large' && 'text-xl'}
              `}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Accessibility and Display Options */}
      <div className="space-y-4 pt-4">
        <Label className="text-base font-medium">Accessibility & Display</Label>
        
        <div className="space-y-3 pt-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="reducedMotion"
              checked={appearance.reducedMotion || false}
              onChange={(e) => handleCheckboxChange('reducedMotion', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="reducedMotion" className="ml-2 block text-sm">
              Reduced motion (minimize animations)
            </Label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="highContrast"
              checked={appearance.highContrast || false}
              onChange={(e) => handleCheckboxChange('highContrast', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="highContrast" className="ml-2 block text-sm">
              High contrast mode
            </Label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="compactView"
              checked={appearance.compactView || false}
              onChange={(e) => handleCheckboxChange('compactView', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="compactView" className="ml-2 block text-sm">
              Compact view (reduced spacing between elements)
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
