'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type StoreProfile = {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  shippingOptions: {
    id: string;
    name: string;
    description: string;
    estimatedDelivery: string;
    cost: number;
  }[];
  returnPolicy: string;
  memberSince: Date;
  ratings: {
    overall: number;
    productQuality: number;
    shippingSpeed: number;
    customerService: number;
    totalReviews: number;
  };
  featured: boolean;
  verified: boolean;
};

export default function StoreProfile() {
  const [storeData, setStoreData] = useState<StoreProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we're using mock data
        const mockStore: StoreProfile = {
          id: 'store-001',
          name: 'AutoParts Plus',
          description: 'Your trusted source for high-quality automotive parts. We specialize in OEM and aftermarket parts for all major vehicle brands with a focus on reliability and customer satisfaction.',
          logo: '/car-parts.jpg',
          coverImage: '/car-mechanic-service.jpg',
          contactEmail: 'contact@autopartsplus.example.com',
          contactPhone: '(555) 123-4567',
          website: 'https://autopartsplus.example.com',
          businessHours: {
            monday: '8:00 AM - 6:00 PM',
            tuesday: '8:00 AM - 6:00 PM',
            wednesday: '8:00 AM - 6:00 PM',
            thursday: '8:00 AM - 6:00 PM',
            friday: '8:00 AM - 6:00 PM',
            saturday: '9:00 AM - 5:00 PM',
            sunday: 'Closed'
          },
          address: {
            street: '123 Auto Lane',
            city: 'Carville',
            state: 'CA',
            zipCode: '90210',
            country: 'United States'
          },
          socialMedia: {
            facebook: 'https://facebook.com/autopartsplus',
            twitter: 'https://twitter.com/autopartsplus',
            instagram: 'https://instagram.com/autopartsplus'
          },
          shippingOptions: [
            {
              id: 'shipping-1',
              name: 'Standard Shipping',
              description: 'Delivery within 3-5 business days',
              estimatedDelivery: '3-5 business days',
              cost: 5.99
            },
            {
              id: 'shipping-2',
              name: 'Express Shipping',
              description: 'Delivery within 1-2 business days',
              estimatedDelivery: '1-2 business days',
              cost: 12.99
            },
            {
              id: 'shipping-3',
              name: 'Free Local Pickup',
              description: 'Pick up your order at our store',
              estimatedDelivery: 'Same day if ordered before 2 PM',
              cost: 0
            }
          ],
          returnPolicy: 'We accept returns within 30 days of delivery for items in original condition. Defective items can be returned within 90 days for replacement or refund. Please contact customer service to initiate a return.',
          memberSince: new Date('2020-03-15'),
          ratings: {
            overall: 4.8,
            productQuality: 4.7,
            shippingSpeed: 4.9,
            customerService: 4.8,
            totalReviews: 253
          },
          featured: true,
          verified: true
        };
        
        setStoreData(mockStore);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching store data');
        setIsLoading(false);
      }
    };
    
    fetchStoreProfile();
  }, []);

  const handleSaveChanges = () => {
    // In a real app, this would be an API call to update the store profile
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      setIsLoading(false);
      setSaveSuccess(true);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Components for different sections of the profile
  const StoreHeader = () => {
    if (!storeData) return null;
    
    return (
      <div className="relative mb-8">
        <div className="h-48 w-full rounded-lg overflow-hidden">
          <img 
            src={storeData.coverImage} 
            alt={`${storeData.name} cover`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end">
          <div className="h-24 w-24 rounded-lg overflow-hidden border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800">
            <img 
              src={storeData.logo} 
              alt={storeData.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4 mb-2">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">{storeData.name}</h1>
              {storeData.verified && (
                <div className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500 text-xs px-2 py-1 rounded-full">
                  Verified
                </div>
              )}
              {storeData.featured && (
                <div className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500 text-xs px-2 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Member since {storeData.memberSince.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const StoreDetails = () => {
    if (!storeData) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Store Information</h3>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Store Name</label>
                <input 
                  type="text" 
                  value={storeData.name} 
                  onChange={e => setStoreData({...storeData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={storeData.description}
                  onChange={e => setStoreData({...storeData, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                ></textarea>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 dark:text-gray-300">{storeData.description}</p>
            </div>
          )}
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  value={storeData.contactEmail} 
                  onChange={e => setStoreData({...storeData, contactEmail: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input 
                  type="tel" 
                  value={storeData.contactPhone} 
                  onChange={e => setStoreData({...storeData, contactPhone: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input 
                  type="url" 
                  value={storeData.website || ''} 
                  onChange={e => setStoreData({...storeData, website: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {storeData.contactEmail}</p>
              <p><span className="font-medium">Phone:</span> {storeData.contactPhone}</p>
              {storeData.website && (
                <p>
                  <span className="font-medium">Website:</span>{' '}
                  <a 
                    href={storeData.website}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {storeData.website}
                  </a>
                </p>
              )}
            </div>
          )}
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Street</label>
                <input 
                  type="text" 
                  value={storeData.address.street} 
                  onChange={e => setStoreData({
                    ...storeData, 
                    address: {...storeData.address, street: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input 
                    type="text" 
                    value={storeData.address.city} 
                    onChange={e => setStoreData({
                      ...storeData, 
                      address: {...storeData.address, city: e.target.value}
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input 
                    type="text" 
                    value={storeData.address.state} 
                    onChange={e => setStoreData({
                      ...storeData, 
                      address: {...storeData.address, state: e.target.value}
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <input 
                    type="text" 
                    value={storeData.address.zipCode} 
                    onChange={e => setStoreData({
                      ...storeData, 
                      address: {...storeData.address, zipCode: e.target.value}
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input 
                    type="text" 
                    value={storeData.address.country} 
                    onChange={e => setStoreData({
                      ...storeData, 
                      address: {...storeData.address, country: e.target.value}
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>{storeData.address.street}</p>
              <p>{storeData.address.city}, {storeData.address.state} {storeData.address.zipCode}</p>
              <p>{storeData.address.country}</p>
            </div>
          )}
        </Card>
      </div>
    );
  };
  
  const BusinessHours = () => {
    if (!storeData) return null;
    
    const days = [
      { key: 'monday', label: 'Monday' },
      { key: 'tuesday', label: 'Tuesday' },
      { key: 'wednesday', label: 'Wednesday' },
      { key: 'thursday', label: 'Thursday' },
      { key: 'friday', label: 'Friday' },
      { key: 'saturday', label: 'Saturday' },
      { key: 'sunday', label: 'Sunday' }
    ];
    
    return (
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {days.map(day => (
              <div key={day.key} className="flex items-center justify-between">
                <label className="text-sm font-medium">{day.label}</label>
                <input 
                  type="text" 
                  value={storeData.businessHours[day.key as keyof typeof storeData.businessHours]} 
                  onChange={e => {
                    const updatedHours = { ...storeData.businessHours };
                    updatedHours[day.key as keyof typeof storeData.businessHours] = e.target.value;
                    setStoreData({ ...storeData, businessHours: updatedHours });
                  }}
                  className="w-1/2 px-3 py-2 border rounded-md"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {days.map(day => (
              <div key={day.key} className="flex justify-between">
                <span className="font-medium">{day.label}</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {storeData.businessHours[day.key as keyof typeof storeData.businessHours]}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  };
  
  const ShippingOptions = () => {
    if (!storeData) return null;
    
    return (
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Shipping Options</h3>
        {isEditing ? (
          <div className="space-y-6">
            {storeData.shippingOptions.map((option, index) => (
              <div key={option.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Shipping Method Name</label>
                    <input 
                      type="text" 
                      value={option.name} 
                      onChange={e => {
                        const updatedOptions = [...storeData.shippingOptions];
                        updatedOptions[index] = { ...option, name: e.target.value };
                        setStoreData({ ...storeData, shippingOptions: updatedOptions });
                      }}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input 
                      type="text" 
                      value={option.description} 
                      onChange={e => {
                        const updatedOptions = [...storeData.shippingOptions];
                        updatedOptions[index] = { ...option, description: e.target.value };
                        setStoreData({ ...storeData, shippingOptions: updatedOptions });
                      }}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Estimated Delivery</label>
                      <input 
                        type="text" 
                        value={option.estimatedDelivery} 
                        onChange={e => {
                          const updatedOptions = [...storeData.shippingOptions];
                          updatedOptions[index] = { ...option, estimatedDelivery: e.target.value };
                          setStoreData({ ...storeData, shippingOptions: updatedOptions });
                        }}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Cost ($)</label>
                      <input 
                        type="number" 
                        value={option.cost} 
                        onChange={e => {
                          const updatedOptions = [...storeData.shippingOptions];
                          updatedOptions[index] = { ...option, cost: parseFloat(e.target.value) };
                          setStoreData({ ...storeData, shippingOptions: updatedOptions });
                        }}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={() => {
                const newOption = {
                  id: `shipping-${storeData.shippingOptions.length + 1}`,
                  name: 'New Shipping Option',
                  description: 'Description',
                  estimatedDelivery: '3-5 days',
                  cost: 0
                };
                setStoreData({
                  ...storeData,
                  shippingOptions: [...storeData.shippingOptions, newOption]
                });
              }}
              className="w-full"
            >
              Add Shipping Option
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {storeData.shippingOptions.map(option => (
              <div key={option.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{option.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{option.description}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Estimated Delivery: {option.estimatedDelivery}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">
                      {option.cost === 0 ? 'Free' : `$${option.cost.toFixed(2)}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  };
  
  const ReturnPolicy = () => {
    if (!storeData) return null;
    
    return (
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Return Policy</h3>
        {isEditing ? (
          <div>
            <textarea
              value={storeData.returnPolicy}
              onChange={e => setStoreData({...storeData, returnPolicy: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              rows={6}
            ></textarea>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 dark:text-gray-300">{storeData.returnPolicy}</p>
          </div>
        )}
      </Card>
    );
  };
  
  const StoreRatings = () => {
    if (!storeData) return null;
    
    // Function to render star ratings
    const renderStars = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating - fullStars >= 0.5;
      
      // Full stars
      for (let i = 0; i < fullStars; i++) {
        stars.push(
          <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
      
      // Half star
      if (hasHalfStar) {
        stars.push(
          <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="halfGradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
      
      // Empty stars
      const emptyStars = 5 - stars.length;
      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
      
      return stars;
    };
    
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Store Ratings</h3>
        <div className="space-y-4">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center mb-2">
              {renderStars(storeData.ratings.overall)}
            </div>
            <div className="text-3xl font-bold">{storeData.ratings.overall.toFixed(1)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Based on {storeData.ratings.totalReviews} reviews</div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Product Quality</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{storeData.ratings.productQuality.toFixed(1)}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${(storeData.ratings.productQuality / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Shipping Speed</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{storeData.ratings.shippingSpeed.toFixed(1)}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${(storeData.ratings.shippingSpeed / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Customer Service</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{storeData.ratings.customerService.toFixed(1)}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${(storeData.ratings.customerService / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
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
      {saveSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-green-800 dark:text-green-200 mb-4">
          Store profile updated successfully!
        </div>
      )}
      
      <StoreHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <StoreDetails />
          <BusinessHours />
          <ShippingOptions />
          <ReturnPolicy />
        </div>
        <div>
          <StoreRatings />
        </div>
      </div>
    </div>
  );
}
