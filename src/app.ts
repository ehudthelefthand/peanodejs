import express, { NextFunction, Request, Response } from "express";
import userRouter from "./handler/user";
import studentRouter from "./handler/student";
import profileRouter from "./handler/profile";
import { ZodError } from "zod";
import morgan from "morgan";
import logger from "./util/logger";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const upload = multer({ dest: "uploads/" });

app.post("/photos/upload", upload.single("avatar"), (req, res) => {
  logger.info(req.file);
  res.end();
});

app.use("/api/v1", userRouter);
app.use("/api/v1", studentRouter);
app.use("/api/v1", profileRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: err,
    });
    return;
  }
  logger.error(err.message);
  res.status(500).json({
    message: "unexpected error",
  });
});

app.put("/", (req, res) => {});
app.delete("/", (req, res) => {});

export default app;
