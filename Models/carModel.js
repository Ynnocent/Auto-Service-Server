const { PrismaClient, CarType } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getCarById = async (customer_id) => {
  try {
    const car = await prisma.car.findFirst({
      where: {
        customer_id,
      },
    });
    return car;
  } catch (error) {
    return error;
  }
};

exports.delCarTable = async () => {
  try {
    await prisma.car.deleteMany();
  } catch (error) {
    return error;
  }
};

exports.getCarTypes = async = () => {
  try {
    return CarType
  } catch (error) {
    return error
  }
}