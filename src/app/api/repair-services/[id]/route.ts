import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { withAuth, JwtPayload } from '@/lib/auth';
import { validateData, handleApiError } from '@/lib/api-utils';
import { RepairService, User } from '@/models';

// Validation schema for updating repair services
const updateRepairServiceSchema = z.object({
  name: z.string().min(1, 'Service name is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  category: z.string().min(1, 'Category is required').optional(),
  subcategory: z.string().optional(),
  basePrice: z.number().min(0, 'Base price cannot be negative').optional(),
  estimatedTime: z.string().min(1, 'Estimated time is required').optional(),
  images: z.array(z.string()).optional(),
  isAvailable: z.boolean().optional(),
});

/**
 * GET: Get a specific repair service
 */
async function getRepairService(
  req: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const serviceId = params.id;
    
    const service = await RepairService.findById(serviceId)
      .populate('repairerId', 'fullName businessInfo ratings');
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(service);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT: Update a specific repair service
 * Only the owner repairer or admin can update the service
 */
async function updateRepairService(
  req: NextRequest, 
  user: any, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const serviceId = params.id;
    
    // Find the service
    const service = await RepairService.findById(serviceId);
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Check if user has permission to update
    const hasPermission = 
      user.role === 'admin' || 
      (service.repairerId.toString() === user.userId && user.role === 'repairer');
    
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have permission to update this service' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, updateRepairServiceSchema);
    
    // Update the service
    const updatedService = await RepairService.findByIdAndUpdate(
      serviceId,
      { $set: validatedData },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedService);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE: Delete a specific repair service
 * Only the owner repairer or admin can delete the service
 */
async function deleteRepairService(
  req: NextRequest, 
  user: any, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const serviceId = params.id;
    
    // Find the service
    const service = await RepairService.findById(serviceId);
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Check if user has permission to delete
    const hasPermission = 
      user.role === 'admin' || 
      (service.repairerId.toString() === user.userId && user.role === 'repairer');
    
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this service' },
        { status: 403 }
      );
    }
    
    // Delete the service
    await RepairService.findByIdAndDelete(serviceId);
    
    // Remove from repairer's services array
    await User.findByIdAndUpdate(
      service.repairerId,
      { $pull: { 'businessInfo.services': serviceId } }
    );
    
    return NextResponse.json(
      { message: 'Service deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Wrapper for updateRepairService to make it compatible with withAuth
 */
function updateRepairServiceWrapper(
  req: NextRequest, 
  user?: JwtPayload, 
  context?: { params: Promise<{ id: string }> }
) {
  if (!context) {
    // Extract params from the URL if context is not provided
    const id = req.nextUrl.pathname.split('/').pop() || '';
    const params = Promise.resolve({ id });
    context = { params };
  }
  return updateRepairService(req, user, context);
}

/**
 * Wrapper for deleteRepairService to make it compatible with withAuth
 */
function deleteRepairServiceWrapper(
  req: NextRequest, 
  user?: JwtPayload, 
  context?: { params: Promise<{ id: string }> }
) {
  if (!context) {
    // Extract params from the URL if context is not provided
    const id = req.nextUrl.pathname.split('/').pop() || '';
    const params = Promise.resolve({ id });
    context = { params };
  }
  return deleteRepairService(req, user, context);
}

export const GET = getRepairService;
export const PUT = withAuth(updateRepairServiceWrapper, { requiresAuth: true });
export const DELETE = withAuth(deleteRepairServiceWrapper, { requiresAuth: true });
