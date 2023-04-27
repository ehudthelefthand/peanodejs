import express from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import { generateToken } from "../until/token";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
      },
    });
    res.json({
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    console.error(err);
    next();
  }
});

router.post("login", (req, res) => {});
router.post("logout", (req, res) => {});

export default router;
