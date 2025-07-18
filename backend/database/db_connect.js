import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
  try {
    const url = process.env.DATABASE || 'mongodb://localhost:27017/messmate';
    
    // Configure mongoose options
    mongoose.set('strictQuery', true);
    
    const connection = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });

    console.log(`🗄️  MongoDB Connected: ${connection.connection.host}`);
    console.log(`📊 Database: ${connection.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default Connection;
