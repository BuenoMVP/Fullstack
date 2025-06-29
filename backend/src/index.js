import { server } from './config/server.js';

import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/connectDB.js';
connectDB();

const PORT = process.env.VITE_BACKEND_PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})