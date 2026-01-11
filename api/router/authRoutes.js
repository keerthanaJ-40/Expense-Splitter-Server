const express = require("express");

const {signup, login} = require("../controller/authController");
const router = express.Router();

router.post("/signin", signup);
router.post("/login", login);

module.exports = router;
