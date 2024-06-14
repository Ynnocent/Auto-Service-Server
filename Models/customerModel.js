const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCustomerByUserId(user_id) {
  try {
    const userDetails = await prisma.user.findFirst({
      where: user_id,
    });
    const newCustomer = await prisma.customer.create({
      data: {
        user_id: userDetails.id,
        user_type: userDetails.user_type,
      },
    });

    return newCustomer;
  } catch (error) {
    return error;
  }
}

async function getCustomerById(id) {
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        user_id: id,
      },
    });

    return customer;
  } catch (error) {
    return error;
  }
}

async function delCustomerTable() {
  try {
    await prisma.customer.deleteMany();
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
  car_damage_desc,
  car_color,
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
        car_damage_desc,
        car_color,
      },
    });

    return carData;
  } catch (error) {
    return error;
  }
}

async function fetchCarList(user_id) {
  try {
    const customer = await prisma.customer.findFirst({
      where: { user_id },
    });

    const carList = await prisma.car.findMany({
      where: {
        customer_id: customer.id,
      },
    });
    // console.log(carList);

    return carList;
  } catch (error) {
    return error;
  }
}
module.exports = {
  getCustomerById,
  createCarData,
  fetchCarList,
  delCustomerTable,
  createCustomerByUserId,
};
