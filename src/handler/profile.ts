import express from "express";
import { auth } from "../middleware";
import prisma from "../db";
import z from "zod";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.get(
  "/profiles",
  auth,
  asyncHandler(async (req, res, next) => {
    const profile = await prisma.studenProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });
    const courses = await prisma.studenOnCourse.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        course: true,
      },
    });
    res.json({
      profile,
      courses,
    });
  })
);

const profileSchema = z.object({
  companyName: z.string(),
  jobTitle: z.string(),
  level: z.string(),
});

router.put("/profiles", auth, async (req, res, next) => {
  try {
    const { companyName, jobTitle, level } = profileSchema.parse(req.body);
    const profile = await prisma.studenProfile.upsert({
      where: {
        id: req.user.id,
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
        userId: req.user.id,
      },
    });
    res.json({
      profile,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
