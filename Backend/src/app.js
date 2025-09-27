require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Import Routes
const mainRoutes = require('./routes/Main.routes');
const authRoutes = require('./routes/auth.routes');

// Middlewares
app.use(cors());
app.use(express.json());

// Simple request logger to see all incoming requests
app.use((req, res, next) => {
    console.log(`Request Received: ${req.method} ${req.originalUrl}`);
    next();
});

// Base Route
app.get('/', (req, res) => {
    res.send("hello world");
});

// API Routes
app.use('/api/generate', mainRoutes);
app.use('/api/auth', authRoutes);

// app.use('/api/food',foodroutes); // This route is commented out as it was in the original file

module.exports = app;
