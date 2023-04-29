import { Router } from "express";
import prisma from "../db";
import { auth } from "../middleware";
import z from "zod";

export default function (router: Router) {
  const enrollSchema = z.object({
    classId: z.string().refine(async (id) => {
      const found = await prisma.class.findUnique({
        where: { id },
      });
      return !!found;
    }),
    studentId: z.string().refine(async (id) => {
      const found = await prisma.user.findUnique({
        where: { id },
      });
      return !!found;
    }),
  });

  router.post("/students", auth, async (req, res, next) => {
    try {
      const { classId } = await enrollSchema.parseAsync(req.body);
      const students = await prisma.student.create({
        data: {
          classId,
          studentId: req.user.id,
        },
      });
      res.json({
        students,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
}
