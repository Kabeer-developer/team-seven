import express from "express";
import {
  getGallery,
  addImage,
} from "../controllers/galleryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/upload.js"; // ✅ multer middleware

const router = express.Router();

// ✅ Get gallery (public)
router.get("/", getGallery);

// ✅ Add image (admin only)
// Supports:
// - URL (JSON body)
// - File upload (multipart/form-data)
router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"), // 🔥 important for file upload
  addImage
);

export default router;