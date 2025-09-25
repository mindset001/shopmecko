import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { validateData, handleApiError } from '@/lib/api-utils';
import { Order, Product, User } from '@/models';

// Validation schema for creating orders
const createOrderSchema = z.object({
  products: z.array(z.object({
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  })),
  sellerId: z.string().min(1, 'Seller ID is required'),
  shippingAddress: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().min(1, 'Phone number is required'),
  }),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  shippingMethod: z.string().optional(),
});

/**
 * GET: Get orders based on user role
 * - Customers: See their orders
 * - Sellers: See orders for their products
 * - Admins: See all orders with optional filtering
 */
async function getOrders(req: NextRequest, user: any) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    
    // Basic query for filtering
    const query: any = {};
    
    // Status filter
    const orderStatus = searchParams.get('orderStatus');
    if (orderStatus) {
      query.orderStatus = orderStatus;
    }
    
    const paymentStatus = searchParams.get('paymentStatus');
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }
    
    // Date range filter
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    // Filter based on user role
    switch (user.role) {
      case 'vehicle-owner':
        // Vehicle owners can only see their own orders
        query.customerId = user.userId;
        break;
      case 'seller':
        // Sellers can only see orders for their products
        query.sellerId = user.userId;
        break;
      case 'admin':
        // Admins can see all orders (no additional filter needed)
        break;
      default:
        // Other roles not allowed
        return NextResponse.json(
          { error: 'Access denied' },
          { status: 403 }
        );
    }
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;
    
    // Execute query with populate
    const orders = await Order.find(query)
      .populate('customerId', 'fullName email')
      .populate('sellerId', 'fullName businessInfo.businessName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Order.countDocuments(query);
    
    return NextResponse.json({
      orders,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST: Create a new order
 * Only vehicle owners (customers) can create orders
 */
async function createOrder(req: NextRequest, user: any) {
  try {
    await connectToDatabase();
    
    // Only vehicle owners can create orders
    if (user.role !== 'vehicle-owner') {
      return NextResponse.json(
        { error: 'Only vehicle owners can create orders' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, createOrderSchema);
    
    // Check if the seller exists
    const seller = await User.findOne({
      _id: validatedData.sellerId,
      role: 'seller'
    });
    
    if (!seller) {
      return NextResponse.json(
        { error: 'Invalid seller' },
        { status: 404 }
      );
    }
    
    // Process products and calculate total
    const orderProducts = [];
    let totalAmount = 0;
    
    for (const item of validatedData.products) {
      // Get product details
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found` },
          { status: 404 }
        );
      }
      
      if (product.sellerId.toString() !== validatedData.sellerId) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} does not belong to the specified seller` },
          { status: 400 }
        );
      }
      
      if (!product.isAvailable) {
        return NextResponse.json(
          { error: `Product ${product.name} is not available` },
          { status: 400 }
        );
      }
      
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for ${product.name}. Available: ${product.stock}` },
          { status: 400 }
        );
      }
      
      // Calculate price (use discount price if available)
      const price = product.discountPrice || product.price;
      const subtotal = price * item.quantity;
      
      // Add to order products
      orderProducts.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
        subtotal
      });
      
      totalAmount += subtotal;
      
      // Update product stock
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity }
      });
    }
    
    // Create the order
    const newOrder = await Order.create({
      customerId: user.userId,
      sellerId: validatedData.sellerId,
      products: orderProducts,
      totalAmount,
      shippingAddress: validatedData.shippingAddress,
      paymentMethod: validatedData.paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'processing',
      shippingMethod: validatedData.shippingMethod
    });
    
    // In a real app, we would integrate with a payment processor here
    
    return NextResponse.json(
      {
        message: 'Order created successfully',
        order: newOrder
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withAuth(getOrdersWrapper, { requiresAuth: true });
export const POST = withAuth(createOrder, {
  requiresAuth: true,
  allowedRoles: ['vehicle-owner']
});
