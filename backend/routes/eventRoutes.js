import express from "express";
import {
  getEvents,
  createEvent,
  registerEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", protect, isAdmin, createEvent);
router.post("/:id/register", protect, registerEvent);

export default router;