import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    student_id: {
      type: Array,
      default: [],
    },
    room_no: {
      type: Number,
      required: true,
    },
    room_type: {
      type: String,
      required: true,
      enum: ["Single", "Double"],
    },
    status: {
      type: String,
      required: true,
      default: "Available",
      enum: ["Available", "Occupied", "Maintenance"],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", RoomSchema);
