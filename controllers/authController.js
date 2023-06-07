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

exports.logInUser = async (req, res, next) => {
  try {
    const { user_password } = req.body;

    const userData = await userModel.getUserByEmail(req.body.user_email);

    const { id, user_fname, user_lname, user_email, user_type } = userData;

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

exports.logOutUser = (req, res, next) => {
  res.clearCookie("userDetails");
  res.status(200).json({
    message: "User logged out",
  });
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
