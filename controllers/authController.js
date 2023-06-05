const authHandler = require("../utils/authHandler");
const userModel = require("../Models/userModel.js");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    if (users.length == 0) {
      return res.status(200).json({
        message: "No users found",
      });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching all user data",
    });
  }
};

exports.createEmployeeUser = async (req, res, next) => {
  const { user_fname, user_lname, user_password, user_email, user_type } =
    req.body;

  const hashedPassword = authHandler.hashPassword(user_password);

  const employeeUser = {
    user_fname,
    user_lname,
    user_password: hashedPassword,
    user_email,
    user_type: "EMPLOYEE", // The default is CUSTOMER
  };

  try {
  } catch (error) {
    res.status(501).json({
      error: "Error creating employee user",
    });
  }
};

exports.createCustomerUser = async (req, res, next) => {
  try {
    const { user_fname, user_lname, user_password, user_email, user_type } =
      req.body;

    const hashedPassword = authHandler.hashPassword(user_password);

    const newCustomer = {
      user_fname,
      user_lname,
      user_password: hashedPassword,
      user_email,
      user_type: "CUSTOMER",
    };

    const createdUser = await userModel.createUser(newCustomer);
    if (createdUser) {
      console.log(createdUser);
    }
    if (createdUser.length == 0) {
      return res.status(400).json({
        message: "Error creating user",
      });
    }
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      error: "Error creating new user",
    });
  }
};

exports.deleteUserTable = async (req, res, next) => {
  try {
    await userModel.clearUserDatabase();
    res.status(200).json({
      message: "User table cleared",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error clearing user table",
    });
  }
};
