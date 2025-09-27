const express = require('express');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');


// C:\Users\HP\OneDrive\Desktop\zomatoo\backend\src\middleware\foodmiddleware.js

// ... (existing code for imports)

async function authmiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "please login first"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JSONTOKEN);
        const user = await userModel.findById(decoded.id);

        // --- ADD THIS CHECK ---
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        // --- END ADDITION ---

        req.user = user; // Ensure you are attaching to the 'req' object
        next();
    } catch (err) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }
}

module.exports = {
    authmiddleware
};