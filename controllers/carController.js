const carController = require("../Models/carModel");

exports.getCarTypes = async (req, res, next) => {
  try {
    const carTypes = carController.getCarTypes();
    res.status(200).json({
      carTypes,
    });
    
    return carTypes;
  } catch (error) {
    res.status(500).json({
      message: "Error getting car types",
    });
  }
};
