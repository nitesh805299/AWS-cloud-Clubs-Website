import express from "express";
import {
  getAllUsers,
  getMe,
  login,
  register,
  updateUserRole,
} from "../controllers/authController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

// Admin-only routes
router.get("/users", protect, authorize("admin"), getAllUsers);
router.patch("/users/:userId/role", protect, authorize("admin"), updateUserRole);

export default router;
