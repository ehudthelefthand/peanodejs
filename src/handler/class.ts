import { Router } from "express";
import { auth } from "../middleware";
import z from "zod";
import prisma from "../db";

export default function (router: Router) {
  const classSchema = z.object({
    trainerId: z.string().refine(async (id) => {
      const found = await prisma.user.findUnique({
        where: { id },
      });
      return !!found;
    }),
    courseId: z.string().refine(async (id) => {
      const found = await prisma.course.findUnique({
        where: { id },
      });
      return !!found;
    }),
    start: z.string().datetime(),
    end: z.string().datetime(),
    seats: z.number(),
  });

  router.post("/classes", auth, async (req, res, next) => {
    try {
      const { trainerId, courseId, start, end, seats } =
        await classSchema.parseAsync(req.body);
      const clazz = await prisma.class.create({
        data: {
          trainerId,
          courseId,
          start,
          end,
          seats,
        },
      });
      res.json({
        clazz,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/classes/:id", async (req, res, next) => {
    try {
      const clazz = await prisma.class.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          trainer: {
            select: {
              username: true,
            },
          },
          course: true,
          students: {
            include: {
              student: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });
      res.json({
        clazz,
      });
    } catch (err) {
      next(err);
    }
  });
}
