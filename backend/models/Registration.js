import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      lowercase: true,
      trim: true,
    },
    studentNumber: {
      type: String,
      required: [true, "Student number is required"],
      trim: true,
    },
    branch: {
      type: String,
      required: [true, "Branch is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Year of study is required"],
      trim: true,
    },
    residenceType: {
      type: String,
      enum: ["Day Scholar", "Hosteler"],
      default: "Day Scholar",
    },
    whyInterested: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    registrationId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    verificationStatus: {
      type: String,
      enum: ["PENDING", "VERIFIED", "CANCELLED"],
      default: "VERIFIED",
    },
    ticketId: {
      type: String,
      default: null,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registrations per event
registrationSchema.index({ eventId: 1, studentNumber: 1 }, { unique: true });
registrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

export default mongoose.model("Registration", registrationSchema);
