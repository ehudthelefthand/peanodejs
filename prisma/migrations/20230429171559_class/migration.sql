/*
  Warnings:

  - You are about to drop the `StudenOnCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudenOnCourse" DROP CONSTRAINT "StudenOnCourse_cousreId_fkey";

-- DropForeignKey
ALTER TABLE "StudenOnCourse" DROP CONSTRAINT "StudenOnCourse_userId_fkey";

-- DropTable
DROP TABLE "StudenOnCourse";

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cousreId" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_cousreId_fkey" FOREIGN KEY ("cousreId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
