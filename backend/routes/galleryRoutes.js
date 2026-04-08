import express from "express";
import {
  getGallery,
  addImage,
} from "../controllers/galleryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getGallery);
router.post("/", protect, isAdmin, addImage);

export default router;