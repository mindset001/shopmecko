import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { validateData, handleApiError } from '@/lib/api-utils';
import { Review, Product, User, RepairService, Order, ServiceRequest } from '@/models';

// Validation schema for creating reviews
const createReviewSchema = z.object({
  targetType: z.enum(['product', 'repairer', 'seller', 'service']),
  targetId: z.string().min(1, 'Target ID is required'),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().min(1, 'Review comment is required'),
  images: z.array(z.string()).optional(),
  orderId: z.string().optional(), // For product reviews
  serviceRequestId: z.string().optional(), // For service reviews
});

/**
 * GET: Get reviews for a target
 */
async function getReviews(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    
    // Get target type and ID from query params
    const targetType = searchParams.get('targetType');
    const targetId = searchParams.get('targetId');
    
    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: 'targetType and targetId are required query parameters' },
        { status: 400 }
      );
    }
    
    // Validate target type
    const validTargetTypes = ['product', 'repairer', 'seller', 'service'];
    if (!validTargetTypes.includes(targetType)) {
      return NextResponse.json(
        { error: 'Invalid targetType. Must be one of: product, repairer, seller, service' },
        { status: 400 }
      );
    }
    
    // Build query
    const query = {
      targetType,
      targetId,
    };
    
    // Filter by rating
    const rating = searchParams.get('rating');
    if (rating) {
      query.rating = parseInt(rating, 10);
    }
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;
    
    // Get reviews
    const reviews = await Review.find(query)
      .populate('userId', 'fullName profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count
    const total = await Review.countDocuments(query);
    
    // Get rating distribution
    const ratingDistribution = await Review.aggregate([
      { $match: query },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);
    
    // Format rating distribution
    const distribution = {};
    for (let i = 1; i <= 5; i++) {
      distribution[i] = 0;
    }
    
    ratingDistribution.forEach(item => {
      distribution[item._id] = item.count;
    });
    
    return NextResponse.json({
      reviews,
      distribution,
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
 * POST: Create a new review
 */
async function createReview(req: NextRequest, user: any) {
  try {
    await connectToDatabase();
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, createReviewSchema);
    
    // Check if the target exists
    let target;
    switch (validatedData.targetType) {
      case 'product':
        target = await Product.findById(validatedData.targetId);
        break;
      case 'service':
        target = await RepairService.findById(validatedData.targetId);
        break;
      case 'repairer':
      case 'seller':
        target = await User.findById(validatedData.targetId);
        if (target && 
            ((validatedData.targetType === 'repairer' && target.role !== 'repairer') ||
             (validatedData.targetType === 'seller' && target.role !== 'seller'))) {
          target = null;
        }
        break;
    }
    
    if (!target) {
      return NextResponse.json(
        { error: 'Review target not found' },
        { status: 404 }
      );
    }
    
    // Verify that the user has interacted with the target
    if (validatedData.targetType === 'product') {
      // Check if user has purchased the product
      let hasOrdered = false;
      
      if (validatedData.orderId) {
        const order = await Order.findOne({
          _id: validatedData.orderId,
          customerId: user.userId,
          'products.productId': validatedData.targetId,
          orderStatus: 'delivered'
        });
        
        hasOrdered = !!order;
      } else {
        // Check any order
        const order = await Order.findOne({
          customerId: user.userId,
          'products.productId': validatedData.targetId,
          orderStatus: 'delivered'
        });
        
        hasOrdered = !!order;
      }
      
      if (!hasOrdered) {
        return NextResponse.json(
          { error: 'You can only review products you have purchased' },
          { status: 403 }
        );
      }
    } else if (validatedData.targetType === 'service' || validatedData.targetType === 'repairer') {
      // Check if user has used the service or repairer
      let hasUsedService = false;
      
      if (validatedData.serviceRequestId) {
        const serviceRequest = await ServiceRequest.findOne({
          _id: validatedData.serviceRequestId,
          ownerId: user.userId,
          status: 'completed'
        });
        
        if (validatedData.targetType === 'service') {
          // For service reviews, check if the service was provided
          hasUsedService = !!serviceRequest && serviceRequest.serviceType === target.name;
        } else {
          // For repairer reviews, check if the repairer was involved
          hasUsedService = !!serviceRequest && serviceRequest.repairerId.toString() === validatedData.targetId;
        }
      } else {
        // Check any service request
        const serviceRequest = await ServiceRequest.findOne({
          ownerId: user.userId,
          status: 'completed',
          ...(validatedData.targetType === 'repairer' ? { repairerId: validatedData.targetId } : {})
        });
        
        hasUsedService = !!serviceRequest;
      }
      
      if (!hasUsedService) {
        return NextResponse.json(
          { error: 'You can only review services or repairers you have used' },
          { status: 403 }
        );
      }
    } else if (validatedData.targetType === 'seller') {
      // Check if user has purchased from the seller
      const order = await Order.findOne({
        customerId: user.userId,
        sellerId: validatedData.targetId,
        orderStatus: 'delivered'
      });
      
      if (!order) {
        return NextResponse.json(
          { error: 'You can only review sellers you have purchased from' },
          { status: 403 }
        );
      }
    }
    
    // Check if user has already reviewed this target
    const existingReview = await Review.findOne({
      userId: user.userId,
      targetType: validatedData.targetType,
      targetId: validatedData.targetId
    });
    
    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this item' },
        { status: 409 }
      );
    }
    
    // Create the review
    const newReview = await Review.create({
      ...validatedData,
      userId: user.userId,
      helpful: { count: 0, users: [] },
      isVerified: true // Auto-verify for now
    });
    
    // Update target's ratings
    let currentRatings;
    switch (validatedData.targetType) {
      case 'product':
        currentRatings = target.ratings || { average: 0, count: 0 };
        await Product.findByIdAndUpdate(validatedData.targetId, {
          'ratings.average': ((currentRatings.average * currentRatings.count) + validatedData.rating) / (currentRatings.count + 1),
          'ratings.count': currentRatings.count + 1
        });
        break;
      case 'service':
        currentRatings = target.ratings || { average: 0, count: 0 };
        await RepairService.findByIdAndUpdate(validatedData.targetId, {
          'ratings.average': ((currentRatings.average * currentRatings.count) + validatedData.rating) / (currentRatings.count + 1),
          'ratings.count': currentRatings.count + 1
        });
        break;
      case 'repairer':
      case 'seller':
        currentRatings = target.ratings || { average: 0, count: 0 };
        await User.findByIdAndUpdate(validatedData.targetId, {
          'ratings.average': ((currentRatings.average * currentRatings.count) + validatedData.rating) / (currentRatings.count + 1),
          'ratings.count': currentRatings.count + 1
        });
        break;
    }
    
    return NextResponse.json(
      {
        message: 'Review submitted successfully',
        review: newReview
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = getReviews;
export const POST = withAuth(createReview, { 
  requiresAuth: true,
  allowedRoles: ['vehicle-owner'] 
});
