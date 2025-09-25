'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/models';
import Image from 'next/image';

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: '',
    compatibleVehicles: [],
    condition: 'NEW',
    price: 0,
    stock: 0,
    images: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real app, this would fetch from the API
        // For demo purposes, we're using mock data
        const mockProducts: Product[] = [
          {
            id: '1',
            sellerId: 'seller1',
            name: 'Brake Pads (Front)',
            description: 'High-performance ceramic brake pads for optimal stopping power and reduced brake dust.',
            category: 'Brakes',
            compatibleVehicles: [
              { make: 'Toyota', model: 'Camry', yearStart: 2018, yearEnd: 2022 },
              { make: 'Honda', model: 'Accord', yearStart: 2018, yearEnd: 2022 }
            ],
            condition: 'NEW',
            price: 89.99,
            stock: 24,
            images: ['/car-parts.jpg'],
            specifications: {
              manufacturer: 'BrakeMaster',
              warranty: '2 years',
              material: 'Ceramic'
            },
            rating: 4.7,
            reviews: [],
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
          },
          {
            id: '2',
            sellerId: 'seller1',
            name: 'Oil Filter',
            description: 'Premium oil filter that removes contaminants for cleaner engine operation.',
            category: 'Engine',
            compatibleVehicles: [
              { make: 'Toyota', yearStart: 2015, yearEnd: 2023 },
              { make: 'Honda', yearStart: 2015, yearEnd: 2023 },
              { make: 'Ford', yearStart: 2016, yearEnd: 2023 }
            ],
            condition: 'NEW',
            price: 12.99,
            stock: 56,
            images: ['/car-parts.jpg'],
            specifications: {
              manufacturer: 'FilterCraft',
              warranty: '1 year',
              filterType: 'Full-Flow'
            },
            rating: 4.5,
            reviews: [],
            createdAt: new Date('2025-01-20'),
            updatedAt: new Date('2025-01-20')
          },
          {
            id: '3',
            sellerId: 'seller1',
            name: 'Alternator - Remanufactured',
            description: 'Remanufactured alternator, tested to OEM specifications.',
            category: 'Electrical',
            compatibleVehicles: [
              { make: 'Ford', model: 'F-150', yearStart: 2017, yearEnd: 2021 }
            ],
            condition: 'REFURBISHED',
            price: 189.99,
            discountPrice: 159.99,
            stock: 8,
            images: ['/car-parts.jpg'],
            specifications: {
              manufacturer: 'ElectroPro',
              warranty: '1 year',
              outputAmp: '120A'
            },
            rating: 4.2,
            reviews: [],
            createdAt: new Date('2025-02-05'),
            updatedAt: new Date('2025-02-05')
          }
        ];

        setProducts(mockProducts);
        setIsLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setIsAddingProduct(true);
  };

  const handleCancelAdd = () => {
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      description: '',
      category: '',
      compatibleVehicles: [],
      condition: 'NEW',
      price: 0,
      stock: 0,
      images: []
    });
  };

  const handleSaveProduct = () => {
    // In a real app, you would make an API call here
    const mockNewProduct: Product = {
      id: `new-${Date.now()}`,
      sellerId: 'seller1',
      name: newProduct.name || '',
      description: newProduct.description || '',
      category: newProduct.category || '',
      compatibleVehicles: newProduct.compatibleVehicles || [],
      condition: newProduct.condition as 'NEW' | 'USED' | 'REFURBISHED',
      price: newProduct.price || 0,
      stock: newProduct.stock || 0,
      images: newProduct.images || [],
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setProducts([...products, mockNewProduct]);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      description: '',
      category: '',
      compatibleVehicles: [],
      condition: 'NEW',
      price: 0,
      stock: 0,
      images: []
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    });
  };

  const handleDeleteProduct = (id: string) => {
    // In a real app, you would make an API call here
    setProducts(products.filter(product => product.id !== id));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const categories = ['all', ...new Set(products.map(product => product.category.toLowerCase()))];
  
  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === categoryFilter);

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Product Catalog</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div>
            <select
              value={categoryFilter}
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded-md w-full md:w-auto"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={handleAddProduct} disabled={isAddingProduct}>
            Add New Product
          </Button>
        </div>
      </div>

      {isAddingProduct && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g. Brake Pads"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="e.g. Brakes"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Describe the product in detail"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={newProduct.price || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Condition</label>
              <select
                name="condition"
                value={newProduct.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="NEW">New</option>
                <option value="USED">Used</option>
                <option value="REFURBISHED">Refurbished</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancelAdd}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProduct}
              disabled={!newProduct.name || !newProduct.description || !newProduct.category}
            >
              Save Product
            </Button>
          </div>
        </Card>
      )}

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            No products found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {categoryFilter !== 'all'
              ? `No products found in the ${categoryFilter} category.`
              : 'Get started by adding a new product.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 h-48 md:h-auto relative">
                  {product.images && product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
                      <p className="text-gray-500 dark:text-gray-400">No image</p>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      {product.discountPrice ? (
                        <>
                          <p className="text-lg font-bold">${product.discountPrice.toFixed(2)}</p>
                          <p className="text-sm line-through text-gray-500">${product.price.toFixed(2)}</p>
                        </>
                      ) : (
                        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                      )}
                      <p className={`text-sm font-medium ${
                        product.stock > 10
                          ? 'text-green-600 dark:text-green-400'
                          : product.stock > 0
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {product.stock > 10
                          ? `In Stock (${product.stock})`
                          : product.stock > 0
                          ? `Low Stock (${product.stock})`
                          : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium">Compatible Vehicles:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.compatibleVehicles.map((vehicle, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs"
                        >
                          {vehicle.make}{vehicle.model ? ` ${vehicle.model}` : ''}{vehicle.yearStart ? ` (${vehicle.yearStart}-${vehicle.yearEnd || 'present'})` : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
