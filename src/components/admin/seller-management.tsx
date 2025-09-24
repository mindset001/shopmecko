'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Seller } from '@/types/models';

// Mock seller data for demonstration
const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'AutoParts Express',
    email: 'sales@autopartsexpress.com',
    phoneNumber: '(555) 234-5678',
    role: 'SELLER',
    businessName: 'AutoParts Express',
    businessDescription: 'Quality auto parts for all makes and models at competitive prices.',
    storeAddress: '123 Parts Lane, Autoville, AV 12345',
    categories: ['Brakes', 'Engine Parts', 'Filters', 'Electrical'],
    specializations: [],
    rating: 4.7,
    completedOrders: 1245,
    productsCount: 568,
    products: [],
    reviews: [],
    createdAt: new Date('2022-03-10'),
    updatedAt: new Date('2023-01-15'),
    verified: true
  },
  {
    id: '2',
    name: 'Premium Car Accessories',
    email: 'info@premiumaccessories.com',
    phoneNumber: '(555) 876-5432',
    role: 'SELLER',
    businessName: 'Premium Car Accessories',
    businessDescription: 'High-end accessories and upgrades for automotive enthusiasts.',
    storeAddress: '456 Luxury Drive, Premiumville, PV 67890',
    categories: ['Interior', 'Exterior', 'Performance', 'Electronics'],
    specializations: [],
    rating: 4.5,
    completedOrders: 873,
    productsCount: 342,
    products: [],
    reviews: [],
    createdAt: new Date('2022-05-22'),
    updatedAt: new Date('2023-02-18'),
    verified: true
  },
  {
    id: '3',
    name: 'Budget Auto Supply',
    email: 'contact@budgetauto.com',
    phoneNumber: '(555) 345-6789',
    role: 'SELLER',
    businessName: 'Budget Auto Supply',
    businessDescription: 'Affordable auto parts and accessories for everyday drivers.',
    storeAddress: '789 Value Road, Savingston, SV 34567',
    categories: ['Maintenance', 'Oils & Fluids', 'Tools', 'Lighting'],
    specializations: [],
    rating: 4.2,
    completedOrders: 956,
    productsCount: 421,
    products: [],
    reviews: [],
    createdAt: new Date('2022-07-15'),
    updatedAt: new Date('2023-03-05'),
    verified: false
  }
];

