'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProfileLayout from '@/components/ui/profile-layout';

interface SellerProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  businessName: string;
  businessDescription: string;
  storeCategories: string[];
  storeImages: string[];
  returnPolicy: string;
  shippingPolicy: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  paymentMethods: string[];
  taxInformation: {
    vatId: string;
    taxId: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function SellerProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');

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
          name: user?.name || 'Premium Auto Parts',
          email: user?.email || 'sales@premiumpars.com',
          phoneNumber: '+1 (555) 456-7890',
          role: 'SELLER',
          businessName: 'Premium Auto Parts',
          businessDescription: 'We offer high-quality auto parts for all major vehicle makes and models. Specializing in both OEM and aftermarket parts with competitive prices.',
          storeCategories: ['Engine Parts', 'Brake Components', 'Suspension', 'Electrical', 'Accessories'],
          storeImages: ['/car-parts.jpg'],
          returnPolicy: 'Returns accepted within 30 days of purchase with original packaging. Buyer responsible for return shipping costs unless item is defective.',
          shippingPolicy: 'Free shipping on orders over $50. Standard shipping takes 3-5 business days. Express shipping available for an additional fee.',
          location: {
            address: '789 Parts Avenue',
            city: 'Autoville',
            state: 'CA',
            country: 'USA'
          },
          paymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer'],
          taxInformation: {
            vatId: 'VAT123456789',
            taxId: 'TAX987654321'
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
    // Cast the unknown data to SellerProfile
    const updatedProfile = data as SellerProfile;
    
    // In a real app, send this data to your API
    console.log('Saving profile:', updatedProfile);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update local state
    setProfile(updatedProfile);
  };

  const addCategory = () => {
    if (!newCategory.trim() || !profile) return;
    
    setProfile({
      ...profile,
      storeCategories: [...profile.storeCategories, newCategory.trim()]
    });
    setNewCategory('');
  };

  const removeCategory = (index: number) => {
    if (!profile) return;
    
    const newCategories = [...profile.storeCategories];
    newCategories.splice(index, 1);
    
    setProfile({
      ...profile,
      storeCategories: newCategories
    });
  };

  const addPaymentMethod = () => {
    if (!newPaymentMethod.trim() || !profile) return;
    
    setProfile({
      ...profile,
      paymentMethods: [...profile.paymentMethods, newPaymentMethod.trim()]
    });
    setNewPaymentMethod('');
  };

  const removePaymentMethod = (index: number) => {
    if (!profile) return;
    
    const newPaymentMethods = [...profile.paymentMethods];
    newPaymentMethods.splice(index, 1);
    
    setProfile({
      ...profile,
      paymentMethods: newPaymentMethods
    });
  };

  if (!profile) {
    return (
      <ProfileLayout
        userType="seller"
        profileData={{}}
        onSave={async () => {}}
        isLoading={isLoading}
      />
    );
  }

  return (
    <ProfileLayout
      userType="seller"
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

        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Store Categories</h2>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.storeCategories.map((category, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full flex items-center"
              >
                <span>{category}</span>
                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add a category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Payment Methods</h2>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full flex items-center"
              >
                <span>{method}</span>
                <button
                  type="button"
                  onClick={() => removePaymentMethod(index)}
                  className="ml-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Add a payment method"
              value={newPaymentMethod}
              onChange={(e) => setNewPaymentMethod(e.target.value)}
              className="flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && addPaymentMethod()}
            />
            <button
              type="button"
              onClick={addPaymentMethod}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Store Policies</h2>
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div>
            <Label htmlFor="returnPolicy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Return Policy
            </Label>
            <Textarea
              id="returnPolicy"
              name="returnPolicy"
              value={profile.returnPolicy}
              onChange={(e) => setProfile({...profile, returnPolicy: e.target.value})}
              className="w-full"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="shippingPolicy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Shipping Policy
            </Label>
            <Textarea
              id="shippingPolicy"
              name="shippingPolicy"
              value={profile.shippingPolicy}
              onChange={(e) => setProfile({...profile, shippingPolicy: e.target.value})}
              className="w-full"
              rows={3}
            />
          </div>
        </div>
        
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Tax Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label htmlFor="vatId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              VAT ID
            </Label>
            <Input
              id="vatId"
              name="vatId"
              value={profile.taxInformation.vatId}
              onChange={(e) => setProfile({
                ...profile,
                taxInformation: { ...profile.taxInformation, vatId: e.target.value }
              })}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="taxId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tax ID
            </Label>
            <Input
              id="taxId"
              name="taxId"
              value={profile.taxInformation.taxId}
              onChange={(e) => setProfile({
                ...profile,
                taxInformation: { ...profile.taxInformation, taxId: e.target.value }
              })}
              className="w-full"
            />
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
