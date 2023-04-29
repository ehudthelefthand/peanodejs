import prisma from "../db";

export const createOrUpdateProfile = async ({
  userId,
  companyName,
  jobTitle,
  level,
}) => {
  return await prisma.studenProfile.upsert({
    where: {
      userId: userId,
    },
    update: {
      companyName: companyName,
      jobTitle: jobTitle,
      level: level,
    },
    create: {
      companyName: companyName,
      jobTitle: jobTitle,
      level: level,
      userId: userId,
    },
  });
};
