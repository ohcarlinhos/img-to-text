import crypto from "crypto";
import multer from "multer";
import path from "path";

export const uploadFolder = path.resolve(__dirname, "..", "upload");

export const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(_, __, callback) {
      const hashName = crypto.randomUUID();
      return callback(null, hashName);
    },
  }),
});
