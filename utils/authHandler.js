const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);

  return hashedPassword;
};

exports.unhashPassword = (password, hashedPassword) => {
  const unhashedPassword = bcrypt.compareSync(password, hashedPassword);

  return unhashedPassword;
};

exports.sendToken = ({ id, user_fname, user_lname, user_email, user_type }) => {
  return jwt.sign(
    {
      id,
      user_fname,
      user_lname,
      user_email,
      user_type,
    },
    process.env.DEV_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

//------------------------------------------------------//

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.userDetails;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.DEV_SECRET_KEY);

    req.user = decoded; // Used in the next middleware

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

exports.verifyCustomerUserType = (req, res, next) => {
  const user_type = req.user.user_type;
  const user_id = req.user.id;
  if (!user_type) {
    return res.status(401).json({
      message: "No type provided",
    });
  }

  try {
    if (user_type === "CUSTOMER") {
      req.user_id = user_id;
      req.user_type = user_type; // Used in the next middleware
      next();
    } else {
      return res.status(401).json({
        message: "Invalid user type",
      });
    }
  } catch (error) {
    res.status(401).json({
      error: "Error fetching token",
    });
  }
};

exports.verifyEmployeeUserType = (req, res, next) => {
  const user_type = req.user.user_type;

  if (!user_type) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    if (user_type === "EMPLOYEE") {
      req.user_id = user_type; // Used in the next middleware
      next();
    } else {
      return res.status(401).json({
        message: "Invalid user type",
      });
    }
  } catch (error) {
    res.status(401).json({
      error: "Error fetching token",
    });
  }
};

exports.getUserId = (req, res, next) => {
  const user_id = req.user.id;
  if (!user_id) {
    return res.status(401).json({
      message: "Invalid user id",
    });
  }
  try {
    req.user_id = user_id; // Used in the next middleware
    next();
  } catch (error) {
    res.status(401).json({
      error: "Error fetching token",
    });
  }
};

exports.getUserFname = (req, res, next) => {
  const user_fname = req.user.user_fname;
  if (!user_fname) {
    return res.status(401).json({
      message: "Invalid user firstname",
    });
  }
  try {
    req.user_fname = user_fname; // Used in the next middleware

    next();
  } catch (error) {
    res.status(401).json({
      error: "Error fetching token",
    });
  }
};

exports.getUserLname = (req, res, next) => {
  const user_lname = req.user.user_lname;
  if (!user_lname) {
    return res.status(401).json({
      message: "Invalid user lastname",
    });
  }

  try {
    req.user_lname = user_lname;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Error fetching token",
    });
  }
};
