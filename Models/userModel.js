const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function getUserById(user_id) {
  try {
    const userById = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });
    return userById;
  } catch (error) {
    return error;
  }
}

async function getUserByFname(user_fname) {
  try {
    const userByFname = await prisma.user.findFirst({
      where: {
        user_fname: user_fname,
      },
    });

    return userByFname;
  } catch (error) {
    return error;
  }
}

async function getUserByEmail(user_email) {
  try {
    const userByEmail = await prisma.user.findFirst({
      where: {
        user_email: user_email,
      },
    });

    return userByEmail;
  } catch (error) {
    return error;
  }
}

async function createUser(data) {
  const { user_fname, user_lname, user_password, user_email, user_type } = data;

  try {
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
  const user = await prisma.user.findFirst({
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
  getUserByEmail,
  getUserByFname,
  getUserById,
};

prisma.$disconnect();
