import express from "express";
import { auth } from "../middleware";
import prisma from "../db";

const router = express.Router();

router.get("/profiles", auth, async (req, res, next) => {
  try {
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
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put("/profiles", auth, async (req, res, next) => {
  try {
    const { companyName, jobTitle, level } = req.body;
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
