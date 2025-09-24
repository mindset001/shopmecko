/**
 * API client for the ShopMeco application
 * Contains utility functions for making API requests to the backend
 */

/**
 * Base API request function with error handling
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns Response data or throws error
 */
async function apiRequest(url: string, options: RequestInit = {}) {
  try {
    // Set default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Make the request
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies for authentication
    });

    // Parse response as JSON
    const data = await response.json();

    // Handle API errors
    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Authentication API
export const authApi = {
  /**
   * Register a new user
   * @param userData User registration data
   * @returns New user data
   */
  async register(userData: {
    email: string;
    password: string;
    fullName: string;
    role?: string;
    phone?: string;
  }) {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Login a user
   * @param credentials User login credentials
   * @returns User data and token
   */
  async login(credentials: { email: string; password: string }) {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Logout the current user
   * @returns Logout confirmation
   */
  async logout() {
    return apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * Get the current user's data
   * @returns Current user data or null if not authenticated
   */
  async getCurrentUser() {
    try {
      return await apiRequest('/api/users/me');
    } catch (error) {
      // If unauthorized, return null instead of throwing
      if (error.message.includes('Unauthorized') || error.message.includes('Authentication required')) {
        return null;
      }
      throw error;
    }
  },
};

// Vehicles API
export const vehicleApi = {
  /**
   * Get all vehicles for the current user
   * @param params Optional query parameters
   * @returns List of vehicles
   */
  async getVehicles(params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/vehicles${queryString ? `?${queryString}` : ''}`;
    return apiRequest(url);
  },

  /**
   * Get a specific vehicle by ID
   * @param id Vehicle ID
   * @returns Vehicle data
   */
  async getVehicle(id: string) {
    return apiRequest(`/api/vehicles/${id}`);
  },

  /**
   * Create a new vehicle
   * @param vehicleData Vehicle data
   * @returns Created vehicle data
   */
  async createVehicle(vehicleData: {
    make: string;
    model: string;
    year: number;
    registrationNumber: string;
    vin?: string;
    color?: string;
    fuelType?: string;
    engineSize?: string;
    transmissionType?: string;
    images?: string[];
  }) {
    return apiRequest('/api/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    });
  },

  /**
   * Update a vehicle
   * @param id Vehicle ID
   * @param vehicleData Vehicle data to update
   * @returns Updated vehicle data
   */
  async updateVehicle(id: string, vehicleData: Partial<{
    make: string;
    model: string;
    year: number;
    registrationNumber: string;
    vin?: string;
    color?: string;
    fuelType?: string;
    engineSize?: string;
    transmissionType?: string;
    images?: string[];
  }>) {
    return apiRequest(`/api/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    });
  },

  /**
   * Delete a vehicle
   * @param id Vehicle ID
   * @returns Deletion confirmation
   */
  async deleteVehicle(id: string) {
    return apiRequest(`/api/vehicles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Service Requests API
export const serviceRequestApi = {
  /**
   * Get all service requests for the current user
   * @param params Optional query parameters
   * @returns List of service requests
   */
  async getServiceRequests(params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/service-requests${queryString ? `?${queryString}` : ''}`;
    return apiRequest(url);
  },

  /**
   * Get a specific service request by ID
   * @param id Service request ID
   * @returns Service request data
   */
  async getServiceRequest(id: string) {
    return apiRequest(`/api/service-requests/${id}`);
  },

  /**
   * Create a new service request
   * @param serviceRequestData Service request data
   * @returns Created service request data
   */
  async createServiceRequest(serviceRequestData: {
    vehicleId: string;
    serviceType: string;
    description: string;
    appointmentDate?: string;
    location: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
    images?: string[];
  }) {
    return apiRequest('/api/service-requests', {
      method: 'POST',
      body: JSON.stringify(serviceRequestData),
    });
  },

  /**
   * Update a service request
   * @param id Service request ID
   * @param serviceRequestData Service request data to update
   * @returns Updated service request data
   */
  async updateServiceRequest(id: string, serviceRequestData: Partial<{
    serviceType: string;
    description: string;
    status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
    appointmentDate?: string;
    estimatedCompletionDate?: string;
    actualCompletionDate?: string;
    location: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
    estimatedCost?: number;
    finalCost?: number;
    images?: string[];
  }>) {
    return apiRequest(`/api/service-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceRequestData),
    });
  },

  /**
   * Complete a service request (repairer only)
   * @param id Service request ID
   * @param completionData Completion data
   * @returns Completed service request and maintenance record
   */
  async completeServiceRequest(id: string, completionData: {
    finalCost: number;
    serviceDate: string;
    mileage?: number;
    notes?: string;
    receipts?: string[];
  }) {
    return apiRequest(`/api/service-requests/${id}`, {
      method: 'POST',
      body: JSON.stringify(completionData),
    });
  },

  /**
   * Cancel a service request
   * @param id Service request ID
   * @returns Cancellation confirmation
   */
  async cancelServiceRequest(id: string) {
    return apiRequest(`/api/service-requests/${id}`, {
      method: 'DELETE',
    });
  },
};

// Repair Services API
export const repairServiceApi = {
  /**
   * Get all repair services
   * @param params Optional query parameters
   * @returns List of repair services
   */
  async getRepairServices(params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/repair-services${queryString ? `?${queryString}` : ''}`;
    return apiRequest(url);
  },

  /**
   * Get a specific repair service by ID
   * @param id Repair service ID
   * @returns Repair service data
   */
  async getRepairService(id: string) {
    return apiRequest(`/api/repair-services/${id}`);
  },

  /**
   * Create a new repair service (repairer only)
   * @param serviceData Repair service data
   * @returns Created repair service data
   */
  async createRepairService(serviceData: {
    name: string;
    description: string;
    category: string;
    subcategory?: string;
    basePrice: number;
    estimatedTime: string;
    images?: string[];
    isAvailable?: boolean;
  }) {
    return apiRequest('/api/repair-services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  },

  /**
   * Update a repair service
   * @param id Repair service ID
   * @param serviceData Repair service data to update
   * @returns Updated repair service data
   */
  async updateRepairService(id: string, serviceData: Partial<{
    name: string;
    description: string;
    category: string;
    subcategory?: string;
    basePrice: number;
    estimatedTime: string;
    images?: string[];
    isAvailable?: boolean;
  }>) {
    return apiRequest(`/api/repair-services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  },

  /**
   * Delete a repair service
   * @param id Repair service ID
   * @returns Deletion confirmation
   */
  async deleteRepairService(id: string) {
    return apiRequest(`/api/repair-services/${id}`, {
      method: 'DELETE',
    });
  },
};

// Products API
export const productApi = {
  /**
   * Get all products
   * @param params Optional query parameters
   * @returns List of products
   */
  async getProducts(params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/products${queryString ? `?${queryString}` : ''}`;
    return apiRequest(url);
  },

  /**
   * Get a specific product by ID
   * @param id Product ID
   * @returns Product data
   */
  async getProduct(id: string) {
    return apiRequest(`/api/products/${id}`);
  },

  /**
   * Create a new product (seller only)
   * @param productData Product data
   * @returns Created product data
   */
  async createProduct(productData: {
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    category: string;
    subcategory?: string;
    brand?: string;
    compatibility?: {
      make?: string[];
      model?: string[];
      year?: number[];
    };
    stock: number;
    images: string[];
    specifications?: Record<string, string>;
    isAvailable?: boolean;
  }) {
    return apiRequest('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  /**
   * Update a product
   * @param id Product ID
   * @param productData Product data to update
   * @returns Updated product data
   */
  async updateProduct(id: string, productData: Partial<{
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    category: string;
    subcategory?: string;
    brand?: string;
    compatibility?: {
      make?: string[];
      model?: string[];
      year?: number[];
    };
    stock: number;
    images: string[];
    specifications?: Record<string, string>;
    isAvailable?: boolean;
  }>) {
    return apiRequest(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  /**
   * Delete a product
   * @param id Product ID
   * @returns Deletion confirmation
   */
  async deleteProduct(id: string) {
    return apiRequest(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const orderApi = {
  /**
   * Get all orders for the current user
   * @param params Optional query parameters
   * @returns List of orders
   */
  async getOrders(params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `/api/orders${queryString ? `?${queryString}` : ''}`;
    return apiRequest(url);
  },

  /**
   * Get a specific order by ID
   * @param id Order ID
   * @returns Order data
   */
  async getOrder(id: string) {
    return apiRequest(`/api/orders/${id}`);
  },

  /**
   * Create a new order
   * @param orderData Order data
   * @returns Created order data
   */
  async createOrder(orderData: {
    products: { productId: string; quantity: number }[];
    sellerId: string;
    shippingAddress: {
      fullName: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      phone: string;
    };
    paymentMethod: string;
    shippingMethod?: string;
  }) {
    return apiRequest('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  /**
   * Update an order
   * @param id Order ID
   * @param orderData Order data to update
   * @returns Updated order data
   */
  async updateOrder(id: string, orderData: Partial<{
    orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
    trackingNumber?: string;
    shippingMethod?: string;
    estimatedDelivery?: string;
    actualDelivery?: string;
    paymentDetails?: {
      transactionId?: string;
      paymentDate?: string;
    };
  }>) {
    return apiRequest(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  },
};

// Reviews API
export const reviewApi = {
  /**
   * Get reviews for a target
   * @param targetType Type of target
   * @param targetId Target ID
   * @param params Optional query parameters
   * @returns List of reviews
   */
  async getReviews(
    targetType: 'product' | 'repairer' | 'seller' | 'service',
    targetId: string,
    params: Record<string, string> = {}
  ) {
    const queryParams = {
      ...params,
      targetType,
      targetId,
    };
    const queryString = new URLSearchParams(queryParams).toString();
    return apiRequest(`/api/reviews?${queryString}`);
  },

  /**
   * Get a specific review by ID
   * @param id Review ID
   * @returns Review data
   */
  async getReview(id: string) {
    return apiRequest(`/api/reviews/${id}`);
  },

  /**
   * Create a new review
   * @param reviewData Review data
   * @returns Created review data
   */
  async createReview(reviewData: {
    targetType: 'product' | 'repairer' | 'seller' | 'service';
    targetId: string;
    rating: number;
    title?: string;
    comment: string;
    images?: string[];
    orderId?: string;
    serviceRequestId?: string;
  }) {
    return apiRequest('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  /**
   * Update a review
   * @param id Review ID
   * @param reviewData Review data to update
   * @returns Updated review data
   */
  async updateReview(id: string, reviewData: Partial<{
    rating: number;
    title?: string;
    comment: string;
    images?: string[];
  }>) {
    return apiRequest(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    });
  },

  /**
   * Delete a review
   * @param id Review ID
   * @returns Deletion confirmation
   */
  async deleteReview(id: string) {
    return apiRequest(`/api/reviews/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Respond to a review (seller/repairer/admin only)
   * @param id Review ID
   * @param responseData Response data
   * @returns Updated review with response
   */
  async respondToReview(id: string, responseData: {
    comment: string;
  }) {
    return apiRequest(`/api/reviews/${id}`, {
      method: 'POST',
      body: JSON.stringify(responseData),
    });
  },
};

// Export all APIs
export const api = {
  auth: authApi,
  vehicles: vehicleApi,
  serviceRequests: serviceRequestApi,
  repairServices: repairServiceApi,
  products: productApi,
  orders: orderApi,
  reviews: reviewApi,
};

export default api;
