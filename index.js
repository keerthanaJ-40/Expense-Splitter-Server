

const express = require("express");
const connectDB = require("./utils/database");
const authRoutes = require("./api/router/authRoutes");
const expenseRoutes = require("./api/router/expenseRoutes");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

/* ✅ CORS with origin (THIS IS ENOUGH) */
app.use(
  cors({
    origin: "https://expensesplitterrs.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API");
});

module.exports = app;
module.exports.handler = serverless(app);
