import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

exports.getEmployeeByEmail = async (email) => {
  try {
    const employeeDetail = await prisma.employee.findFirst({
      where: { user_email: email },
    });

    return employeeDetail;
  } catch (error) {
    return error;
  }
};
