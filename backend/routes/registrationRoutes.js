import express from "express";
import {
  getMyRegistrations,
  getRegistrationById,
  registerForEvent,
} from "../controllers/registrationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();


router.post("/", registerForEvent);


router.get("/my-registrations", protect, getMyRegistrations);


router.get("/:registrationId", getRegistrationById);

export default router;
