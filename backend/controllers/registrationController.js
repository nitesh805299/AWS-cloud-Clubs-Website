import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import User from "../models/User.js";
import { generateUniqueId } from "../utils/generateId.js";
import {
  validateEmail,
  validateStudentNumber,
} from "../utils/validators.js";

/**
 * @desc   Register student for an event
 * @route  POST /api/events/:eventId/register
 */
export const registerForEvent = async (req, res, next) => {
  const eventId = req.params.eventId || req.body.eventId;
  let seatReserved = false;

  try {
    const {
      studentName,
      email,
      studentNumber,
      branch,
      year,
      residenceType,
      whyInterested,
    } = req.body;

   
    if (!studentName || !email || !studentNumber || !branch || !year) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (Name, Email, Student Number, Branch, Year).",
      });
    }


    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      return res.status(400).json({
        success: false,
        message: emailCheck.message,
      });
    }

    const rollCheck = validateStudentNumber(studentNumber);
    if (!rollCheck.isValid) {
      return res.status(400).json({
        success: false,
        message: rollCheck.message,
      });
    }

   
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (!event.isRegistrationOpen) {
      return res.status(400).json({
        success: false,
        message: "Registration for this event is currently closed.",
      });
    }

    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({
        success: false,
        message: "The registration deadline for this event has passed.",
      });
    }

    const existingRegistration = await Registration.findOne({
      eventId,
      $or: [
        { studentNumber: rollCheck.studentNumber },
        { email: emailCheck.email },
      ],
    });

    if (existingRegistration) {
      const existingQr = await QRCode.toDataURL(
        JSON.stringify({
          type: "EVENT_TICKET",
          registrationId: existingRegistration.registrationId,
          eventId: event._id,
          eventTitle: event.title,
          studentName: existingRegistration.studentName,
          studentNumber: existingRegistration.studentNumber,
          verificationStatus: existingRegistration.verificationStatus,
        }),
        { width: 300, margin: 2 }
      );

      return res.status(409).json({
        success: false,
        isAlreadyRegistered: true,
        message: "You are already registered for this event with this Student Number or Email!",
        data: {
          ...existingRegistration.toObject(),
          ticketQrCode: existingQr,
          eventTitle: event.title,
          eventDate: event.date,
          venue: event.venue,
        },
      });
    }

    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        isRegistrationOpen: true,
        $expr: { $lt: ["$registeredCount", "$capacity"] },
      },
      { $inc: { registeredCount: 1 } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(400).json({
        success: false,
        message: "Registration full! Maximum capacity has been reached for this event.",
      });
    }

    seatReserved = true;

    let linkedUserId = req.user ? req.user._id : null;
    if (!linkedUserId && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_key_cloud_club");
        const foundUser = await User.findById(decoded.id);
        if (foundUser) linkedUserId = foundUser._id;
      } catch (err) {
        // Continue if token is not valid
      }
    }

    if (!linkedUserId && emailCheck.email) {
      const existingUser = await User.findOne({ email: emailCheck.email.toLowerCase() });
      if (existingUser) linkedUserId = existingUser._id;
    }

    const registrationId = generateUniqueId();

    const registration = await Registration.create({
      eventId,
      userId: linkedUserId,
      studentName: studentName.trim(),
      email: emailCheck.email,
      studentNumber: rollCheck.studentNumber,
      branch: branch.trim(),
      year: year.trim(),
      residenceType: residenceType || "Day Scholar",
      whyInterested: whyInterested ? whyInterested.trim() : "",
      registrationId,
      verificationStatus: "VERIFIED",
    });

    const ticketPayload = JSON.stringify({
      type: "EVENT_TICKET",
      registrationId: registration.registrationId,
      eventId: event._id,
      eventTitle: event.title,
      studentName: registration.studentName,
      studentNumber: registration.studentNumber,
      verificationStatus: registration.verificationStatus,
      registeredAt: registration.registeredAt,
    });

    const ticketQrCode = await QRCode.toDataURL(ticketPayload, {
      width: 300,
      margin: 2,
      color: {
        dark: "#010611",
        light: "#ffffff",
      },
    });

    res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to the event.",
      data: {
        ...registration.toObject(),
        ticketQrCode,
        eventTitle: event.title,
        eventDate: event.date,
        venue: event.venue,
        remainingSeats: updatedEvent.remainingSeats,
      },
    });
  } catch (error) {
    // Roll back capacity counter if database insertion failed
    if (seatReserved) {
      await Event.findByIdAndUpdate(eventId, { $inc: { registeredCount: -1 } });
    }

    // MongoDB compound unique index error code 11000
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        isAlreadyRegistered: true,
        message: "Duplicate registration detected. This student is already registered for this event.",
      });
    }

    next(error);
  }
};

export const getMyRegistrations = async (req, res, next) => {
  try {
    const orConditions = [
      { userId: req.user._id },
      { email: req.user.email.toLowerCase() },
    ];
    if (req.user.studentNumber) {
      orConditions.push({ studentNumber: req.user.studentNumber });
    }
    const query = { $or: orConditions };

    const registrations = await Registration.find(query)
      .populate("eventId", "title date startTime endTime venue bannerUrl isRegistrationOpen")
      .sort({ createdAt: -1 });

    // Generate ticket QR code for each
    const populatedWithQr = await Promise.all(
      registrations.map(async (reg) => {
        const ticketPayload = JSON.stringify({
          type: "EVENT_TICKET",
          registrationId: reg.registrationId,
          eventId: reg.eventId?._id,
          eventTitle: reg.eventId?.title,
          studentName: reg.studentName,
          studentNumber: reg.studentNumber,
          verificationStatus: reg.verificationStatus,
        });

        const qr = await QRCode.toDataURL(ticketPayload, { width: 300, margin: 2 });
        return {
          ...reg.toObject(),
          ticketQrCode: qr,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: populatedWithQr.length,
      data: populatedWithQr,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventRegistrations = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const registrations = await Registration.find({ eventId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      eventTitle: event.title,
      totalCapacity: event.capacity,
      registeredCount: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};


export const getRegistrationById = async (req, res, next) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findOne({
      registrationId: registrationId.toUpperCase(),
    }).populate("eventId", "title date startTime endTime venue bannerUrl");

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    // Generate Ticket QR Code
    const ticketPayload = JSON.stringify({
      type: "EVENT_TICKET",
      registrationId: registration.registrationId,
      eventId: registration.eventId?._id,
      eventTitle: registration.eventId?.title,
      studentName: registration.studentName,
      studentNumber: registration.studentNumber,
      verificationStatus: registration.verificationStatus,
    });

    const ticketQrCode = await QRCode.toDataURL(ticketPayload, {
      width: 300,
      margin: 2,
      color: {
        dark: "#010611",
        light: "#ffffff",
      },
    });

    res.status(200).json({
      success: true,
      data: {
        ...registration.toObject(),
        ticketQrCode,
      },
    });
  } catch (error) {
    next(error);
  }
};
