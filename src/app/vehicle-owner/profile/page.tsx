'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProfileLayout from '@/components/ui/profile-layout';

interface VehicleOwnerProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  preferredCommunication: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function VehicleOwnerProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<VehicleOwnerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          name: user?.name || 'John Doe',
          email: user?.email || 'john.doe@example.com',
          phoneNumber: '+1 (555) 123-4567',
          role: 'VEHICLE_OWNER',
          preferredCommunication: 'email',
          notificationPreferences: {
            email: true,
            sms: false,
            push: true
          },
          location: {
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            country: 'USA'
          },
          createdAt: new Date().toISOString(),
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

  const handleSaveProfile = async (updatedProfile: VehicleOwnerProfile) => {
    // In a real app, send this data to your API
    console.log('Saving profile:', updatedProfile);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setProfile(updatedProfile);
  };

  if (!profile) {
    return (
      <ProfileLayout
        userType="vehicle-owner"
        profileData={{}}
        onSave={async () => {}}
        isLoading={isLoading}
      />
    );
  }

  return (
    <ProfileLayout
      userType="vehicle-owner"
      profileData={profile}
      onSave={handleSaveProfile}
      isLoading={isLoading}
    >
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Communication Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label htmlFor="preferredCommunication" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preferred Communication Method
            </Label>
            <select
              id="preferredCommunication"
              name="preferredCommunication"
              value={profile.preferredCommunication}
              onChange={(e) => setProfile({...profile, preferredCommunication: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="sms">SMS</option>
            </select>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Notification Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotifications"
              checked={profile.notificationPreferences.email}
              onChange={(e) => setProfile({
                ...profile,
                notificationPreferences: {
                  ...profile.notificationPreferences,
                  email: e.target.checked
                }
              })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Email Notifications
            </Label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="smsNotifications"
              checked={profile.notificationPreferences.sms}
              onChange={(e) => setProfile({
                ...profile,
                notificationPreferences: {
                  ...profile.notificationPreferences,
                  sms: e.target.checked
                }
              })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              SMS Notifications
            </Label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pushNotifications"
              checked={profile.notificationPreferences.push}
              onChange={(e) => setProfile({
                ...profile,
                notificationPreferences: {
                  ...profile.notificationPreferences,
                  push: e.target.checked
                }
              })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Push Notifications
            </Label>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Street Address
            </Label>
            <Input
              id="address"
              name="address"
              value={profile.location.address}
              onChange={(e) => setProfile({
                ...profile,
                location: {
                  ...profile.location,
                  address: e.target.value
                }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={profile.location.city}
              onChange={(e) => setProfile({
                ...profile,
                location: {
                  ...profile.location,
                  city: e.target.value
                }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              State/Province
            </Label>
            <Input
              id="state"
              name="state"
              value={profile.location.state}
              onChange={(e) => setProfile({
                ...profile,
                location: {
                  ...profile.location,
                  state: e.target.value
                }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country
            </Label>
            <Input
              id="country"
              name="country"
              value={profile.location.country}
              onChange={(e) => setProfile({
                ...profile,
                location: {
                  ...profile.location,
                  country: e.target.value
                }
              })}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
