const express = require("express");
const connectDB = require("./utils/database");
const authRoutes = require("./api/router/authRoutes");
const expenseRoutes = require("./api/router/expenseRoutes");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();

const app = express();


/*
app.use(
  cors({
    origin: "https://expensesplitterrs.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); */

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Expense Tracker API");
});

connectDB();
module.exports = app;
module.exports.handler = serverless(app);

   /*app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
