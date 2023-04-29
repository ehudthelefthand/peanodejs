import { Router } from "express";
import { auth } from "../middleware";
import z from "zod";
import prisma from "../db";

export default function (router: Router) {
  const courseSchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  router.post("/courses", auth, async (req, res, next) => {
    try {
      const { name, description } = courseSchema.parse(req.body);
      const course = await prisma.course.create({
        data: {
          name,
          description,
        },
      });
      res.json({
        course,
      });
    } catch (err) {
      next(err);
    }
  });
}
