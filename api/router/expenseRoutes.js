const express = require("express");

const { addExpense, getExpense} = require("../controller/expenseController");
const router = express.Router();

router.post("/addExpense", addExpense);
router.get("/getExpense", getExpense);

module.exports = router;