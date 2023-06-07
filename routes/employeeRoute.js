const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authHandler = require("../utils/authHandler");
const authController = require("../controllers/authController");

router.post("/signup", employeeController.createEmployeeUser);
router.post("/login", employeeController.logInEmployee);
router.post("/logout", authController.logOutUser);

module.exports = router;
