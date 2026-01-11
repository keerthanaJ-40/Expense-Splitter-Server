const mongoose = require("mongoose");

let isConnected = false; // cache connection

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error; // throw instead of exit
  }
};

module.exports = connectDB; 


/*const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB; */

