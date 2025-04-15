const express = require("express");
const { signup, login } = require("../controller/Auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
