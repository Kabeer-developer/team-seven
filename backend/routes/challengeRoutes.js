import express from "express";
import {
  getChallenges,
  createChallenge,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
} from "../controllers/challengeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", getChallenges);
router.get("/:id", getChallengeById);
router.post(
  "/",
  protect,
  isAdmin,
  [
    body("title").trim().notEmpty().withMessage("title is required"),
    body("description").trim().notEmpty().withMessage("description is required"),
    body("difficulty")
      .optional({ checkFalsy: true })
      .isIn(["Easy", "Medium", "Hard"])
      .withMessage("difficulty should be Easy/Medium/Hard"),
    body("deadline")
      .optional({ checkFalsy: true })
      .isISO8601()
      .withMessage("deadline must be a valid date"),
  ],
  handleValidationErrors,
  createChallenge
);
router.put("/:id", protect, isAdmin, updateChallenge);
router.delete("/:id", protect, isAdmin, deleteChallenge);

export default router;