import express from "express";
import {
  submitSolution,
  getUserSubmissions,
  gradeSubmission,
} from "../controllers/submissionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, submitSolution);
router.get("/me", protect, getUserSubmissions);
router.put("/:id/grade", protect, isAdmin, gradeSubmission);

export default router;