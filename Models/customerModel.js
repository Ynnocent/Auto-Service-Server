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

module.exports = {
  getCustomerById,
};
