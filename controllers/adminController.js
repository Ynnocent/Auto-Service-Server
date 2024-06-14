const { clearUserDatabase } = require("../Models/userModel");
const { delCustomerTable } = require("../Models/customerModel");
const { delCarTable } = require("../Models/carModel");
const { deleteUserTable } = require("./authController");

exports.deleteUserTable = async (req, res, next) => {
  try {
    await clearUserDatabase();
    res.status(200).json({
      message: "User table cleared",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error clearing user table",
    });
  }
};

exports.deleteCustomerTable = async (req, res, next) => {
  try {
    await delCustomerTable();
    res.status(200).json({
      message: "Customer table cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error clearing customer table",
    });
  }
};

exports.deleteCarTable = async (req, res, next) => {
  try {
    await delCarTable();
  } catch (error) {
    res.status(500).json({
      message: "Error clearing car table",
    });
  }
};

exports.deleteAllTables = async (req, res, next) => {
  try {
    console.log("Succesfully Deleted All Tables");
    await delCarTable();
    
    await delCustomerTable();
    
    await deleteUserTable();
    
  } catch (error) {
    res.status(500).json({
      message: "Error clearing all tables",
    });
  }
};
