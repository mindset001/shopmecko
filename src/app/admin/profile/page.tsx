'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProfileLayout from '@/components/ui/profile-layout';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  department: string;
  adminLevel: string;
  permissions: string[];
  lastLogin: string;
  securitySettings: {
    twoFactorEnabled: boolean;
    passwordLastChanged: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newPermission, setNewPermission] = useState('');

  useEffect(() => {
    // In a real app, fetch the profile data from an API
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for now
        setProfile({
          id: user?.id || '1',
          name: user?.name || 'Admin User',
          email: user?.email || 'admin@shopmeco.com',
          phoneNumber: '+1 (555) 123-4567',
          role: 'ADMIN',
          department: 'System Administration',
          adminLevel: 'Super Admin',
          permissions: [
            'user.manage',
            'service.manage',
            'repairer.manage',
            'seller.manage',
            'system.settings',
            'analytics.view'
          ],
          lastLogin: new Date().toISOString(),
          securitySettings: {
            twoFactorEnabled: true,
            passwordLastChanged: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
          },
          createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ago
          updatedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleSaveProfile = async (updatedProfile: AdminProfile) => {
    // In a real app, send this data to your API
    console.log('Saving profile:', updatedProfile);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setProfile(updatedProfile);
  };

  const addPermission = () => {
    if (!newPermission.trim() || !profile) return;
    
    setProfile({
      ...profile,
      permissions: [...profile.permissions, newPermission.trim()]
    });
    setNewPermission('');
  };

  const removePermission = (index: number) => {
    if (!profile) return;
    
    const newPermissions = [...profile.permissions];
    newPermissions.splice(index, 1);
    
    setProfile({
      ...profile,
      permissions: newPermissions
    });
  };

  const formatDateTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString();
    } catch (error) {
      return dateStr;
    }
  };

  if (!profile) {
    return (
      <ProfileLayout
        userType="admin"
        profileData={{}}
        onSave={async () => {}}
        isLoading={isLoading}
      />
    );
  }

  return (
    <ProfileLayout
      userType="admin"
      profileData={profile}
      onSave={handleSaveProfile}
      isLoading={isLoading}
    >
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Admin Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Department
            </Label>
            <Input
              id="department"
              name="department"
              value={profile.department}
              onChange={(e) => setProfile({...profile, department: e.target.value})}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="adminLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Admin Level
            </Label>
            <select
              id="adminLevel"
              name="adminLevel"
              value={profile.adminLevel}
              onChange={(e) => setProfile({...profile, adminLevel: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="System Admin">System Admin</option>
              <option value="Support Admin">Support Admin</option>
              <option value="Content Admin">Content Admin</option>
            </select>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Permissions</h2>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.permissions.map((permission, index) => (
              <div
                key={index}
                className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1 rounded-full flex items-center"
              >
                <span>{permission}</span>
                <button
                  type="button"
                  onClick={() => removePermission(index)}
                  className="ml-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add a permission"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              className="flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && addPermission()}
            />
            <button
              type="button"
              onClick={addPermission}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Security Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="twoFactorEnabled"
                checked={profile.securitySettings.twoFactorEnabled}
                onChange={(e) => setProfile({
                  ...profile,
                  securitySettings: {
                    ...profile.securitySettings,
                    twoFactorEnabled: e.target.checked
                  }
                })}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="twoFactorEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Two-Factor Authentication
              </Label>
            </div>
            
            <div className="mb-4">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password Last Changed
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatDateTime(profile.securitySettings.passwordLastChanged)}
              </p>
            </div>
            
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={() => alert('Password change functionality would be implemented here')}
            >
              Change Password
            </button>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Account Information
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-medium">Last Login:</span> {formatDateTime(profile.lastLogin)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-medium">Account Created:</span> {formatDateTime(profile.createdAt)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Last Updated:</span> {formatDateTime(profile.updatedAt)}
            </p>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Changing admin level and permissions can affect system access. Make changes carefully.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
