import mongoose from "mongoose";

const FeeSchema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    year: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    consumer_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// FeeSchema.index({ due_date: 1 }, { expireAfterSeconds: 3 * 30 * 24 * 60 * 60 }); // 3 months expiry

export default mongoose.model("Fee", FeeSchema);
