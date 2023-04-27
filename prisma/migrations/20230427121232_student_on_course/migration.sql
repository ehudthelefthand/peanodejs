-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudenOnCourse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cousreId" TEXT NOT NULL,

    CONSTRAINT "StudenOnCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudenOnCourse" ADD CONSTRAINT "StudenOnCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudenOnCourse" ADD CONSTRAINT "StudenOnCourse_cousreId_fkey" FOREIGN KEY ("cousreId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
