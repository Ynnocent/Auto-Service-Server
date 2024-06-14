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
    // console.log(userData);
    if (!userData) {
      return res.status(401).json({
        error: "Invalid email",
      });
    }
    const { id, user_fname, user_lname, user_email, user_type } = userData;

    const unhashedPassword = authHandler.unhashPassword(
      user_password,
      userData.user_password
    );

    if (!unhashedPassword) {
      return res.status(401).json({
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
    // console.log(loggedInUser);
    res
      .cookie("userDetails", loggedInUser, {
        path: "/",
        httpOnly: true,
        // samesite: "Lax",
        // secure: true
      })
      .status(200)
      .json({
        message: "Successful Login",
      });
  } catch (error) {
    res.status(500).json({
      error: "Error logging in user",
    });
  }
};

exports.logOutUser = (req, res, next) => {
  try {
    res.clearCookie("userDetails").status(200).json({ message: "SIGNED OUT" });
  } catch (error) {
    res.status(500).json({
      error: "Error Signing Out",
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
