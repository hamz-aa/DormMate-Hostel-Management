import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    profile_url: {
      type: String,
      default: "",
    },
    college: {
      type: String,
      required: true,
      enum: [
        "Bahria University",
        "FAST University",
        "Karachi University",
        "NED University",
      ],
    },
    course: {
      type: String,
      required: true,
      enum: ["Social Sciences", "Engineering", "Humanitarian", "Medical"],
    },
    hostel: {
      type: String,
      required: true,
      enum: ["Hostel1", "Hostel2", "Hostel3", "Hostel4"],
    },
    room_id: {
      type: String,
      default: "N/A",
      required: true,
    },
    room_change_request: {
      type: String,
      default: "N/A",
      required: true,
    },
    room_booked_until: {
      type: Date,
      required: true,
      default: new Date(),
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", StudentSchema);
