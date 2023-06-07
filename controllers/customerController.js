const customerModel = require("../Models/customerModel");
const authHandler = require("../utils/authHandler");
const userModel = require("../Models/userModel.js");

exports.createCustomerUser = async (req, res, next) => {
  try {
    const { user_fname, user_lname, user_password, user_email } = req.body;

    const hashedPassword = authHandler.hashPassword(user_password);

    const newCustomer = {
      user_fname,
      user_lname,
      user_password: hashedPassword,
      user_email,
      user_type: "CUSTOMER",
    };

    const createdUser = await userModel.createUser(newCustomer);
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

exports.fetchCarList = async (req, res, next) => {
  try {
    const customer_id = req.user_id; // received from previous middleware
    const carList = await customerModel.fetchCarList(customer_id);

    if (!carList) {
      res.status(500).json({
        error: "Error fetching car list",
      });
    }

    res.status(200).json({
      message: "Fetch car list successful",
      carData: carList,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching car list",
    });
  }
};

exports.uploadCarData = async (req, res, next) => {
  const {
    car_name,
    car_type,
    car_color,
    car_model,
    car_year,
    car_price,
    car_damage_description,
  } = req.body;

  const user_id = req.user_id; // received from the verifyCustomer middleware

  try {
    const customer = await customerModel.getCustomerById(user_id);
    if (!customer) {
      res.send(500).json({
        message: "Customer not found",
      });
    }

    const newCar = {
      customer_id: req.user_id,
      car_name,
      car_type,
      car_color,
      car_model,
      car_year,
      car_price,
      car_damage_description,
    };

    const car_data = await customerModel.createCarData(newCar);

    if (!car_data) {
      res.send(500).json({
        error: "Error creating car",
      });
    }

    res.status(200).json({
      meesage: "Create car successful",
      carData: car_data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
