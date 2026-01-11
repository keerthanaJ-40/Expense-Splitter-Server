const express = require("express");
const connectDB = require("./utils/database");
const authRoutes = require("./api/router/authRoutes");
const expenseRoutes = require("./api/router/expenseRoutes");
const cors = require("micro-cors");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "https://expensesplitterrs.netlify.app", // Netlify production
  "http://localhost:3000",                // React dev
];


 const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

app.use(corsMiddleware);

//app.options(/.*/,cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API");
});

connectDB();

module.exports.handler = serverless(app);

   /*app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
