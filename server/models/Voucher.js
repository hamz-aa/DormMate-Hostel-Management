import mongoose from "mongoose";

const VoucherSchema = new mongoose.Schema(
  {
    fee_id: {
      type: String,
      required: true,
    },
    student_id: {
      type: String,
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
    status: {
      type: String,
      required: true,
      enum: ["Paid", "Unpaid", "Pending"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Voucher", VoucherSchema);
