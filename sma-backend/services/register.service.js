import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // used for password Hashing
const prisma = new PrismaClient();

const login = async (req) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    return "User of given email doesnot exists!";
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return "Password doesnot match!";
    }
  }); // this is done so that the new entered password is hashed before comparing with the existing hased password
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: user,
    },
    process.env.jwtsecretcode
  );

  return { token, user }; //token: token
};

const register = async (req) => {
  let { email, password, fullName, gender } = req.body;
  console.log(req.body);
  password = await bcrypt.hash(password, 10);
  console.log(password);
  const user = await prisma.user.create({
    data: {
      email,
      password,
      fullName,
      gender,
    },
  });
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: user,
    },
    process.env.jwtsecretcode
  );
  return { token, user };
};

const getUser = async (req) => {
  const { userId } = req.params;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return "User of given email doesnot exists!";
  }
  return { user }; //token: token
};

export { login, register, getUser };
