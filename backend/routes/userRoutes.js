import express from "express";
import {
  getUsers,
  getProfile,
  updateProfile,
  updateUserAdmin,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", getUsers); // team page
router.get("/profile", protect, getProfile);
router.put(
  "/profile",
  protect,
  [
    body("name")
      .optional({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage("name should be at least 2 characters"),
    body("github")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("github must be a valid URL"),
    body("linkedin")
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage("linkedin must be a valid URL"),
  ],
  handleValidationErrors,
  updateProfile
);
router.patch(
  "/:id/admin",
  protect,
  isAdmin,
  [
    body("role")
      .optional()
      .isIn(["visitor", "member", "admin"])
      .withMessage("role must be visitor/member/admin"),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be true or false"),
  ],
  handleValidationErrors,
  updateUserAdmin
);

export default router;