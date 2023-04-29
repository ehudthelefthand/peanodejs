import prisma from "../db";

export const getUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: { id },
  });
};
