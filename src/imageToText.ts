import { Request, Response } from "express";
import { createWorker } from "tesseract.js";
import path from "path";
import fs from "fs";

import { uploadFolder } from "./middlewares";

export async function imgToTextService(filename: string): Promise<string> {
  try {
    const filePath = path.resolve(uploadFolder, filename);
    await fs.promises.stat(filePath);

    const worker = await createWorker("eng+por");
    const { data } = await worker.recognize(filePath);
    await worker.terminate();

    await fs.promises.unlink(filePath);

    return data.text;
  } catch {
    throw new Error("Error while reading image");
  }
}

export async function imageToTextController(
  req: Request,
  res: Response,
): Promise<Response> {
  const { file } = req;
  if (!file?.filename) throw new Error("No file found");

  const text = await imgToTextService(file.filename);
  return res.json({ text });
}
