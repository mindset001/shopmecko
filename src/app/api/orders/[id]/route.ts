import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { validateData, handleApiError } from '@/lib/api-utils';
import { Order } from '@/models';

// Validation schema for updating orders
const updateOrderSchema = z.object({
  orderStatus: z.enum(['processing', 'shipped', 'delivered', 'cancelled']).optional(),
  paymentStatus: z.enum(['pending', 'completed', 'failed', 'refunded']).optional(),
  trackingNumber: z.string().optional(),
  shippingMethod: z.string().optional(),
  estimatedDelivery: z.string().optional().transform(val => val ? new Date(val) : undefined),
  actualDelivery: z.string().optional().transform(val => val ? new Date(val) : undefined),
  paymentDetails: z.object({
    transactionId: z.string().optional(),
    paymentDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  }).optional(),
});

/**
 * GET: Get a specific order
 */
async function getOrder(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const orderId = params.id;
    
    // Find order
    const order = await Order.findById(orderId)
      .populate('customerId', 'fullName email')
      .populate('sellerId', 'fullName businessInfo.businessName')
      .populate({
        path: 'products.productId',
        select: 'name images category'
      });
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check access permissions
    const hasAccess = 
      user.role === 'admin' || 
      order.customerId._id.toString() === user.userId || 
      order.sellerId._id.toString() === user.userId;
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT: Update a specific order
 */
async function updateOrder(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const orderId = params.id;
    
    // Find order
    const order = await Order.findById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Check permissions based on user role
    let hasPermission = false;
    
    if (user.role === 'admin') {
      // Admins can update any order
      hasPermission = true;
    } else if (user.role === 'seller' && order.sellerId.toString() === user.userId) {
      // Sellers can update their own orders with limitations
      hasPermission = true;
      
      // Parse body to check what seller is trying to update
      const body = await req.json();
      
      // Sellers can only update certain fields
      const allowedFields = ['orderStatus', 'trackingNumber', 'shippingMethod', 'estimatedDelivery', 'actualDelivery'];
      const attemptedFields = Object.keys(body);
      
      const illegalUpdate = attemptedFields.some(field => !allowedFields.includes(field));
      
      if (illegalUpdate) {
        return NextResponse.json(
          { error: 'You do not have permission to update these fields' },
          { status: 403 }
        );
      }
      
      // Sellers can't mark an order as cancelled if it's already shipped or delivered
      if (body.orderStatus === 'cancelled' && 
          (order.orderStatus === 'shipped' || order.orderStatus === 'delivered')) {
        return NextResponse.json(
          { error: 'Cannot cancel an order that has been shipped or delivered' },
          { status: 400 }
        );
      }
    } else if (user.role === 'vehicle-owner' && order.customerId.toString() === user.userId) {
      // Customers can only cancel their orders if they're still processing
      hasPermission = true;
      
      // Parse body to check what customer is trying to update
      const body = await req.json();
      
      // Customers can only cancel orders
      if (Object.keys(body).length > 1 || !body.orderStatus) {
        return NextResponse.json(
          { error: 'You can only update the order status' },
          { status: 403 }
        );
      }
      
      // Can only change to 'cancelled'
      if (body.orderStatus !== 'cancelled') {
        return NextResponse.json(
          { error: 'You can only cancel the order' },
          { status: 403 }
        );
      }
      
      // Can only cancel if still processing
      if (order.orderStatus !== 'processing') {
        return NextResponse.json(
          { error: 'Orders can only be cancelled while in processing state' },
          { status: 400 }
        );
      }
    }
    
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have permission to update this order' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, updateOrderSchema);
    
    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: validatedData },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withAuth(getOrderWrapper, { requiresAuth: true });
export const PUT = withAuth(updateOrderWrapper, { requiresAuth: true });
