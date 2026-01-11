/*
const express = require("express");

const { addExpense, getExpense} = require("../controller/expenseController");
const router = express.Router();

router.post("/addExpense", addExpense);
router.get("/getExpense", getExpense);

module.exports = router;
*/

const express = require("express");
const { addExpense, getExpense } = require("../controller/expenseController");
const verifyToken = require("../middleware/authMIddleware");

const router = express.Router();

router.post("/addExpense", verifyToken, addExpense);
router.get("/getExpense", verifyToken, getExpense);

module.exports = router;
