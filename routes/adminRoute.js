const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/deltables", adminController.deleteAllTables);

module.exports = router;