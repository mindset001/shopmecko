import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';
import { withAuth, JwtPayload } from '@/lib/auth';
import { validateData, handleApiError } from '@/lib/api-utils';
import { Product } from '@/models';

// Validation schema for updating products
const updateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  price: z.number().min(0, 'Price cannot be negative').optional(),
  discountPrice: z.number().min(0, 'Discount price cannot be negative').optional(),
  category: z.string().min(1, 'Category is required').optional(),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  compatibility: z.object({
    make: z.array(z.string()).optional(),
    model: z.array(z.string()).optional(),
    year: z.array(z.number()).optional(),
  }).optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative').optional(),
  images: z.array(z.string()).min(1, 'At least one product image is required').optional(),
  specifications: z.record(z.string(), z.string()).optional(),
  isAvailable: z.boolean().optional(),
});

/**
 * GET: Get a specific product
 */
async function getProduct(
  req: NextRequest, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const productId = params.id;
    
    const product = await Product.findById(productId)
      .populate('sellerId', 'fullName businessInfo ratings');
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * PUT: Update a specific product
 * Only the seller or admin can update the product
 */
async function updateProduct(
  req: NextRequest, 
  user: any, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const productId = params.id;
    
    // Find the product
    const product = await Product.findById(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if user has permission to update
    const hasPermission = 
      user.role === 'admin' || 
      (product.sellerId.toString() === user.userId && user.role === 'seller');
    
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have permission to update this product' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validatedData = validateData(body, updateProductSchema);
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: validatedData },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * DELETE: Delete a specific product
 * Only the seller or admin can delete the product
 */
async function deleteProduct(
  req: NextRequest, 
  user: any, 
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const params = await context.params;
    const productId = params.id;
    
    // Find the product
    const product = await Product.findById(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if user has permission to delete
    const hasPermission = 
      user.role === 'admin' || 
      (product.sellerId.toString() === user.userId && user.role === 'seller');
    
    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this product' },
        { status: 403 }
      );
    }
    
    // Delete the product
    await Product.findByIdAndDelete(productId);
    
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Wrapper for updateProduct to make it compatible with withAuth
 */
function updateProductWrapper(
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
  return updateProduct(req, user, context);
}

/**
 * Wrapper for deleteProduct to make it compatible with withAuth
 */
function deleteProductWrapper(
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
  return deleteProduct(req, user, context);
}

export const GET = getProduct;
export const PUT = withAuth(updateProductWrapper, { requiresAuth: true });
export const DELETE = withAuth(deleteProductWrapper, { requiresAuth: true });
