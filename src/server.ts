import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import path from "path";

import { imageToTextController } from "./imageToText";
import { uploadMiddleware } from "./middlewares";
import { AppError } from "./error";

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.post("/img", uploadMiddleware.single("file"), imageToTextController);

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  let message = "Internal server error";
  let statusCode = 500;

  if (error instanceof AppError) {
    message = error.message;
    statusCode = error.statusCode;
  }

  return res.status(statusCode).json({ message });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
