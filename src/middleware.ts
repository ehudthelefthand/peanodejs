import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./util/token";
import logger from "./util/logger";
import { getUserById } from "./repository/user";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({
      message: "unauthorized",
    });
    return;
  }

  const [, token] = bearer.split("Bearer ");
  if (!token) {
    res.status(401).json({
      message: "unauthorized",
    });
    return;
  }

  try {
    const payload = verifyToken(token);
    const { id } = payload;
    const user = await getUserById(id);
    if (!user) {
      res.status(401).json({
        message: "unauthorized",
      });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      message: "oop! something went wrong",
    });
  }
};

export const logBody = (req: Request, res: Response, next: NextFunction) => {
  logger.info(req.body);
  next();
};
