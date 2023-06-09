import { Router } from "express";
import { auth, logBody } from "../middleware";
import prisma from "../db";
import z from "zod";
import asyncHandler from "express-async-handler";
import { createOrUpdateProfile } from "../repository/profile";

export default function (router: Router) {
  router.get(
    "/profiles",
    auth,
    asyncHandler(async (req, res, next) => {
      const profile = await prisma.studenProfile.findUnique({
        where: {
          userId: req.user.id,
        },
      });

      const courses = await prisma.student.findMany({
        where: {
          studentId: req.user.id,
        },
        include: {
          class: {
            include: {
              course: {
                select: {
                  name: true,
                },
              },
            },
          },
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

  router.put("/profiles", auth, logBody, async (req, res, next) => {
    try {
      const { companyName, jobTitle, level } = profileSchema.parse(req.body);
      const profile = await createOrUpdateProfile({
        userId: req.user.id,
        companyName,
        jobTitle,
        level,
      });
      res.json({
        profile,
      });
    } catch (err) {
      next(err);
    }
  });
}
