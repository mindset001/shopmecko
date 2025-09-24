# ShopMeco Backend API Documentation

## Overview
This document provides detailed information about the ShopMeco backend API. The API is built using Next.js API routes with MongoDB as the database.

## Database Models

### User
- Full user profile with role-based access control
- Support for vehicle owners, repairers, sellers, and admins
- Business info for repairers and sellers
- Address with geolocation support

### Vehicle
- Complete vehicle information storage
- Links to maintenance history
- Registration and VIN tracking

### MaintenanceRecord
- Historical record of vehicle services
- Links to service requests and service providers
- Cost and receipt tracking

### ServiceRequest
- Service requests between vehicle owners and repairers
- Status tracking from creation to completion
- Location-based services with geolocation

### RepairService
- Services offered by repairers
- Pricing, description, and categorization
- Rating system

### Product
- Auto parts and accessories catalog
- Vehicle compatibility matching
- Inventory management

### Order
- Complete order processing system
- Status tracking from order to delivery
- Payment status management

### Review
- Rating and review system for products, repairers, sellers, and services
- Response capability for business owners
- Verified purchase/service validation

## API Endpoints

### Authentication
- `/api/auth/register` - Register new users
- `/api/auth/login` - User login
- `/api/auth/logout` - User logout

### Users
- `/api/users` - List and manage users
- `/api/users/[id]` - Specific user operations

### Vehicles
- `/api/vehicles` - List and create vehicles
- `/api/vehicles/[id]` - Manage specific vehicles

### Service Requests
- `/api/service-requests` - List and create service requests
- `/api/service-requests/[id]` - Manage specific service requests

### Repair Services
- `/api/repair-services` - List and create repair services
- `/api/repair-services/[id]` - Manage specific repair services

### Products
- `/api/products` - List and create products
- `/api/products/[id]` - Manage specific products

### Orders
- `/api/orders` - List and create orders
- `/api/orders/[id]` - Manage specific orders

### Reviews
- `/api/reviews` - List and create reviews
- `/api/reviews/[id]` - Manage specific reviews

### System
- `/api/health` - API health check

## Authentication System

Authentication is handled through JWT tokens stored in HTTP-only cookies for security. Each API endpoint validates the user's role and permissions before processing requests.

## Role-Based Access Control

The system implements role-based access control with four primary roles:

1. **Vehicle Owner**
   - Can manage their vehicles
   - Can create service requests
   - Can place orders for products
   - Can write reviews after using services or purchasing products

2. **Repairer**
   - Can manage their service offerings
   - Can accept and complete service requests
   - Can respond to reviews

3. **Seller**
   - Can manage their product catalog
   - Can process orders
   - Can respond to reviews

4. **Admin**
   - Has access to all system features
   - Can manage users, service requests, products, and orders
   - Can moderate reviews

## Validation and Error Handling

All API requests are validated using Zod schema validation, ensuring that incoming data meets the required format and constraints. Error handling provides clear and detailed error messages for easy debugging and user feedback.

## Geolocation Support

The system supports geolocation for service requests, allowing vehicle owners to find nearby repairers and for repairers to find nearby service requests.

## Rating and Review System

A comprehensive rating and review system allows users to rate products, services, repairers, and sellers. The system ensures that only users who have purchased products or used services can leave reviews.

## Development Setup

### Requirements
- Node.js 16+ and npm
- MongoDB database
- Environment variables configured

### Environment Variables
Create a `.env.local` file with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Installing Dependencies
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

## Deployment

The API is designed to be deployed on any platform that supports Next.js applications, such as Vercel, AWS, or your own server.

### Deployment Checklist
1. Set up environment variables
2. Configure MongoDB connection
3. Set appropriate CORS headers if needed
4. Enable production optimizations
