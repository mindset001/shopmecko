import mongoose, { Document, Schema, model, Model } from 'mongoose';

// Interface for Order document
export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  products: {
    productId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDetails?: {
    transactionId?: string;
    paymentDate?: Date;
  };
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  shippingMethod?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for Order
const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer reference is required'],
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller reference is required'],
    },
    products: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
      },
      subtotal: {
        type: Number,
        required: true,
      },
    }],
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: [true, 'Full name is required for shipping'],
      },
      street: {
        type: String,
        required: [true, 'Street address is required'],
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
      country: {
        type: String,
        required: [true, 'Country is required'],
      },
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentDetails: {
      transactionId: String,
      paymentDate: Date,
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
    trackingNumber: String,
    shippingMethod: String,
    estimatedDelivery: Date,
    actualDelivery: Date,
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Create indexes
orderSchema.index({ customerId: 1 });
orderSchema.index({ sellerId: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: 1 });

// Create the Order model
export const Order: Model<IOrder> = mongoose.models.Order || model<IOrder>('Order', orderSchema);

export default Order;
