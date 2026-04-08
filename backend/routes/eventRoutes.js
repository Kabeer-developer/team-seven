import express from "express";
import {
  getEvents,
  createEvent,
  getEventById,
  registerEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post(
  "/",
  protect,
  isAdmin,
  [
    body("title").trim().notEmpty().withMessage("title is required"),
    body("description").trim().notEmpty().withMessage("description is required"),
    body("date")
      .optional({ checkFalsy: true })
      .isISO8601()
      .withMessage("date must be a valid date"),
  ],
  handleValidationErrors,
  createEvent
);
router.post("/:id/register", protect, registerEvent);
router.put("/:id", protect, isAdmin, updateEvent);
router.delete("/:id", protect, isAdmin, deleteEvent);

export default router;