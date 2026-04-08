import express from "express";
import {
  submitSolution,
  getUserSubmissions,
  getAllSubmissions,
  gradeSubmission,
} from "../controllers/submissionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/me", protect, getUserSubmissions);
router.get("/", protect, isAdmin, getAllSubmissions);

// Validate submission payload before controller logic runs.
router.post(
  "/",
  protect,
  [
    body("challengeId").isMongoId().withMessage("Valid challengeId is required"),
    body("githubLink")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("githubLink must be a valid URL"),
    body("liveLink")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("liveLink must be a valid URL"),
  ],
  handleValidationErrors,
  submitSolution
);

// Validate grading requests to keep score values clean and bounded.
router.put(
  "/:id/grade",
  protect,
  isAdmin,
  [
    body("score")
      .isNumeric()
      .withMessage("score is required and must be numeric")
      .custom((value) => Number(value) >= 0)
      .withMessage("score cannot be negative"),
  ],
  handleValidationErrors,
  gradeSubmission
);

export default router;