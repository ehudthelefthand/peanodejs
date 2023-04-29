import express from "express";
import prisma from "../db";
import { Role } from "@prisma/client";
import { auth } from "../middleware";

const router = express.Router();

router.get("/students", auth, async (req, res, next) => {
  try {
    const students = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
      where: {
        role: Role.STUDENT,
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

export default router;
