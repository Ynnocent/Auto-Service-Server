const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {v4: uuidv4} = require("uuid");

async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function createUser(data) {
  const { user_fname, user_lname, user_password, user_email, user_type } = data;
  
  try {
    console.log(data);
    const user = await prisma.user.create({
      data: {
        user_fname,
        user_lname,
        user_password,
        user_email,
        user_type,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function clearUserDatabase() {
  try {
    await prisma.user.deleteMany();
    return user;
  } catch (error) {
    return error;
  }
}

async function getUser(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}

module.exports = {
  getAllUsers,
  clearUserDatabase,
  createUser,
};

prisma.$disconnect();
