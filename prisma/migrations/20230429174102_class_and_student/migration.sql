/*
  Warnings:

  - You are about to drop the column `userId` on the `Class` table. All the data in the column will be lost.
  - Added the required column `trainerId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_userId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "userId",
ADD COLUMN     "trainerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "studenId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_classId_studenId_key" ON "Student"("classId", "studenId");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studenId_fkey" FOREIGN KEY ("studenId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
