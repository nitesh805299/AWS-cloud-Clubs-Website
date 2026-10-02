import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEventQRCode,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";
import {
  getEventRegistrations,
  registerForEvent,
} from "../controllers/registrationController.js";
import { authorize, protect } from "../middleware/auth.js";

const router = express.Router();


router
  .route("/")
  .get(getEvents)
  .post(protect, authorize("admin", "team_member"), createEvent);


router.get("/:eventId/qrcode", getEventQRCode);


router.post("/:eventId/register", registerForEvent);


router.get(
  "/:eventId/registrations",
  protect,
  authorize("admin", "team_member"),
  getEventRegistrations
);


// Protected: PATCH, DELETE (admin / team_member)
router
  .route("/:eventId")
  .get(getEventById)
  .patch(protect, authorize("admin", "team_member"), updateEvent)
  .delete(protect, authorize("admin", "team_member"), deleteEvent);

export default router;
