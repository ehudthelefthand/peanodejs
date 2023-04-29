/*
  Warnings:

  - You are about to drop the column `cousreId` on the `Class` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_cousreId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "cousreId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
