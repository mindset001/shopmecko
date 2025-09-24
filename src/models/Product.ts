import mongoose, { Document, Schema, model, Model } from 'mongoose';

// Interface for Product document
export interface IProduct extends Document {
  sellerId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  subcategory?: string;
  brand?: string;
  compatibility?: {
    make: string[];
    model: string[];
    year: number[];
  };
  stock: number;
  images: string[];
  specifications?: {
    [key: string]: string;
  };
  ratings?: {
    average: number;
    count: number;
  };
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Product
const productSchema = new Schema<IProduct>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller reference is required'],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
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
    brand: {
      type: String,
      trim: true,
    },
    compatibility: {
      make: [{
        type: String,
      }],
      model: [{
        type: String,
      }],
      year: [{
        type: Number,
      }],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
    },
    images: [{
      type: String,
      required: [true, 'At least one product image is required'],
    }],
    specifications: {
      type: Map,
      of: String,
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
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create indexes
productSchema.index({ sellerId: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ "compatibility.make": 1, "compatibility.model": 1, "compatibility.year": 1 });
productSchema.index({ name: 'text', description: 'text', category: 'text', subcategory: 'text', brand: 'text' });

// Create the Product model
export const Product: Model<IProduct> = mongoose.models.Product || model<IProduct>('Product', productSchema);

export default Product;
