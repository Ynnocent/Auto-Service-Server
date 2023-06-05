const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashPassword = (password) => {
  const hashedPassword= bcrypt.hashSync(password, 10)
  
  return hashedPassword;
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

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.DEV_SECRET_KEY);
};

exports.getUserId = (token) => {
  return jwt.decode(token).id;
};

exports.getUserFname = (token) => {
  return jwt.decode(token).user_fname;
};

exports.getUserLname = (token) => {
    return jwt.decode(token).user_lname;
};

exports.getUserType = (token) => {
  return jwt.decode(token).user_type;
};
