import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import Otp from "../models/Otp.js";
import { sendVerificationEmail, generateOTP } from "../helpers/email.js";
import Room from "../models/Room.js";
import { getMonthName } from "../helpers/getMonthName.js";
import Fee from "../models/Fee.js";
import Voucher from "../models/Voucher.js";

export const signup = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);
    const newStudent = new Student({ ...req.body, password: hash });

    await newStudent.save();

    // Generate OTP
    // const otp = generateOTP();
    // const otpEntry = new Otp({
    //   email: req.body.email,
    //   otp,
    //   expiresAt: Date.now() + 3600000, // 1 hour
    // });
    // await otpEntry.save();

    // // Send OTP email
    // await sendVerificationEmail(req.body.email, otp);

    res.status(200).json("Student has been created successfully!");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) return next(createError(404, "Student not found!"));

    bcrypt.compare(req.body.password, student.password, (error, response) => {
      if (error) {
        return next(createError(400, "Bad request!"));
      }
      if (response) {
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
        const { password, ...others } = student._doc;
        const data = { ...others, token };
        return res.status(200).json(data);
      } else {
        return next(createError(400, "Wrong credentials!"));
      }
    });
    // const isCorrect = bcrypt.compare(req.body.password, student.password);
    // if (!isCorrect) return next(createError(400, "Wrong credentials!"));

    // const date = new Date();
    // const month = getMonthName(date.getMonth());
    // const feeSlip = await Fee.findOne({ month });
    // let fee_status = "N/A";
    // if (feeSlip) {
    //   const voucher = await Voucher.findOne({
    //     fee_id: feeSlip._id,
    //     student_id: student._id,
    //   });
    //   if (voucher) {
    //     fee_status = voucher.status;
    //   }
    // }

    // const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
    // const { password, ...others } = student._doc;

    // let data;
    // if (student.room_id !== "N/A") {
    //   const room_info = await Room.findById(student.room_id);
    //   const { _id, ...room_data } = room_info._doc;
    //   data = { ...others, ...room_data, fee_status, token };
    // } else {
    //   data = { ...others, fee_status, token };
    // }

    // const data = { ...others, token };
    // res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const otpEntry = await Otp.findOne({ email, otp });

    if (!otpEntry || otpEntry.expiresAt < Date.now()) {
      return next(createError(400, "Invalid OTP or OTP expired"));
    }

    await Student.updateOne({ email }, { isVerified: true });
    await Otp.deleteOne({ email });

    res.status(200).json("OTP verification successful");
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });

    if (!student) {
      return next(createError(404, "Student not found"));
    }

    const otp = generateOTP();
    const otpEntry = new Otp({
      email,
      otp,
      expiresAt: Date.now() + 3600000, // 1 hour
    });
    await otpEntry.save();

    await sendVerificationEmail(email, otp);

    res.status(200).json("OTP resent successfully");
  } catch (error) {
    next(error);
  }
};
