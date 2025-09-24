/**
 * Database connection configuration for ShopMeco
 * This module provides the MongoDB connection using Mongoose
 */
import mongoose from 'mongoose';

// Connection URL - would normally come from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopmeco';

// Mongoose options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

/**
 * Connect to MongoDB
 */
export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 0) { // Not connected
      await mongoose.connect(MONGODB_URI);
      console.log('✅ Connected to MongoDB successfully');
    }
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit with failure
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
}

// Export the database connection
export const db = mongoose.connection;

// Handle database connection events
db.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('✅ MongoDB connected successfully');
});

export default mongoose;
