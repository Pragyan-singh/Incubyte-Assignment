import bcrypt from "bcrypt";
import prisma from "../utils/prisma.js";

export const createAdminUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
    },
    create: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  return admin;
};
