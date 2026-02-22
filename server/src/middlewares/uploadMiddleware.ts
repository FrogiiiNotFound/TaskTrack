import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import { types } from "../types/allowedImages";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../static"));
  },
  filename: (req, file, cb) => {
    const uniqueName = uuid() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (!types.includes(file.mimetype)) {
    return cb(new Error("Only PNG, JPEG and WEBP files are allowed"));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});
