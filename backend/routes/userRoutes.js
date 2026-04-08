import express from "express";
import {
  getUsers,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getUsers); // team page
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;