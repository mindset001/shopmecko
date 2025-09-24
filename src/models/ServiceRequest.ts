import mongoose, { Document, Schema, model, Model } from 'mongoose';

// Interface for ServiceRequest document
export interface IServiceRequest extends Document {
  vehicleId: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  repairerId?: mongoose.Types.ObjectId;
  serviceType: string;
  description: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  appointmentDate?: Date;
  estimatedCompletionDate?: Date;
  actualCompletionDate?: Date;
  location: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    coordinates?: {
      type: string;
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  estimatedCost?: number;
  finalCost?: number;
  images?: string[];
  maintenanceRecordId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for ServiceRequest
const serviceRequestSchema = new Schema<IServiceRequest>(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle reference is required'],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner reference is required'],
    },
    repairerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
      required: true,
    },
    appointmentDate: {
      type: Date,
    },
    estimatedCompletionDate: {
      type: Date,
    },
    actualCompletionDate: {
      type: Date,
    },
    location: {
      address: {
        type: String,
        required: [true, 'Address is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      state: {
        type: String,
        required: [true, 'State is required'],
      },
      postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
      },
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          default: [0, 0],
        },
      },
    },
    estimatedCost: {
      type: Number,
      min: [0, 'Estimated cost cannot be negative'],
    },
    finalCost: {
      type: Number,
      min: [0, 'Final cost cannot be negative'],
    },
    images: [{
      type: String,
    }],
    maintenanceRecordId: {
      type: Schema.Types.ObjectId,
      ref: 'MaintenanceRecord',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create indexes
serviceRequestSchema.index({ ownerId: 1 });
serviceRequestSchema.index({ repairerId: 1 });
serviceRequestSchema.index({ vehicleId: 1 });
serviceRequestSchema.index({ status: 1 });
serviceRequestSchema.index({ "location.coordinates": "2dsphere" });

// Create the ServiceRequest model
export const ServiceRequest: Model<IServiceRequest> = 
  mongoose.models.ServiceRequest || model<IServiceRequest>('ServiceRequest', serviceRequestSchema);

export default ServiceRequest;
