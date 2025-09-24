import mongoose, { Document, Schema, model, Model } from 'mongoose';

// Interface for RepairService document
export interface IRepairService extends Document {
  repairerId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  basePrice: number;
  estimatedTime: string;
  images?: string[];
  isAvailable: boolean;
  ratings?: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Schema for RepairService
const repairServiceSchema = new Schema<IRepairService>(
  {
    repairerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Repairer reference is required'],
    },
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: [0, 'Base price cannot be negative'],
    },
    estimatedTime: {
      type: String,
      required: [true, 'Estimated time is required'],
    },
    images: [{
      type: String,
    }],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create indexes
repairServiceSchema.index({ repairerId: 1 });
repairServiceSchema.index({ category: 1 });
repairServiceSchema.index({ name: 'text', description: 'text', category: 'text', subcategory: 'text' });

// Create the RepairService model
export const RepairService: Model<IRepairService> = 
  mongoose.models.RepairService || model<IRepairService>('RepairService', repairServiceSchema);

export default RepairService;
