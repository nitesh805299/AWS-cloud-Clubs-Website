import QRCode from "qrcode";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

/**
 * @desc   Get all events (optional ?status=upcoming)
 * @route  GET /api/events
 */
export const getEvents = async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status === "upcoming") {
      query = { isRegistrationOpen: true };
    }

    const events = await Event.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get single event by ID
 * @route  GET /api/events/:eventId
 */
export const getEventById = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Create new event (Team members & Admins only)
 * @route  POST /api/events
 */
export const createEvent = async (req, res, next) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user ? req.user._id : undefined,
    };

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};


export const updateEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully!",
      data: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

 
    await Registration.deleteMany({ eventId });

    res.status(200).json({
      success: true,
      message: "Event and associated registrations deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};


export const getEventQRCode = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const frontendBaseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const registrationUrl = `${frontendBaseUrl}/events/${eventId}/register`;

    const qrCode = await QRCode.toDataURL(registrationUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: "#010611",
        light: "#ffffff",
      },
    });

    res.status(200).json({
      success: true,
      data: {
        eventId,
        eventTitle: event.title,
        registrationUrl,
        qrCodeImage: qrCode,
      },
    });
  } catch (error) {
    next(error);
  }
};