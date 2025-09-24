import mongoose, { Document, Schema, model, Model } from 'mongoose';
import { MaintenanceRecord } from '@/types/models';

// Interface for Vehicle document
export interface IVehicle extends Document {
  ownerId: mongoose.Types.ObjectId;
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin?: string;
  color?: string;
  fuelType?: string;
  engineSize?: string;
  transmissionType?: string;
  images?: string[];
  maintenanceHistory: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Vehicle
const vehicleSchema = new Schema<IVehicle>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Vehicle must have an owner'],
    },
    make: {
      type: String,
      required: [true, 'Make is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1900, 'Year must be 1900 or later'],
      max: [new Date().getFullYear() + 1, 'Year cannot be in the future'],
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      trim: true,
      unique: true,
    },
    vin: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
    fuelType: {
      type: String,
      trim: true,
    },
    engineSize: {
      type: String,
      trim: true,
    },
    transmissionType: {
      type: String,
      trim: true,
    },
    images: [{
      type: String,
    }],
    maintenanceHistory: [{
      type: Schema.Types.ObjectId,
      ref: 'MaintenanceRecord',
    }],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create indexes
vehicleSchema.index({ ownerId: 1 });
vehicleSchema.index({ make: 1, model: 1, year: 1 });
vehicleSchema.index({ registrationNumber: 1 }, { unique: true });

// Create the Vehicle model
export const Vehicle: Model<IVehicle> = mongoose.models.Vehicle || model<IVehicle>('Vehicle', vehicleSchema);

export default Vehicle;
