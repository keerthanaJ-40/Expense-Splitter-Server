const express = require("express");
const connectDB = require("./utils/database");
const authRoutes = require("./api/router/authRoutes");
const expenseRoutes = require("./api/router/expenseRoutes");
const serverless = require("serverless-http");
const cors = require("micro-cors");
require("dotenv").config();

const app = express();

// JSON parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

// Health check
app.get("/", (req, res) => res.send("Welcome to Expense Tracker API"));

// Connect DB
connectDB().catch(err => {
  console.error("MongoDB connection error:", err);
  // don’t throw, just log to prevent immediate crash
});

// Allowed origins
const allowedOrigins = [
  "https://expensesplitterrs.netlify.app",
  "http://localhost:3000"
];

// Wrap handler with micro-cors
const corsHandler = cors({
  origin: allowedOrigins,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowCredentials: true
});

module.exports.handler = corsHandler(serverless(app));
