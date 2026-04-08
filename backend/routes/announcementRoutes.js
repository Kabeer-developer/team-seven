import express from "express";
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", getAnnouncements);
router.post(
  "/",
  protect,
  isAdmin,
  [body("title").trim().notEmpty().withMessage("title is required")],
  handleValidationErrors,
  createAnnouncement
);
router.put(
  "/:id",
  protect,
  isAdmin,
  [body("title").optional().trim().notEmpty(), body("content").optional().isString()],
  handleValidationErrors,
  updateAnnouncement
);
router.delete("/:id", protect, isAdmin, deleteAnnouncement);

export default router;