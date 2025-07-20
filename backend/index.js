import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { corsOptions } from './config/corsOptions.js';
import Connection from './database/db_connect.js';

import authRoute from './Routes/authRoute.js';
import userRoute from './Routes/userRoute.js';
import planRoute from './Routes/planRoute.js';
import menuRoute from './Routes/menuRoute.js';
import inventoryRoute from './Routes/inventoryRoute.js';
import userplanRoute from './Routes/userPlanRoute.js';

dotenv.config();

const app = express();


app.use(cors(corsOptions));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.json({ 
        success: true, 
        message: '🎉 Fresh Mess Management Backend is running!',
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    });
});

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 Welcome to Fresh Mess Management API!',
        version: '2.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/health',
            auth: '/auth',
            users: '/users',
            plans: '/plan/plans',
            menus: '/menu',
            inventory: '/inventory',
            userPlans: '/userplan'
        },
        documentation: 'All endpoints support RESTful operations (GET, POST, PATCH, DELETE)'
    });
});

app.use('/auth', authRoute);           
app.use('/users', userRoute);          
app.use('/plan', planRoute);            
app.use('/menu', menuRoute);            
app.use('/inventory', inventoryRoute); 
app.use('/userplan', userplanRoute);    


app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        availableEndpoints: {
            health: '/health',
            auth: '/auth',
            users: '/users',
            plans: '/plan/plans',
            menus: '/menu',
            inventory: '/inventory',
            userPlans: '/userplan'
        }
    });
});

app.use((err, req, res, next) => {
    console.error('Global Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
        timestamp: new Date().toISOString()
    });
});


Connection();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('🎉🎉🎉 FRESH MESS MANAGEMENT BACKEND STARTED! 🎉🎉🎉');
    console.log(`🌟 Server running on port ${PORT}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/health`);
    console.log('✨ All services are consolidated and ready!');
    console.log('🎯 Endpoints:');
    console.log('   � Auth: /auth');
    console.log('   �📝 Users: /users');
    console.log('   📋 Plans: /plan/plans');
    console.log('   🍽️  Menus: /menu');
    console.log('   📦 Inventory: /inventory');
    console.log('   👥 User Plans: /userplan');
    console.log('🚀 Ready to serve the frontend at http://localhost:3000');
});


process.on('unhandledRejection', (err) => {
    console.error('🚨 UNHANDLED REJECTION!');
    console.error(err.name, err.message);
    process.exit(1);
});


process.on('uncaughtException', (err) => {
    console.error('🚨 UNCAUGHT EXCEPTION!');
    console.error(err.name, err.message);
    process.exit(1);
});

export default app;
