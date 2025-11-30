// Test script to verify user signup is working
require("dotenv").config();
const mongoose = require("mongoose");
const { UserModel } = require("./model/UserModel");

const uri = process.env.MONGO_URL || "mongodb://localhost:27017/tradex";

async function testSignup() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✓ Connected to MongoDB");
    console.log(`✓ Database: ${mongoose.connection.db.databaseName}`);
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`✓ Collections: ${collections.map(c => c.name).join(', ')}`);
    
    // Count existing users
    const userCount = await UserModel.countDocuments();
    console.log(`✓ Current users in database: ${userCount}`);
    
    // Try to create a test user
    console.log("\nAttempting to create test user...");
    const testUser = new UserModel({
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@test.com`,
      password: "testpassword123"
    });
    
    console.log("Saving user...");
    const savedUser = await testUser.save();
    console.log("✓ User saved successfully!");
    console.log("User details:", {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      passwordLength: savedUser.password.length,
      createdAt: savedUser.createdAt
    });
    
    // Verify user exists in database
    const foundUser = await UserModel.findById(savedUser._id);
    if (foundUser) {
      console.log("✓ User found in database!");
    } else {
      console.error("✗ User NOT found in database!");
    }
    
    // Count users again
    const newUserCount = await UserModel.countDocuments();
    console.log(`✓ Total users after test: ${newUserCount}`);
    
    // Clean up test user
    await UserModel.findByIdAndDelete(savedUser._id);
    console.log("✓ Test user deleted");
    
    process.exit(0);
  } catch (error) {
    console.error("✗ Error:", error.message);
    console.error("Error details:", error);
    if (error.code === 11000) {
      console.error("Duplicate key error - user might already exist");
    }
    process.exit(1);
  }
}

testSignup();

