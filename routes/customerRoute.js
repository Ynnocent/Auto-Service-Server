const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authController = require("../controllers/authController");
const authHandler = require("../utils/authHandler");

router.post("/createaccount", customerController.createCustomerUser);
router.post(
  "/carupload",
  authHandler.verifyToken,
  authHandler.verifyCustomerUserType,
  customerController.uploadCarData
);
router.post("/login", authController.logInUser);
router.post("/logout", authHandler.verifyToken, authController.logOutUser);

module.exports = router;
