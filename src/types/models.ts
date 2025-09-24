/**
 * ShopMeco Application Data Models
 * 
 * This file defines TypeScript interfaces for the core data models used in the ShopMeco application.
 */

// User role types
export type UserRole = 'VEHICLE_OWNER' | 'REPAIRER' | 'SELLER' | 'ADMIN';

// Base user interface
export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  avatar?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

// Vehicle owner specific data
export interface VehicleOwner extends User {
  role: 'VEHICLE_OWNER';
  vehicles: Vehicle[];
  serviceRequests: ServiceRequest[];
}

// Vehicle data
export interface Vehicle {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin?: string; // Vehicle Identification Number
  color?: string;
  fuelType?: string;
  engineSize?: string;
  transmissionType?: string;
  images?: string[];
  maintenanceHistory: MaintenanceRecord[];
  createdAt: Date;
  updatedAt: Date;
}

// Maintenance history for vehicles
export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  serviceDate: Date;
  serviceType: string;
  description: string;
  mileage?: number;
  cost?: number;
  workshopId?: string; // If service was done through ShopMeco
  serviceRequestId?: string;
  attachments?: string[]; // Receipts, images, etc.
  createdAt: Date;
}

// Service requests from vehicle owners
export interface ServiceRequest {
  id: string;
  vehicleId: string;
  ownerId: string;
  serviceType: string;
  description: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  location?: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  preferredDate?: Date;
  budget?: number;
  repairerId?: string; // ID of the selected repairer
  quotes: ServiceQuote[];
  createdAt: Date;
  updatedAt: Date;
}

// Workshop/Repairer data
export interface Repairer extends User {
  role: 'REPAIRER';
  businessName: string;
  businessDescription?: string;
  specializations: string[];
  workshopImages?: string[];
  rating?: number;
  completedJobs: number;
  services: RepairService[];
  reviews: Review[];
  certifications?: string[];
  operatingHours?: {
    [key: string]: { // day of week
      open: string; // HH:MM format
      close: string; // HH:MM format
      isClosed: boolean;
    }
  };
}

// Services offered by repairers
export interface RepairService {
  id: string;
  repairerId: string;
  name: string;
  description: string;
  category: string;
  estimatedDuration?: string; // e.g., "2-3 hours"
  basePrice?: number;
  priceType: 'FIXED' | 'HOURLY' | 'QUOTE_REQUIRED';
  createdAt: Date;
  updatedAt: Date;
}

// Simplified service interface for components
export interface Service {
  id: string;
  repairerId: string;
  name: string;
  description: string;
  category: string;
  estimatedDuration: string; // e.g., "2-3 hours"
  basePrice: number;
  priceType: 'FIXED' | 'HOURLY';
  createdAt: Date;
  updatedAt: Date;
}

// Quotes from repairers for service requests
export interface ServiceQuote {
  id: string;
  serviceRequestId: string;
  repairerId: string;
  price: number;
  estimatedDuration: string; // e.g., "2-3 days"
  description: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Spare part seller data
export interface Seller extends User {
  role: 'SELLER';
  businessName: string;
  businessDescription?: string;
  storeAddress?: string;
  logo?: string;
  coverImage?: string;
  storeImages?: string[];
  rating?: number;
  categories: string[]; // Product categories offered by the seller
  specializations: string[]; // Types of parts or vehicle makes they specialize in
  products: Product[];
  inventory?: InventoryItem[];
  reviews: Review[];
  completedOrders?: number;
  productsCount?: number;
  verified?: boolean; // Verification status
  operatingHours?: {
    [key: string]: { // day of week
      open: string; // HH:MM format
      close: string; // HH:MM format
      isClosed: boolean;
    }
  };
  businessHours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  website?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  shippingOptions?: {
    id: string;
    name: string;
    description: string;
    estimatedDelivery: string;
    cost: number;
  }[];
  returnPolicy?: string;
  featured?: boolean;
}

// Spare parts/products
export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  category: string;
  compatibleVehicles: {
    make: string;
    model?: string;
    yearStart?: number;
    yearEnd?: number;
  }[];
  condition: 'NEW' | 'USED' | 'REFURBISHED';
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  specifications?: Record<string, string>;
  rating?: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

// Reviews for repairers, sellers, or products
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment?: string;
  images?: string[];
  targetType: 'REPAIRER' | 'SELLER' | 'PRODUCT';
  targetId: string; // ID of the repairer, seller, or product being reviewed
  createdAt: Date;
  updatedAt: Date;
}

// Order for spare parts
export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  customerName?: string;
  customerEmail?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED';
  paymentMethod?: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  shippingAddress: {
    fullName?: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode?: string;
    postalCode?: string;
    phoneNumber?: string;
  };
  shippingMethod?: string;
  trackingNumber?: string;
  notes?: string;
  orderDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Individual items in an order
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Inventory item for sellers
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  reorderLevel: number;
  supplier: string;
  description: string;
  imageUrl?: string;
  barcode?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  location?: string;
  lastRestocked?: Date;
  compatibility?: {
    make: string;
    model: string;
    year: number | string;
    engineType?: string;
  }[];
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED';
}

// Chat/messaging between users
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  readAt?: Date;
  attachments?: string[];
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

// Notification for users
export interface Notification {
  id: string;
  userId: string;
  type: 'SERVICE_REQUEST' | 'QUOTE' | 'ORDER' | 'SYSTEM' | 'MESSAGE';
  title: string;
  message: string;
  isRead: boolean;
  linkUrl?: string; // URL to navigate to when clicked
  createdAt: Date;
}
