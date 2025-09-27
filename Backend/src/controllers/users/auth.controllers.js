const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser'); // Although used in server.js, good to remember the dependency

// --- User Registration ---
async function registerUser(req, res) {
    try {
        // 3. Extract necessary user data.
        const { Name, email, password } = req.body;

        // 4. Input validation (optional, but good practice).
        if (!Name || !email || !password) {
            return res.status(400).json({ message: "All fields (Name, email, password) are required." });
        }

        // 5. Check if the user already exists.
        const isUserAlreadyExists = await User.findOne({ email: email });
        
        if (isUserAlreadyExists) {
            return res.status(409).json({ message: "User already exists with this email." });
        }

        // 6. Securely hash the password.
        const hashedPassword = await bcrypt.hash(password, 10);

        // 7. Create a new user in the database.
        const user = await User.create({
            Name,
            email,
            password: hashedPassword,
            patientProfile: req.body.patientProfile || null
        });

        // Use environment variable for JWT secret. Fallback used for dev.
        const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // 8. Create an authentication token.
        const token = jwt.sign({
            id: user._id,
        }, jwtSecret, { expiresIn: '1h' }); // Token expires after 1 hour

        // 9. Send the token as a secure cookie and user data in response
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        
        // Send success response with user data (excluding password)
        const userData = user.toObject();
        delete userData.password;
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                Name: user.Name,
            },
            token: token // Also send token in response for client-side storage if needed
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "An error occurred during registration." });
    }
}

// --- User Login ---
async function loginuser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Use environment variable for JWT secret.
        const jwtSecret = process.env.JWT_SECRET;
        
        // Generate new token upon successful login.
        const token = jwt.sign({
            id: user._id, 
        }, jwtSecret, { expiresIn: '1h' });

        // Send token as a secure cookie.
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000 
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                Name: user.Name,
            }
        });
    } catch (error) {
        console.error("Error in loginuser:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
}

// --- User Logout ---
async function logoutuser(req, res) {
    try {
        // Clear the token cookie from the client's browser.
        res.clearCookie("token");
        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("Error in logoutuser:", error);
        res.status(500).json({ message: "An error occurred during logout." });
    }
}

// Export the functions
module.exports ={
    registerUser,
    loginuser,
    logoutuser,
}
