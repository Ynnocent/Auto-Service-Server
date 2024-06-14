const express = require("express");
const router = express.Router();

const userController = require("../controllers/authController");

router.get("/", userController.getUsers);
router.post("/del", userController.deleteUserTable);
router.post("/login", userController.logInUser);
router.post("/logout", userController.logOutUser);

module.exports = router;
