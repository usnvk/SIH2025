const express = require('express');
const router = express.Router();
const authController = require('../controllers/users/auth.controllers'); // Assuming corrected path

// This line defines the ENDPOINT path as '/register'
// It should NOT contain the word 'user'.
router.post('/register', authController.registerUser); 
router.post('/login', authController.loginuser);
router.get('/logout', authController.logoutuser);

module.exports = router;
