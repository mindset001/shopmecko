'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/models';

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockWarningLevel, setStockWarningLevel] = useState<number>(10);
  const [bulkEditMode, setBulkEditMode] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [bulkStockAdjustment, setBulkStockAdjustment] = useState<number>(0);

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
            stock: 5,
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
            stock: 0,
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
          },
          {
            id: '4',
            sellerId: 'seller1',
            name: 'Spark Plugs (Set of 4)',
            description: 'High-performance iridium spark plugs for better fuel efficiency and engine performance.',
            category: 'Engine',
            compatibleVehicles: [
              { make: 'Multiple Makes' }
            ],
            condition: 'NEW',
            price: 42.99,
            stock: 15,
            images: ['/car-parts.jpg'],
            specifications: {
              manufacturer: 'IgniteTech',
              warranty: '3 years',
              material: 'Iridium'
            },
            rating: 4.2,
            reviews: [],
            createdAt: new Date('2025-02-10'),
            updatedAt: new Date('2025-02-10')
          },
          {
            id: '5',
            sellerId: 'seller1',
            name: 'Air Filter',
            description: 'High-quality air filter for improved engine air flow and protection.',
            category: 'Engine',
            compatibleVehicles: [
              { make: 'Toyota', yearStart: 2017, yearEnd: 2023 },
              { make: 'Lexus', yearStart: 2017, yearEnd: 2023 }
            ],
            condition: 'NEW',
            price: 18.99,
            stock: 8,
            images: ['/car-parts.jpg'],
            specifications: {
              manufacturer: 'AirPro',
              warranty: '1 year'
            },
            rating: 4.0,
            reviews: [],
            createdAt: new Date('2025-02-15'),
            updatedAt: new Date('2025-02-15')
          }
        ];

        setProducts(mockProducts);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching products');
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleStockWarningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockWarningLevel(parseInt(e.target.value) || 0);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    // In a real app, you would make an API call here
    setProducts(
      products.map(product => 
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
  };

  const toggleBulkEditMode = () => {
    setBulkEditMode(!bulkEditMode);
    setSelectedProducts(new Set());
    setBulkStockAdjustment(0);
  };

  const toggleProductSelection = (productId: string) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProducts(newSelection);
  };

  const handleBulkStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulkStockAdjustment(parseInt(e.target.value) || 0);
  };

  const applyBulkStockChange = () => {
    // In a real app, you would make an API call here
    setProducts(
      products.map(product => 
        selectedProducts.has(product.id) ? 
        { ...product, stock: Math.max(0, product.stock + bulkStockAdjustment) } : 
        product
      )
    );
    // Reset selection
    setSelectedProducts(new Set());
    setBulkStockAdjustment(0);
  };

  // Get all categories
  const categories = ['all', ...new Set(products.map(product => product.category.toLowerCase()))];
  
  // Filter products by category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === selectedCategory);

  // Sort by stock level (low stock first)
  const sortedProducts = [...filteredProducts].sort((a, b) => a.stock - b.stock);

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
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Inventory Management</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-2 border rounded-md w-full md:w-auto"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={toggleBulkEditMode}>
            {bulkEditMode ? 'Cancel Bulk Edit' : 'Bulk Edit Stock'}
          </Button>
        </div>
      </div>

      {/* Stock Warning Level Setting */}
      <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="font-medium text-sm flex-shrink-0">
            Low Stock Warning Level:
          </label>
          <input
            type="number"
            value={stockWarningLevel}
            onChange={handleStockWarningChange}
            min="0"
            className="w-24 px-3 py-1 border rounded-md"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Items with stock below this value will be highlighted as low stock.
          </p>
        </div>
      </div>

      {/* Bulk Edit Controls */}
      {bulkEditMode && (
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Bulk Stock Adjustment</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="text-sm">Adjust Stock By:</label>
            <input
              type="number"
              value={bulkStockAdjustment}
              onChange={handleBulkStockChange}
              className="w-24 px-3 py-1 border rounded-md"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              (Use negative numbers to reduce stock)
            </p>
            <Button 
              onClick={applyBulkStockChange} 
              disabled={selectedProducts.size === 0 || bulkStockAdjustment === 0}
              size="sm"
            >
              Apply to Selected ({selectedProducts.size})
            </Button>
          </div>
        </div>
      )}

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-green-50 dark:bg-green-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">In Stock Items</p>
          <p className="text-2xl font-bold">{products.filter(p => p.stock > 0).length}</p>
        </Card>
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock Items</p>
          <p className="text-2xl font-bold">{products.filter(p => p.stock > 0 && p.stock <= stockWarningLevel).length}</p>
        </Card>
        <Card className="p-4 bg-red-50 dark:bg-red-900/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock Items</p>
          <p className="text-2xl font-bold">{products.filter(p => p.stock === 0).length}</p>
        </Card>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {bulkEditMode && (
                <th className="p-3 text-left w-10">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (selectedProducts.size === filteredProducts.length) {
                        setSelectedProducts(new Set());
                      } else {
                        setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
                      }
                    }}
                    checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                  />
                </th>
              )}
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => {
              const isLowStock = product.stock > 0 && product.stock <= stockWarningLevel;
              const isOutOfStock = product.stock === 0;
              
              return (
                <tr 
                  key={product.id} 
                  className={`border-b dark:border-gray-700 ${
                    isOutOfStock 
                      ? 'bg-red-50 dark:bg-red-900/10' 
                      : isLowStock 
                      ? 'bg-yellow-50 dark:bg-yellow-900/10' 
                      : ''
                  }`}
                >
                  {bulkEditMode && (
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                      />
                    </td>
                  )}
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {product.description.length > 60 
                          ? product.description.substring(0, 60) + '...' 
                          : product.description}
                      </p>
                    </div>
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3 text-right">
                    {product.discountPrice ? (
                      <>
                        <p className="font-medium">${product.discountPrice.toFixed(2)}</p>
                        <p className="text-sm line-through text-gray-500">${product.price.toFixed(2)}</p>
                      </>
                    ) : (
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <span className={`font-medium ${
                      isOutOfStock 
                        ? 'text-red-600 dark:text-red-400' 
                        : isLowStock 
                        ? 'text-yellow-600 dark:text-yellow-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUpdateStock(product.id, product.stock + 1)}
                      >
                        +
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUpdateStock(product.id, Math.max(0, product.stock - 1))}
                        disabled={product.stock === 0}
                      >
                        -
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
