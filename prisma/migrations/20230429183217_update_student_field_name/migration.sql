/*
  Warnings:

  - You are about to drop the column `studenId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[classId,studentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studenId_fkey";

-- DropIndex
DROP INDEX "Student_classId_studenId_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "studenId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_classId_studentId_key" ON "Student"("classId", "studentId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
