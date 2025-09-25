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
      const fieldErrors = error.issues.map((err) => ({
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
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);
  
  // Type guards for different error types
  const isValidationError = (err: unknown): err is { 
    status: number; 
    message: string; 
    errors: Array<{ path: string; message: string }> 
  } => {
    return typeof err === 'object' && 
           err !== null && 
           'status' in err && 
           'errors' in err &&
           (err as Record<string, unknown>).status === 400;
  };
  
  const isStatusError = (err: unknown): err is {
    status: number;
    message?: string;
  } => {
    return typeof err === 'object' && 
           err !== null && 
           'status' in err;
  };
  
  const isMongooseValidationError = (err: unknown): err is {
    name: string;
    errors: Record<string, { message: string }>;
  } => {
    return typeof err === 'object' && 
           err !== null && 
           'name' in err && 
           (err as Record<string, unknown>).name === 'ValidationError' &&
           'errors' in err;
  };
  
  const isMongooseDuplicateKeyError = (err: unknown): err is {
    code: number;
    keyPattern: Record<string, unknown>;
    keyValue: Record<string, unknown>;
  } => {
    return typeof err === 'object' && 
           err !== null && 
           'code' in err && 
           (err as Record<string, unknown>).code === 11000;
  };
  
  // Validation errors
  if (isValidationError(error)) {
    return NextResponse.json(
      { error: error.message, errors: error.errors },
      { status: 400 }
    );
  }
  
  // Custom status code errors
  if (isStatusError(error)) {
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: error.status }
    );
  }
  
  // Mongoose validation errors
  if (isMongooseValidationError(error)) {
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
  if (isMongooseDuplicateKeyError(error)) {
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