export default function SellerManagement() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('all'); // 'all', 'verified', 'unverified'
  const [isSellerDetailsModalOpen, setIsSellerDetailsModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isEditCategoriesModalOpen, setIsEditCategoriesModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [sellerCategories, setSellerCategories] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setSellers(mockSellers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get unique categories from all sellers
  const allCategories = Array.from(
    new Set(
      sellers.flatMap(seller => seller.categories)
    )
  ).sort();
  
  // Filter sellers based on search query, category filter, and verification status
  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = 
      seller.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.businessDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === '' ||
      seller.categories.includes(categoryFilter);
    
    const matchesVerification = 
      verificationFilter === 'all' ||
      (verificationFilter === 'verified' && seller.verified) ||
      (verificationFilter === 'unverified' && !seller.verified);
    
    return matchesSearch && matchesCategory && matchesVerification;
  });
  
  const handleViewSeller = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsSellerDetailsModalOpen(true);
  };
  
  const handleVerifySeller = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsVerificationModalOpen(true);
  };
  
  const handleEditCategories = (seller: Seller) => {
    setSelectedSeller(seller);
    setSellerCategories([...seller.categories]);
    setIsEditCategoriesModalOpen(true);
  };
  
  const handleAddCategory = () => {
    if (newCategory.trim() !== '' && !sellerCategories.includes(newCategory)) {
      setSellerCategories([...sellerCategories, newCategory]);
      setNewCategory('');
    }
  };
  
  const handleRemoveCategory = (category: string) => {
    setSellerCategories(sellerCategories.filter(c => c !== category));
  };
  
  const handleSaveCategories = () => {
    if (selectedSeller) {
      const updatedSellers = sellers.map(seller => {
        if (seller.id === selectedSeller.id) {
          return {
            ...seller,
            categories: sellerCategories,
            updatedAt: new Date()
          };
        }
        return seller;
      });
      
      setSellers(updatedSellers);
      setIsEditCategoriesModalOpen(false);
      setSelectedSeller(null);
    }
  };
  
  const handleVerifySubmit = () => {
    if (selectedSeller) {
      const updatedSellers = sellers.map(seller => {
        if (seller.id === selectedSeller.id) {
          return {
            ...seller,
            isVerified: true,
            updatedAt: new Date()
          };
        }
        return seller;
      });
      
      setSellers(updatedSellers);
      setIsVerificationModalOpen(false);
      setSelectedSeller(null);
      alert(`${selectedSeller.businessName} has been verified successfully!`);
    }
  };
  
  const handleUnverifySeller = (sellerId: string) => {
    const updatedSellers = sellers.map(seller => {
      if (seller.id === sellerId) {
        return {
          ...seller,
          isVerified: false,
          updatedAt: new Date()
        };
      }
      return seller;
    });
    
    setSellers(updatedSellers);
  };
  
  const handleDeleteSeller = (sellerId: string) => {
    if (confirm('Are you sure you want to delete this seller? This action cannot be undone.')) {
      // In a real app, this would send a DELETE request to your API
      setSellers(sellers.filter(seller => seller.id !== sellerId));
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Seller Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex items-center">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 whitespace-nowrap">
              Category:
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Categories</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="verification-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 whitespace-nowrap">
              Status:
            </label>
            <select
              id="verification-filter"
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Sellers</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search sellers by name, email, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 pl-10 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredSellers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">No sellers found</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          filteredSellers.map((seller) => (
            <div 
              key={seller.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold">{seller.businessName}</h3>
                      {seller.verified && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Verified
                        </span>
                      )}
                      {!seller.verified && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Pending Verification
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300">{seller.businessDescription}</p>
                    
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <p>{seller.storeAddress}</p>
                    </div>
                    
                    <div className="flex items-center mt-2 text-sm">
                      <div className="flex items-center text-yellow-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm font-medium">{seller.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-500">{seller.completedOrders} orders fulfilled</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-500">{seller.productsCount} products</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {seller.categories.map((category, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <p>Contact: {seller.email} • {seller.phoneNumber}</p>
                      <p>Registered: {new Date(seller.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewSeller(seller)}
                    >
                      View Details
                    </Button>
                    {!seller.verified ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleVerifySeller(seller)}
                      >
                        Verify Seller
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUnverifySeller(seller.id)}
                      >
                        Revoke Verification
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditCategories(seller)}
                    >
                      Edit Categories
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteSeller(seller.id)}
                    >
                      Remove Seller
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Seller Details Modal */}
      <Dialog open={isSellerDetailsModalOpen} onOpenChange={setIsSellerDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Seller Details</DialogTitle>
          </DialogHeader>
          
          {selectedSeller && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{selectedSeller.businessName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedSeller.email} • {selectedSeller.phoneNumber}
                  </p>
                </div>
                {selectedSeller.verified ? (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Verified Seller
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Pending Verification
                  </span>
                )}
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Business Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedSeller.businessDescription}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Store Address</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedSeller.storeAddress}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Product Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSeller.categories.map((category, i) => (
                    <span
                      key={i}
                      className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Rating</h4>
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-lg font-medium">{selectedSeller.rating}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Orders Fulfilled</h4>
                  <p className="text-lg">{selectedSeller.completedOrders}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Products</h4>
                  <p className="text-lg">{selectedSeller.productsCount}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Account Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Account Created:</p>
                    <p>{new Date(selectedSeller.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Last Updated:</p>
                    <p>{new Date(selectedSeller.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsSellerDetailsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Verification Modal */}
      <Dialog open={isVerificationModalOpen} onOpenChange={setIsVerificationModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Verify Seller</DialogTitle>
          </DialogHeader>
          
          {selectedSeller && (
            <div className="space-y-4">
              <p>
                You are about to verify <strong>{selectedSeller.businessName}</strong> as a legitimate seller on the platform.
              </p>
              <p>
                This will give them a verified badge and improve their visibility in search results.
              </p>
              <div className="space-y-2">
                <Label htmlFor="verificationNotes">Verification Notes (Internal Use Only)</Label>
                <textarea
                  id="verificationNotes"
                  className="w-full min-h-[100px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2"
                  placeholder="Enter any notes about the verification process..."
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerificationModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifySubmit}>
              Verify Seller
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Categories Modal */}
      <Dialog open={isEditCategoriesModalOpen} onOpenChange={setIsEditCategoriesModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product Categories</DialogTitle>
          </DialogHeader>
          
          {selectedSeller && (
            <div className="space-y-4">
              <p>
                Editing product categories for <strong>{selectedSeller.businessName}</strong>
              </p>
              
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter a product category"
                />
                <Button type="button" onClick={handleAddCategory}>Add</Button>
              </div>
              
              <div>
                <Label>Current Categories</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sellerCategories.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No categories added</p>
                  ) : (
                    sellerCategories.map((category, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
                      >
                        {category}
                        <button
                          type="button"
                          className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          onClick={() => handleRemoveCategory(category)}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCategoriesModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategories}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
