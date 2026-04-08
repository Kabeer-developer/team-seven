import express from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  toggleProjectLike,
  setProjectFeatured,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { body } from "express-validator";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post(
  "/",
  protect,
  isAdmin,
  [
    body("title").trim().notEmpty().withMessage("title is required"),
    body("description").trim().notEmpty().withMessage("description is required"),
  ],
  handleValidationErrors,
  createProject
);
router.post("/:id/like", protect, toggleProjectLike);
router.patch("/:id/featured", protect, isAdmin, setProjectFeatured);
router.put("/:id", protect, isAdmin, updateProject);
router.delete("/:id", protect, isAdmin, deleteProject);

export default router;