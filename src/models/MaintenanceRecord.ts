import mongoose, { Document, Schema, model, Model } from 'mongoose';

// Interface for MaintenanceRecord document
export interface IMaintenanceRecord extends Document {
  vehicleId: mongoose.Types.ObjectId;
  serviceDate: Date;
  serviceType: string;
  description: string;
  mileage?: number;
  cost: number;
  serviceProvider: mongoose.Types.ObjectId | string;
  serviceRequestId?: mongoose.Types.ObjectId;
  receipts?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for MaintenanceRecord
const maintenanceRecordSchema = new Schema<IMaintenanceRecord>(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle reference is required'],
    },
    serviceDate: {
      type: Date,
      required: [true, 'Service date is required'],
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
    mileage: {
      type: Number,
      min: [0, 'Mileage cannot be negative'],
    },
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      min: [0, 'Cost cannot be negative'],
    },
    serviceProvider: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Service provider is required'],
    },
    serviceRequestId: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceRequest',
    },
    receipts: [{
      type: String,
    }],
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create indexes
maintenanceRecordSchema.index({ vehicleId: 1 });
maintenanceRecordSchema.index({ serviceDate: 1 });
maintenanceRecordSchema.index({ serviceProvider: 1 });

// Create the MaintenanceRecord model
export const MaintenanceRecord: Model<IMaintenanceRecord> = 
  mongoose.models.MaintenanceRecord || model<IMaintenanceRecord>('MaintenanceRecord', maintenanceRecordSchema);

export default MaintenanceRecord;
