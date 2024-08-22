import Student from "../models/Student.js";
import Room from "../models/Room.js";
import Voucher from "../models/Voucher.js";
import Suggestion from "../models/Suggestion.js";
import Fee from "../models/Fee.js";
import Announcement from "../models/Announcement.js";
import { getMonthName } from "../helpers/getMonthName.js";
import { createError } from "../error.js";

export const getAdminDashboard = async (req, res, next) => {
  try {
    const obj = {};
    obj.totalStudents = await Student.countDocuments();
    obj.availableRooms = await Room.countDocuments({ status: "Available" });
    const availableRoomsSingle = await Room.countDocuments({
      status: "Available",
      room_type: "Single",
    });
    const rooms = await Room.find();
    let count = 0;
    rooms.forEach((room) => {
      if (room.room_type === "Double" && room.status === "Available") {
        room.student_id.length === 0
          ? (count += 2)
          : room.student_id.length === 1
          ? (count += 1)
          : (count += 0);
      }
    });
    obj.availableBeds = availableRoomsSingle + count;
    const paidVouchers = await Voucher.find({ status: "Paid" });
    obj.feesCollected = paidVouchers.reduce((accum, curr) => {
      return accum + curr.amount;
    }, 0);
    obj.suggestions = await Suggestion.countDocuments();
    obj.paidVouchers = await Voucher.find({ status: "Paid" }).countDocuments();
    obj.unpaidVouchers = await Voucher.find({
      status: "Unpaid",
    }).countDocuments();
    const date = new Date();
    const feeCount = await Fee.countDocuments({ year: date.getFullYear() });
    // const fff = await Fee.find({ year: date.getFullYear() });
    // console.log(fff);
    let max_payment;
    feeCount >= 6 ? (max_payment = 6) : (max_payment = feeCount);
    const paymentHistory = {};
    for (let i = 0; i < max_payment; i++) {
      const month = getMonthName(date.getMonth() - i);
      const payment = getPayments(month, date.getFullYear());
      paymentHistory[month] = payment;
    }
    obj.paymentHistory = { ...paymentHistory };
    obj.hostelProgress = getMonthlyStudentCount();
    res.status(200).json({ ...obj });
  } catch (error) {
    next(error);
  }
};

export const getStudentDashboard = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return next(createError(404, "Student not found!"));
    const date = new Date();
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();
    const fee = await Fee.findOne({ month, year });
    let feeStatus = "N/A";
    if (fee) {
      const voucher = await Voucher.findOne({ fee_id: fee._id });
      if (voucher) feeStatus = voucher.status;
    }
    const paidVouchers = await Voucher.find({
      student_id: req.params.id,
      status: "Paid",
    }).countDocuments();
    const unpaidVouchers = await Voucher.find({
      student_id: req.params.id,
      status: "Unpaid",
    }).countDocuments();
    const obj = {};
    obj.totalAnnouncements = await Announcement.countDocuments();
    obj.roomRequest = student.room_change_request !== "N/A";
    obj.feeStatus = feeStatus;
    obj.paidVouchers = paidVouchers;
    obj.unpaidVouchers = unpaidVouchers;
    res.status(200).json({ ...obj });
  } catch (error) {
    next(error);
  }
};

const getPayments = async (month, year) => {
  const feeSlip = await Fee.find({ month, year });
  const vouchers = await Voucher.countDocuments({
    fee_id: feeSlip._id,
    status: "Paid",
  });
  return vouchers;
};

const getMonthlyStudentCount = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const result = await Student.aggregate([
    {
      // Filter documents to include only those from the last 6 months
      $match: {
        createdAt: {
          $gte: sixMonthsAgo,
        },
      },
    },
    {
      // Group documents by year and month
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      // Sort the results by year and month in descending order
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    {
      // Format the output to include the month name
      $project: {
        _id: 0,
        month: {
          $let: {
            vars: {
              monthsInString: [
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
            in: {
              $arrayElemAt: [
                "$$monthsInString",
                { $subtract: ["$_id.month", 1] },
              ],
            },
          },
        },
        count: 1,
      },
    },
  ]);

  return result.reduce((acc, { month, count }) => {
    acc[month] = count;
    return acc;
  }, {});
};
