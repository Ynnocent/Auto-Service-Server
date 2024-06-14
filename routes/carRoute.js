const carController = require("../controllers/carController")
const express = require("express");
const router = express.Router();

router.get("/cartypes", carController.getCarTypes);

module.exports = router;