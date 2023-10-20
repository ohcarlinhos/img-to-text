import express from "express";
import path from "path";

import { imageToTextController } from "./imageToText";
import { uploadMiddleware } from "./middlewares";

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.post("/img", uploadMiddleware.single("file"), imageToTextController);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
