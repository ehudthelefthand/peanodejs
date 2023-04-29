import express, { NextFunction, Request, Response } from "express";
import userRouter from "./handler/user";
import studentRouter from "./handler/student";
import profileRouter from "./handler/profile";
import { ZodError } from "zod";
import morgan from "morgan";
import logger from "./util/logger";
import multer from "multer";
import { fromZodError } from "zod-validation-error";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const upload = multer({ dest: "uploads/" });

// Example of file upload
app.post("/photos/upload", upload.single("avatar"), (req, res) => {
  logger.info(req.file);
  res.end();
});

const v1 = express.Router();

app.use("/api/v1", v1);

v1.use("/", userRouter);
v1.use("/", studentRouter);
v1.use("/", profileRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: fromZodError(err),
    });
    return;
  }
  res.status(500).json({
    message: "unexpected error",
  });
});

app.put("/", (req, res) => {});
app.delete("/", (req, res) => {});

export default app;
