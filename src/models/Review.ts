import mongoose, { Document, Schema, model, Model } from 'mongoose';

// Interface for Review document
export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  targetType: 'product' | 'repairer' | 'seller' | 'service';
  targetId: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  helpful: {
    count: number;
    users: mongoose.Types.ObjectId[];
  };
  response?: {
    userId: mongoose.Types.ObjectId;
    comment: string;
    date: Date;
  };
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Review
const reviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    targetType: {
      type: String,
      enum: ['product', 'repairer', 'seller', 'service'],
      required: [true, 'Target type is required'],
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Target reference is required'],
      refPath: 'targetModel',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    title: {
      type: String,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
    },
    images: [{
      type: String,
    }],
    helpful: {
      count: {
        type: Number,
        default: 0,
      },
      users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],
    },
    response: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: String,
      date: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Virtual to determine the model to use for targetId
reviewSchema.virtual('targetModel').get(function() {
  switch (this.targetType) {
    case 'product':
      return 'Product';
    case 'repairer':
    case 'seller':
      return 'User';
    case 'service':
      return 'RepairService';
    default:
      return 'User';
  }
});

// Create indexes
reviewSchema.index({ userId: 1 });
reviewSchema.index({ targetId: 1, targetType: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: 1 });

// Create the Review model
export const Review: Model<IReview> = mongoose.models.Review || model<IReview>('Review', reviewSchema);

export default Review;
