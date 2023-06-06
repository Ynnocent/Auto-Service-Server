const authHandler = require("../utils/authHandler");
const userModel = require("../Models/userModel.js");

exports.createEmployeeUser = async (req, res, next) => {
  const { user_fname, user_lname, user_password, user_email, user_type } =
    req.body;

  const hashedPassword = authHandler.hashPassword(user_password);

  try {
    const { user_fname, user_lname, user_password, user_email } = req.body;

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
