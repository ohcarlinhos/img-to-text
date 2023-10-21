import path from "path";
import crypto from "crypto";
import multer from "multer";
import mime from "mime-types";

export const uploadFolder = path.resolve(__dirname, "..", "upload");

export const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(_, __, callback) {
      const hashName = crypto.randomUUID();
      return callback(null, hashName);
    },
  }),
  fileFilter(_, file, callback) {
    const allowMimetypes = ["png", "jpg", "jpeg"];
    const mimetype = `${mime.extension(file.mimetype)}`

    if (!allowMimetypes.includes(mimetype)) {
      return callback(new Error("Invalid file type"));
    }

    return callback(null, true);
  },
  limits: { fileSize: 3 * 1024 * 1024 },
});
