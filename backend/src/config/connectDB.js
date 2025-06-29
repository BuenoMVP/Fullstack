import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const db_key = process.env.VITE_DB_KEY || new Error('MONGODB_URI is not defined in .env file');
const uri = `mongodb+srv://marcos_vbp:${db_key}@cluster0.tr0f0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(uri, {
            maxPoolSize: 10,
            minPoolSize: 2,
            maxIdleTimeMS: 30000,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        })
        console.log('MongoDB Connected')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw error
    }
}

export { connectDB };
