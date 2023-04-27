import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   await prisma.user.create({
  //     data: {
  //       username: "gap",
  //       password: "hello",
  //       role: "STUDENT",
  //     },
  //   });
  //   await prisma.studenProfile.create({
  //     data: {
  //       companyName: "DODS",
  //       jobTitle: "Hello World!",
  //       level: "UFO",
  //       userId: "24457d50-6b7e-476c-bad2-bb1a284fc258",
  //     },
  //   });
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       username: "pongneng",
  //     },
  //     include: {
  //       studenProfile: {
  //         select: {
  //           companyName: true,
  //         },
  //       },
  //     },
  //   });
  //   console.log(user);
  //   const course = await prisma.course.create({
  //     data: {
  //       name: "TDD 3",
  //       description:
  //         "The software development is hard. Write a bug free software with TDD",
  //     },
  //   });
  //   console.log(course);
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       username: "pongneng",
  //     },
  //   });
  //   if (!user) {
  //     return;
  //   }
  //   await prisma.studenOnCourse.create({
  //     data: {
  //       userId: user?.id,
  //       cousreId: course.id,
  //     },
  //   });

  const user = await prisma.user.findUnique({
    where: {
      username: "pongneng",
    },
    include: {
      studenOnCourses: {
        include: {
          course: true,
        },
      },
    },
  });

  console.log(user);
}

main()
  .then(() => {
    console.log("done");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
