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

// Test route
app.get("/", (req, res) => {
  res.send("Expense Tracker API running");
});

// DB connect
connectDB();

// ✅ Allowed origins
const allowedOrigins = [
  "https://expensesplitterrs.netlify.app",
  "http://localhost:3000",
];

// ✅ micro-cors (Vercel-friendly)
const corsHandler = cors({
  origin: allowedOrigins,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowCredentials: true,
});

// ✅ ONLY export handler
module.exports.handler = corsHandler(serverless(app));
