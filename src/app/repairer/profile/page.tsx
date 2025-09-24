'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProfileLayout from '@/components/ui/profile-layout';

interface RepairerProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  businessName: string;
  businessDescription: string;
  specializations: string[];
  workshopImages: string[];
  certifications: string[];
  yearsInBusiness: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function RepairerProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<RepairerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newCertification, setNewCertification] = useState('');

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
          name: user?.name || 'Auto Fix Workshop',
          email: user?.email || 'contact@autofixworkshop.com',
          phoneNumber: '+1 (555) 987-6543',
          role: 'REPAIRER',
          businessName: 'Auto Fix Workshop',
          businessDescription: 'Full-service auto repair shop specializing in domestic and import vehicles. We offer everything from routine maintenance to complex repairs.',
          specializations: ['General Repairs', 'Engine Diagnostics', 'Brake Service', 'Electrical Systems'],
          workshopImages: ['/car-mechanic-service.jpg'],
          certifications: ['ASE Certified', 'AAA Approved', 'BBB Accredited'],
          yearsInBusiness: 12,
          location: {
            address: '456 Workshop Lane',
            city: 'Mechanicsville',
            state: 'CA',
            country: 'USA',
            coordinates: {
              latitude: 34.05,
              longitude: -118.24
            }
          },
          businessHours: {
            monday: '8:00 AM - 6:00 PM',
            tuesday: '8:00 AM - 6:00 PM',
            wednesday: '8:00 AM - 6:00 PM',
            thursday: '8:00 AM - 6:00 PM',
            friday: '8:00 AM - 6:00 PM',
            saturday: '9:00 AM - 3:00 PM',
            sunday: 'Closed'
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

  const handleSaveProfile = async (data: unknown) => {
    const updatedProfile = data as RepairerProfile;
    
    // In a real app, send this data to your API
    console.log('Saving profile:', updatedProfile);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setProfile(updatedProfile);
  };

  const addSpecialization = () => {
    if (!newSpecialization.trim() || !profile) return;
    
    setProfile({
      ...profile,
      specializations: [...profile.specializations, newSpecialization.trim()]
    });
    setNewSpecialization('');
  };

  const removeSpecialization = (index: number) => {
    if (!profile) return;
    
    const newSpecializations = [...profile.specializations];
    newSpecializations.splice(index, 1);
    
    setProfile({
      ...profile,
      specializations: newSpecializations
    });
  };

  const addCertification = () => {
    if (!newCertification.trim() || !profile) return;
    
    setProfile({
      ...profile,
      certifications: [...profile.certifications, newCertification.trim()]
    });
    setNewCertification('');
  };

  const removeCertification = (index: number) => {
    if (!profile) return;
    
    const newCertifications = [...profile.certifications];
    newCertifications.splice(index, 1);
    
    setProfile({
      ...profile,
      certifications: newCertifications
    });
  };

  if (!profile) {
    return (
      <ProfileLayout
        userType="repairer"
        profileData={{}}
        onSave={async () => {}}
        isLoading={isLoading}
      />
    );
  }

  return (
    <ProfileLayout
      userType="repairer"
      profileData={profile}
      onSave={handleSaveProfile}
      isLoading={isLoading}
    >
      <div>
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Business Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Business Name
            </Label>
            <Input
              id="businessName"
              name="businessName"
              value={profile.businessName}
              onChange={(e) => setProfile({...profile, businessName: e.target.value})}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Years in Business
            </Label>
            <Input
              id="yearsInBusiness"
              name="yearsInBusiness"
              type="number"
              value={profile.yearsInBusiness}
              onChange={(e) => setProfile({...profile, yearsInBusiness: parseInt(e.target.value) || 0})}
              className="w-full"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Business Description
            </Label>
            <Textarea
              id="businessDescription"
              name="businessDescription"
              value={profile.businessDescription}
              onChange={(e) => setProfile({...profile, businessDescription: e.target.value})}
              className="w-full"
              rows={4}
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Specializations</h2>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.specializations.map((spec, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full flex items-center"
              >
                <span>{spec}</span>
                <button
                  type="button"
                  onClick={() => removeSpecialization(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add a specialization"
              value={newSpecialization}
              onChange={(e) => setNewSpecialization(e.target.value)}
              className="flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && addSpecialization()}
            />
            <button
              type="button"
              onClick={addSpecialization}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Certifications</h2>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full flex items-center"
              >
                <span>{cert}</span>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="ml-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add a certification"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              className="flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && addCertification()}
            />
            <button
              type="button"
              onClick={addCertification}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Business Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <Label htmlFor="monday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monday
            </Label>
            <Input
              id="monday"
              name="monday"
              value={profile.businessHours.monday}
              onChange={(e) => setProfile({
                ...profile,
                businessHours: { ...profile.businessHours, monday: e.target.value }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="tuesday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tuesday
            </Label>
            <Input
              id="tuesday"
              name="tuesday"
              value={profile.businessHours.tuesday}
              onChange={(e) => setProfile({
                ...profile,
                businessHours: { ...profile.businessHours, tuesday: e.target.value }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="wednesday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Wednesday
            </Label>
            <Input
              id="wednesday"
              name="wednesday"
              value={profile.businessHours.wednesday}
              onChange={(e) => setProfile({
                ...profile,
                businessHours: { ...profile.businessHours, wednesday: e.target.value }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="thursday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Thursday
            </Label>
            <Input
              id="thursday"
              name="thursday"
              value={profile.businessHours.thursday}
              onChange={(e) => setProfile({
                ...profile,
                businessHours: { ...profile.businessHours, thursday: e.target.value }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="friday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Friday
            </Label>
            <Input
              id="friday"
              name="friday"
              value={profile.businessHours.friday}
              onChange={(e) => setProfile({
                ...profile,
                businessHours: { ...profile.businessHours, friday: e.target.value }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="saturday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Saturday
            </Label>
            <Input
              id="saturday"
              name="saturday"
              value={profile.businessHours.saturday}
              onChange={(e) => setProfile({
                ...profile,
                businessHours: { ...profile.businessHours, saturday: e.target.value }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="sunday" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sunday
            </Label>
            <Input
              id="sunday"
              name="sunday"
              value={profile.businessHours.sunday}
              onChange={(e) => setProfile({
                ...profile,
                businessHours: { ...profile.businessHours, sunday: e.target.value }
              })}
              className="w-full"
            />
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Workshop Location</h2>
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
