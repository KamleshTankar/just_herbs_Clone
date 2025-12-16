import multer from "multer";
import path from "path";

// Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "/backend/upload");
  },
  filename(req, file, cb) {
    cb(null, `product-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error("Images only (jpeg, jpg, png, webp)"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
