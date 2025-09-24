import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Validates request data against a Zod schema
 * @param data The data to validate
 * @param schema The Zod schema to validate against
 * @returns The validated data or throws an error
 */
export function validateData<T>(data: unknown, schema: z.ZodSchema<T>): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      
      throw {
        status: 400,
        message: 'Validation failed',
        errors: fieldErrors,
      };
    }
    
    throw error;
  }
}

/**
 * Handles API errors and returns appropriate responses
 * @param error The error to handle
 * @returns NextResponse with error details
 */
export function handleApiError(error: any): NextResponse {
  console.error('API Error:', error);
  
  // Validation errors
  if (error.status === 400 && error.errors) {
    return NextResponse.json(
      { error: error.message, errors: error.errors },
      { status: 400 }
    );
  }
  
  // Custom status code errors
  if (error.status) {
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: error.status }
    );
  }
  
  // Mongoose validation errors
  if (error.name === 'ValidationError') {
    const errors = Object.keys(error.errors).map((key) => ({
      path: key,
      message: error.errors[key].message,
    }));
    
    return NextResponse.json(
      { error: 'Validation failed', errors },
      { status: 400 }
    );
  }
  
  // MongoDB duplicate key errors
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return NextResponse.json(
      { error: `${field} already exists` },
      { status: 409 }
    );
  }
  
  // Default to 500 internal server error
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
