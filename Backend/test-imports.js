// Test script to verify all imports are working correctly
console.log("Testing module imports...\n");

try {
    // Test 1: Load environment variables
    require('dotenv').config();
    console.log("✓ dotenv loaded successfully");
    
    // Test 2: Check environment variables
    if (process.env.MONGO_URI) {
        console.log("✓ MONGO_URI found in environment");
    } else {
        console.log("✗ MONGO_URI not found in environment");
    }
    
    if (process.env.GEMINI_API_KEY) {
        console.log("✓ GEMINI_API_KEY found in environment");
    } else {
        console.log("✗ GEMINI_API_KEY not found in environment");
    }
    
    // Test 3: Test Food model import
    const Food = require('./src/models/food');
    console.log("✓ Food model loaded successfully");
    
    // Test 4: Test diet controller import
    const dietController = require('./src/controllers/dietchart/dietcontroller');
    console.log("✓ Diet controller loaded successfully");
    
    // Test 5: Test Main routes import
    const mainRoutes = require('./src/routes/Main.routes');
    console.log("✓ Main routes loaded successfully");
    
    // Test 6: Test app import
    const app = require('./src/app');
    console.log("✓ App module loaded successfully");
    
    // Test 7: Test database connection module
    const connectdb = require('./src/db/db');
    console.log("✓ Database connection module loaded successfully");
    
    console.log("\n✅ All imports are working correctly!");
    console.log("The server should be able to start without module errors.");
    
} catch (error) {
    console.error("\n❌ Error found:");
    console.error(error.message);
    console.error("\nStack trace:");
    console.error(error.stack);
}
