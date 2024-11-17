import multer from "multer";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.join("uploads", file.mimetype === "video/mp4" ? "video" : "images");
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const id = uuidv4().replace(/-/g, "");
    callback(null, `${file.fieldname}_${id}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "video/mp4" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(new Error("File uploaded is not of type jpg/jpeg or png or video/mp4"), false);
  }
};


export const upload = multer({ storage, fileFilter });