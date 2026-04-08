import express from "express";
import {
  getProjects,
  createProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", protect, isAdmin, createProject);

export default router;