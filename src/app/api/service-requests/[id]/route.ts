import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { validateData, handleApiError } from '@/lib/api-utils';
import { ServiceRequest, MaintenanceRecord } from '@/models';

// Validation schema for updating service requests
const updateServiceRequestSchema = z.object({
  serviceType: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  status: z.enum(['pending', 'accepted', 'in-progress', 'completed', 'cancelled']).optional(),
  appointmentDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  estimatedCompletionDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  actualCompletionDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
  location: z.object({
    address: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }).optional(),
  }).optional(),
  estimatedCost: z.number().min(0).optional(),
  finalCost: z.number().min(0).optional(),
  images: z.array(z.string()).optional(),
});

// Validation schema for completing service requests
const completeServiceRequestSchema = z.object({
  finalCost: z.number().min(0, 'Final cost is required'),
  serviceDate: z.string().transform(val => new Date(val)),
  mileage: z.number().optional(),
  notes: z.string().optional(),
  receipts: z.array(z.string()).optional(),
});

/**
 * GET: Get a specific service request
 */
async function getServiceRequest(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const serviceRequestId = params.id;
    
    // Find service request
    const serviceRequest = await ServiceRequest.findById(serviceRequestId)
      .populate('vehicleId', 'make model year registrationNumber')
      .populate('ownerId', 'fullName email')
      .populate('repairerId', 'fullName email businessInfo')
      .populate('maintenanceRecordId');
    
    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }
    
    // Check access permissions
    const hasAccess = 
      user.role === 'admin' || 
      serviceRequest.ownerId._id.toString() === user.userId || 
      (serviceRequest.repairerId && serviceRequest.repairerId._id.toString() === user.userId);
    
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(serviceRequest);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT: Update a service request
 */
async function updateServiceRequest(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const serviceRequestId = params.id;
    
    // Find service request
    const serviceRequest = await ServiceRequest.findById(serviceRequestId);
    
    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }
    
    // Check permissions based on user role and request status
    let hasPermission = false;
    
    if (user.role === 'admin') {
      // Admins can update any service request
      hasPermission = true;
    } else if (serviceRequest.ownerId.toString() === user.userId) {
      // Owners can update their requests if not already accepted
      hasPermission = ['pending', 'cancelled'].includes(serviceRequest.status);
    } else if (user.role === 'repairer') {
      // Repairers can update requests assigned to them or accept pending requests
      const body = await req.json();
      const isAccepting = body.status === 'accepted' && serviceRequest.status === 'pending';
      
      hasPermission = 
        (serviceRequest.repairerId?.toString() === user.userId) || 
        (isAccepting && !serviceRequest.repairerId);
      
      // If a repairer is accepting a new request, assign it to them
      if (isAccepting && !serviceRequest.repairerId) {
        body.repairerId = user.userId;
      }
    }
    
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have permission to update this service request' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, updateServiceRequestSchema);
    
    // Format coordinates for MongoDB if they exist
    if (validatedData.location?.coordinates) {
      validatedData.location.coordinates = {
        type: 'Point',
        coordinates: [
          validatedData.location.coordinates.longitude,
          validatedData.location.coordinates.latitude
        ]
      };
    }
    
    // Handle service completion
    if (validatedData.status === 'completed' && serviceRequest.status !== 'completed') {
      // Service has just been marked as completed
      
      // Validate completion data
      if (!validatedData.finalCost) {
        return NextResponse.json(
          { error: 'Final cost is required when completing a service' },
          { status: 400 }
        );
      }
      
      validatedData.actualCompletionDate = new Date();
    }
    
    // Update the service request
    const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(
      serviceRequestId,
      { $set: validatedData },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedServiceRequest);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST: Complete a service request and create maintenance record
 */
async function completeServiceRequest(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const serviceRequestId = params.id;
    
    // Find service request
    const serviceRequest = await ServiceRequest.findById(serviceRequestId);
    
    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }
    
    // Check if request can be completed
    if (serviceRequest.status === 'completed') {
      return NextResponse.json(
        { error: 'Service request is already completed' },
        { status: 400 }
      );
    }
    
    if (serviceRequest.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Cannot complete a cancelled service request' },
        { status: 400 }
      );
    }
    
    // Check permissions
    if (user.role !== 'repairer' || 
        serviceRequest.repairerId?.toString() !== user.userId) {
      return NextResponse.json(
        { error: 'Only the assigned repairer can complete this service request' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, completeServiceRequestSchema);
    
    // Create maintenance record
    const maintenanceRecord = await MaintenanceRecord.create({
      vehicleId: serviceRequest.vehicleId,
      serviceDate: validatedData.serviceDate,
      serviceType: serviceRequest.serviceType,
      description: serviceRequest.description,
      mileage: validatedData.mileage,
      cost: validatedData.finalCost,
      serviceProvider: serviceRequest.repairerId,
      serviceRequestId: serviceRequest._id,
      receipts: validatedData.receipts || [],
      notes: validatedData.notes,
    });
    
    // Update service request
    const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(
      serviceRequestId,
      { 
        status: 'completed',
        finalCost: validatedData.finalCost,
        actualCompletionDate: new Date(),
        maintenanceRecordId: maintenanceRecord._id
      },
      { new: true }
    );
    
    // Update vehicle maintenance history
    await Vehicle.findByIdAndUpdate(
      serviceRequest.vehicleId,
      { $addToSet: { maintenanceHistory: maintenanceRecord._id } }
    );
    
    return NextResponse.json({
      serviceRequest: updatedServiceRequest,
      maintenanceRecord
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE: Cancel a service request
 */
async function cancelServiceRequest(req: NextRequest, user: any, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const serviceRequestId = params.id;
    
    // Find service request
    const serviceRequest = await ServiceRequest.findById(serviceRequestId);
    
    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      );
    }
    
    // Check if request can be cancelled
    if (serviceRequest.status === 'completed') {
      return NextResponse.json(
        { error: 'Cannot cancel a completed service request' },
        { status: 400 }
      );
    }
    
    if (serviceRequest.status === 'cancelled') {
      return NextResponse.json(
        { error: 'Service request is already cancelled' },
        { status: 400 }
      );
    }
    
    // Check permissions
    const hasPermission = 
      user.role === 'admin' || 
      serviceRequest.ownerId.toString() === user.userId || 
      (serviceRequest.repairerId?.toString() === user.userId && user.role === 'repairer');
    
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have permission to cancel this service request' },
        { status: 403 }
      );
    }
    
    // Cancel the service request
    const updatedServiceRequest = await ServiceRequest.findByIdAndUpdate(
      serviceRequestId,
      { status: 'cancelled' },
      { new: true }
    );
    
    return NextResponse.json({
      message: 'Service request cancelled successfully',
      serviceRequest: updatedServiceRequest
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export const GET = withAuth(getServiceRequest, { requiresAuth: true });
export const PUT = withAuth(updateServiceRequest, { requiresAuth: true });
export const POST = withAuth(completeServiceRequest, { 
  requiresAuth: true,
  allowedRoles: ['repairer'] 
});
export const DELETE = withAuth(cancelServiceRequest, { requiresAuth: true });
