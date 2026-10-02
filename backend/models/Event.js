import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "AWS Cloud Workshop",
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      alias: "endtime",
      required: [true, "End time is required"],
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      default: "Main Seminar Hall, CSIT, AKGEC",
      trim: true,
    },
    bannerUrl: {
      type: String,
      default: "",
    },
    registrationDeadline: {
      type: Date,
      required: false,
    },
    capacity: {
      type: Number,
      required: [true, "Maximum capacity is required"],
      min: [1, "Capacity must be at least 1"],
      default: 200,
    },
    registeredCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isRegistrationOpen: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


eventSchema.virtual("remainingSeats").get(function () {
  const seats = this.capacity - this.registeredCount;
  return seats > 0 ? seats : 0;
});


eventSchema.virtual("isAvailable").get(function () {
  const currentDate = new Date();
  const deadlineCheck = !this.registrationDeadline || currentDate <= this.registrationDeadline;
  const capacityAvailable = this.registeredCount < this.capacity;
  return this.isRegistrationOpen && deadlineCheck && capacityAvailable;
});

export default mongoose.model("Event", eventSchema);