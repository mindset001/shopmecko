import mongoose, { Document, Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '@/types/models';

// Interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: UserRole;
  avatar?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schema for User
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false, // Don't include password in query results by default
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['VEHICLE_OWNER', 'REPAIRER', 'SELLER', 'ADMIN'],
      default: 'VEHICLE_OWNER',
    },
    avatar: {
      type: String,
    },
    location: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: unknown) {
    next(error instanceof Error ? error : new Error('Unknown error during password hashing'));
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error: unknown) {
    throw new Error('Error comparing passwords');
  }
};

// Create the User model
export const User: Model<IUser> = mongoose.models.User || model<IUser>('User', userSchema);

export default User;
