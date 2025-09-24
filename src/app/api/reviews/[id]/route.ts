import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { validateData, handleApiError } from '@/lib/api-utils';
import { Review, Product, User, RepairService } from '@/models';

// Validation schema for updating reviews
const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  title: z.string().optional(),
  comment: z.string().min(1, 'Review comment is required').optional(),
  images: z.array(z.string()).optional(),
});

// Validation schema for adding a response to a review
const responseSchema = z.object({
  comment: z.string().min(1, 'Response comment is required')
});

/**
 * GET: Get a specific review
 */
async function getReview(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const reviewId = params.id;
    
    const review = await Review.findById(reviewId)
      .populate('userId', 'fullName profileImage');
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(review);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT: Update a specific review
 * Only the original reviewer can update their review
 */
async function updateReview(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const reviewId = params.id;
    
    // Find the review
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Check if user has permission to update
    if (review.userId.toString() !== user.userId && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You do not have permission to update this review' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, updateReviewSchema);
    
    // Get the previous rating for updating target's average
    const previousRating = review.rating;
    const newRating = validatedData.rating || previousRating;
    
    // Update the review
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $set: validatedData },
      { new: true, runValidators: true }
    );
    
    // If rating changed, update the target's rating average
    if (validatedData.rating && validatedData.rating !== previousRating) {
      // Find the target to update its rating
      let target;
      const ratingsDiff = newRating - previousRating;
      
      switch (review.targetType) {
        case 'product':
          target = await Product.findById(review.targetId);
          if (target) {
            const currentRatings = target.ratings;
            const newAverage = (currentRatings.average * currentRatings.count + ratingsDiff) / currentRatings.count;
            
            await Product.findByIdAndUpdate(review.targetId, {
              'ratings.average': newAverage
            });
          }
          break;
        case 'service':
          target = await RepairService.findById(review.targetId);
          if (target) {
            const currentRatings = target.ratings;
            const newAverage = (currentRatings.average * currentRatings.count + ratingsDiff) / currentRatings.count;
            
            await RepairService.findByIdAndUpdate(review.targetId, {
              'ratings.average': newAverage
            });
          }
          break;
        case 'repairer':
        case 'seller':
          target = await User.findById(review.targetId);
          if (target) {
            const currentRatings = target.ratings;
            const newAverage = (currentRatings.average * currentRatings.count + ratingsDiff) / currentRatings.count;
            
            await User.findByIdAndUpdate(review.targetId, {
              'ratings.average': newAverage
            });
          }
          break;
      }
    }
    
    return NextResponse.json(updatedReview);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE: Delete a specific review
 * Only the original reviewer or an admin can delete a review
 */
async function deleteReview(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const reviewId = params.id;
    
    // Find the review
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Check if user has permission to delete
    if (review.userId.toString() !== user.userId && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You do not have permission to delete this review' },
        { status: 403 }
      );
    }
    
    // Remove this review's impact on the target's rating
    let target;
    const rating = review.rating;
    
    switch (review.targetType) {
      case 'product':
        target = await Product.findById(review.targetId);
        if (target && target.ratings.count > 1) {
          // Calculate new average by removing this review's rating
          const currentTotal = target.ratings.average * target.ratings.count;
          const newTotal = currentTotal - rating;
          const newCount = target.ratings.count - 1;
          const newAverage = newTotal / newCount;
          
          await Product.findByIdAndUpdate(review.targetId, {
            'ratings.average': newAverage,
            'ratings.count': newCount
          });
        } else if (target) {
          // If this was the only review, reset ratings
          await Product.findByIdAndUpdate(review.targetId, {
            'ratings.average': 0,
            'ratings.count': 0
          });
        }
        break;
      case 'service':
        target = await RepairService.findById(review.targetId);
        if (target && target.ratings.count > 1) {
          const currentTotal = target.ratings.average * target.ratings.count;
          const newTotal = currentTotal - rating;
          const newCount = target.ratings.count - 1;
          const newAverage = newTotal / newCount;
          
          await RepairService.findByIdAndUpdate(review.targetId, {
            'ratings.average': newAverage,
            'ratings.count': newCount
          });
        } else if (target) {
          await RepairService.findByIdAndUpdate(review.targetId, {
            'ratings.average': 0,
            'ratings.count': 0
          });
        }
        break;
      case 'repairer':
      case 'seller':
        target = await User.findById(review.targetId);
        if (target && target.ratings.count > 1) {
          const currentTotal = target.ratings.average * target.ratings.count;
          const newTotal = currentTotal - rating;
          const newCount = target.ratings.count - 1;
          const newAverage = newTotal / newCount;
          
          await User.findByIdAndUpdate(review.targetId, {
            'ratings.average': newAverage,
            'ratings.count': newCount
          });
        } else if (target) {
          await User.findByIdAndUpdate(review.targetId, {
            'ratings.average': 0,
            'ratings.count': 0
          });
        }
        break;
    }
    
    // Delete the review
    await Review.findByIdAndDelete(reviewId);
    
    return NextResponse.json(
      { message: 'Review deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST: Add a response to a review
 * Only the target (seller/repairer) or an admin can respond to a review
 */
async function respondToReview(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const reviewId = params.id;
    
    // Find the review
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Check if review already has a response
    if (review.response) {
      return NextResponse.json(
        { error: 'This review already has a response' },
        { status: 409 }
      );
    }
    
    // Check if user has permission to respond
    let hasPermission = user.role === 'admin';
    
    if (!hasPermission) {
      // Check if user is the target of the review
      if ((review.targetType === 'seller' || review.targetType === 'repairer') && 
          review.targetId.toString() === user.userId) {
        hasPermission = true;
      }
      
      // Check if user is the seller or repairer of a product/service
      if (review.targetType === 'product') {
        const product = await Product.findById(review.targetId);
        if (product && product.sellerId.toString() === user.userId) {
          hasPermission = true;
        }
      } else if (review.targetType === 'service') {
        const service = await RepairService.findById(review.targetId);
        if (service && service.repairerId.toString() === user.userId) {
          hasPermission = true;
        }
      }
    }
    
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have permission to respond to this review' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, responseSchema);
    
    // Add response to review
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { 
        response: {
          userId: user.userId,
          comment: validatedData.comment,
          date: new Date()
        }
      },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedReview);
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = getReview;
export const PUT = withAuth(updateReview, { requiresAuth: true });
export const DELETE = withAuth(deleteReview, { requiresAuth: true });
export const POST = withAuth(respondToReview, { requiresAuth: true });
