const authHandler = require("../utils/authHandler");
const userModel = require("../Models/userModel.js");

exports.createEmployeeUser = async (req, res, next) => {
  try {
    const {
      user_fname,
      user_lname,
      user_password,
      user_email,
      businessVerification, // Make sure to have some sort of authentication for this.
    } = req.body;

    const hashedPassword = authHandler.hashPassword(user_password);

    const newEmployee = {
      user_fname,
      user_lname,
      user_password: hashedPassword,
      user_email,
      user_type: "EMPLOYEE", // The default is CUSTOMER
    };
    const createdUser = await userModel.createUser(newEmployee);
    if (createdUser.length == 0) {
      return res.status(400).json({
        message: "Error creating user",
      });
    }
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(501).json({
      error: "Error creating employee user",
    });
  }
};

exports.logInEmployee = async (req, res, next) => {
  try {
    const { user_password } = req.body;

    const userData = await userModel.getUserByEmail(req.body.user_email);

    const { id, user_fname, user_lname, user_email, user_type, employee_type } = userData;

    const unhashedPassword = authHandler.unhashPassword(
      user_password,
      userData.user_password
    );

    if (!unhashedPassword && !userFoundEmail) {
      res.status(501).json({
        error: "Invalid password and email",
      });
    } else if (!userFoundEmail) {
      res.status(501).json({
        error: "Invalid email",
      });
    } else if (!unhashedPassword) {
      res.status(501).json({
        error: "Invalid password",
      });
    }

    const userPayload = {
      id,
      user_fname,
      user_lname,
      user_email,
      user_type,
      employee_type
    };

    const loggedInUser = authHandler.sendToken(userPayload);
    res.cookie("userDetails", loggedInUser, {
      httpOnly: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error logging in user",
    });
  }
};