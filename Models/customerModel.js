const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getCustomerById(user_id) {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        user_id,
      },
    });
    return customer;
  } catch (error) {
    return error;
  }
}

async function createCarData({
  customer_id,
  car_name,
  car_model,
  car_price,
  car_type,
  car_year,
}) {
  try {
    const carData = await prisma.car.create({
      data: {
        customer_id,
        car_name,
        car_model,
        car_price,
        car_year,
        car_type,
      },
    });
    return carData;
  } catch (error) {
    return error;
  }
}

async function fetchCarList(user_id) {
  try {
    const carList = await prisma.car.findMany({
      where: { customer_id: user_id },
    });

    return carList;
  } catch (error) {
    return error;
  }
}
module.exports = {
  getCustomerById,
  createCarData,
  fetchCarList,
};
