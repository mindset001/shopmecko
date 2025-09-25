'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Repairer } from '@/types/models';
import Image from 'next/image';

export default function WorkshopProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Partial<Repairer>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editableProfile, setEditableProfile] = useState<Partial<Repairer>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In a real app, fetch from the API
        // For demo, we're using mock data
        const mockProfile: Repairer = {
          id: 'repairer1',
          name: 'Mike\'s Auto Repair',
          email: 'mike@autorepair.com',
          phoneNumber: '555-234-5678',
          role: 'REPAIRER',
          avatar: '/car-mechanic-service.jpg',
          businessName: 'Mike\'s Auto Repair',
          businessDescription: 'Full-service auto repair shop specializing in domestic and import vehicles. We offer everything from routine maintenance to complex repairs.',
          specializations: ['General Repairs', 'Engine Diagnostics', 'Brake Service', 'Electrical Systems'],
          workshopImages: ['/car-mechanic-service.jpg'],
          rating: 4.8,
          completedJobs: 523,
          services: [],
          reviews: [],
          location: {
            address: '789 Mechanic St',
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA',
            coordinates: {
              latitude: 34.0522,
              longitude: -118.2437
            }
          },
          createdAt: new Date('2025-01-20'),
          updatedAt: new Date('2025-01-20')
        };

        setProfile(mockProfile);
        setEditableProfile(mockProfile);
        setIsLoading(false);
      } catch (err: unknown) {
        setError( 'An error occurred while fetching profile');
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableProfile(profile);
  };

  const handleSave = async () => {
    try {
      // In a real app, make an API call here to save the profile
      setProfile(editableProfile);
      setIsEditing(false);
      // Show success message
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while saving profile';
      setError(errorMessage);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setEditableProfile({
      ...editableProfile,
      [field]: e.target.value
    });
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditableProfile({
      ...editableProfile,
      location: {
        ...(editableProfile.location || { address: '', city: '', state: '', country: '' }),
        [field]: e.target.value
      }
    });
  };

  const handleSpecializationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const specializationsText = e.target.value;
    const specializations = specializationsText
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    setEditableProfile({
      ...editableProfile,
      specializations
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12" suppressHydrationWarning>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-800 dark:text-red-200">
        <p>{error}</p>
        <button 
          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Workshop Profile</h2>
        {!isEditing ? (
          <Button onClick={handleEdit}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Business Information</h3>
            
            {isEditing ? (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name</label>
                  <input
                    type="text"
                    value={editableProfile.businessName || ''}
                    onChange={(e) => handleInputChange(e, 'businessName')}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={editableProfile.email || ''}
                    onChange={(e) => handleInputChange(e, 'email')}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editableProfile.phoneNumber || ''}
                    onChange={(e) => handleInputChange(e, 'phoneNumber')}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Business Description</label>
                  <textarea
                    value={editableProfile.businessDescription || ''}
                    onChange={(e) => handleInputChange(e, 'businessDescription')}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={4}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Specializations (comma separated)</label>
                  <input
                    type="text"
                    value={editableProfile.specializations?.join(', ') || ''}
                    onChange={handleSpecializationsChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Name</p>
                  <p className="text-lg">{profile.businessName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Email</p>
                  <p>{profile.email}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p>{profile.phoneNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Description</p>
                  <p className="text-gray-700 dark:text-gray-300">{profile.businessDescription}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Specializations</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.specializations?.map((specialization, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-md text-sm"
                      >
                        {specialization}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
          
          <Card className="p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4">Workshop Address</h3>
            
            {isEditing ? (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    value={editableProfile.location?.address || ''}
                    onChange={(e) => handleLocationChange(e, 'address')}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={editableProfile.location?.city || ''}
                      onChange={(e) => handleLocationChange(e, 'city')}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      type="text"
                      value={editableProfile.location?.state || ''}
                      onChange={(e) => handleLocationChange(e, 'state')}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    value={editableProfile.location?.country || ''}
                    onChange={(e) => handleLocationChange(e, 'country')}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            ) : (
              <div>
                <p>
                  {profile.location?.address}<br />
                  {profile.location?.city}, {profile.location?.state}<br />
                  {profile.location?.country}
                </p>
              </div>
            )}
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Workshop Photo</h3>
            
            {profile.avatar && (
              <div className="relative h-60 w-full mb-4">
                <Image
                  src={profile.avatar}
                  alt={profile.businessName || 'Workshop'}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            )}
            
            {isEditing && (
              <div>
                <Button variant="outline" className="w-full">
                  Upload New Photo
                </Button>
              </div>
            )}
            
            <div className="mt-6">
              <h4 className="font-medium">Performance</h4>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                  <p className="text-xl font-semibold flex items-center">
                    {profile.rating}
                    <svg className="h-5 w-5 text-yellow-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-md">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Completed Jobs</p>
                  <p className="text-xl font-semibold">{profile.completedJobs}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
