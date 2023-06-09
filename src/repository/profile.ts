import prisma from "../db";

interface UpdateProfile {
  userId: string;
  companyName: string;
  jobTitle: string;
  level: string;
}

export const createOrUpdateProfile = async ({
  userId,
  companyName,
  jobTitle,
  level,
}: UpdateProfile) => {
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
