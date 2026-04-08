import express from "express";
import {
  getChallenges,
  createChallenge,
  getChallengeById,
} from "../controllers/challengeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getChallenges);
router.get("/:id", getChallengeById);
router.post("/", protect, isAdmin, createChallenge);

export default router;