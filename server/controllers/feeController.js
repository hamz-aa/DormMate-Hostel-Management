import { createError } from "../error.js";
import { getMonthName } from "../helpers/getMonthName.js";
import Fee from "../models/Fee.js";
import Room from "../models/Room.js";
import Student from "../models/Student.js";
import Voucher from "../models/Voucher.js";

// Map months to numbers
const monthMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const getFees = async (req, res, next) => {
  try {
    const fees = await Fee.find().sort({ year: -1, month: -1 }).lean();

    if (!fees || !fees.length) return next(createError(404, "Fee not found!"));

    // Convert month names to numbers for correct sorting
    fees.sort((a, b) => {
      if (a.year === b.year) {
        return monthMap[b.month] - monthMap[a.month];
      }
      return b.year - a.year;
    });

    res.status(200).json(fees);
  } catch (error) {
    next(error);
  }
};

export const createFeeVoucher = async (req, res, next) => {
  try {
    const { month, year } = req.body;
    const voucher = await Fee.findOne({ month, year });
    if (voucher) {
      return next(
        createError(
          403,
          "Voucher already exists for the specified month and year!"
        )
      );
    }
    const newVoucher = new Fee(req.body);
    const addVoucher = await newVoucher.save();
    res.status(200).json(addVoucher);
  } catch (error) {
    next(error);
  }
};

export const generateFeeVoucher = async (req, res, next) => {
  try {
    const date = new Date();
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();
    const currentMonthFees = await Fee.findOne({ month, year });
    if (!currentMonthFees)
      return next(
        createError(404, "Current month's voucher hasn't been created!")
      );
    const fee_id = currentMonthFees._id;
    const student_id = req.params.id;
    const student = await Student.findById(student_id);
    if (student.room_id === "N/A")
      return next(
        createError(
          400,
          "Student must be assigned a room before generating voucher!"
        )
      );
    const room = await Room.findById(student.room_id);
    let amount = room.price + currentMonthFees.amount;
    const status = "Pending";
    const voucher = new Voucher({
      fee_id,
      student_id,
      amount,
      status,
      due_date: currentMonthFees.due_date,
    });
    const response = await voucher.save();

    // const student = await Student.findById(voucher.student_id);
    const feeSlip = await Fee.findById(response.fee_id);
    const obj = {};
    obj._id = response._id;
    obj.month = feeSlip.month;
    obj.year = feeSlip.year;
    obj.amount = response.amount;
    obj.due_date = feeSlip.due_date;
    obj.consumer_id = feeSlip.consumer_id;
    obj.status = response.status;

    res.status(200).json({ ...obj });
  } catch (error) {
    next(error);
  }
};

export const getVouchersMonth = async (req, res, next) => {
  try {
    const feeSlip = await Fee.findOne({
      month: req.params.month,
      year: req.params.year,
    });
    if (!feeSlip)
      return next(createError(404, "Fees for the specified month not found!"));
    const vouchers = await Voucher.find({ fee_id: feeSlip._id });
    if (!vouchers || !vouchers.length)
      return next(createError(404, "Vouchers not found!"));
    let obj = {};
    const response = [];
    for (let voucher of vouchers) {
      let name = "N/A",
        email = "N/A",
        room_no = "N/A",
        student,
        room;
      if (voucher.student_id) {
        student = await Student.findById(voucher.student_id);
        name = student?.name || "N/A";
        email = student?.email || "N/A";
      }
      if (student && student.room_id !== "N/A") {
        room = await Room.findById(student.room_id);
        room_no = room?.room_no;
      }
      obj.name = name;
      obj.email = email;
      obj.room_no = room_no;
      obj.amount = voucher.amount;
      obj.status = voucher.status;
      // obj.due_date = voucher.due_date;
      response.push({ ...obj });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getVouchersStudent = async (req, res, next) => {
  try {
    const vouchers = await Voucher.find({ student_id: req.params.id });
    if (!vouchers || !vouchers.length)
      return next(createError(404, "Vouchers not found!"));
    let obj = {};
    const response = [];
    for (let voucher of vouchers) {
      // const student = await Student.findById(voucher.student_id);
      const feeSlip = await Fee.findById(voucher.fee_id);
      obj._id = voucher._id;
      obj.month = feeSlip.month;
      obj.year = feeSlip.year;
      obj.amount = voucher.amount;
      obj.due_date = feeSlip.due_date;
      obj.consumer_id = feeSlip.consumer_id;
      obj.status = voucher.status;
      response.push({ ...obj });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateVoucher = async (req, res, next) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) return next(createError(404, "Voucher not found!"));
    const newVoucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    let obj = {};
    const feeSlip = await Fee.findById(voucher.fee_id);
    obj._id = newVoucher._id;
    obj.month = feeSlip.month;
    obj.year = feeSlip.year;
    obj.amount = newVoucher.amount;
    obj.due_date = feeSlip?.due_date;
    obj.consumer_id = feeSlip?.consumer_id;
    obj.status = newVoucher.status;
    res.status(200).json({ ...obj });
  } catch (error) {
    next(error);
  }
};
