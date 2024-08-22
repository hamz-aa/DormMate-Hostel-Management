import Student from "../models/Student.js";
import Room from "../models/Room.js";
import { createError } from "../error.js";
import { getMonthName } from "../helpers/getMonthName.js";
import Voucher from "../models/Voucher.js";
import Fee from "../models/Fee.js";

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    if (!students || !students.length)
      return next(createError(404, "Students not found!"));
    const studentResponse = [];
    const obj = {};
    const date = new Date();
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();
    const feeSlip = await Fee.findOne({ month, year });
    for (let student of students) {
      let room;
      if (student.room_id !== "N/A") {
        room = await Room.findById(student.room_id);
      } else {
        room = [];
      }
      const voucher = await Voucher.findOne({
        fee_id: feeSlip._id,
        student_id: student._id,
      });
      obj.id = student._id;
      obj.name = student.name;
      obj.email = student.email;
      obj.hostel = student.hostel;
      obj.room_no = room?.room_no || "N/A";
      obj.fee_status = voucher?.status || "N/A";
      studentResponse.push({ ...obj });
    }
    res.status(200).json(studentResponse);
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studentInfo = await Student.findById(id);
    if (!studentInfo) return next(createError(404, "Student not found!"));

    const date = new Date();
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();
    const feeSlip = await Fee.findOne({ month, year });
    let fee_status = "N/A";
    if (feeSlip) {
      const voucher = await Voucher.findOne({
        fee_id: feeSlip._id,
        student_id: studentInfo._id,
      });
      if (voucher) {
        fee_status = voucher.status;
      }
    }

    const { password, ...others } = studentInfo._doc;

    let data;
    if (studentInfo.room_id !== "N/A") {
      const room_info = await Room.findById(studentInfo.room_id);
      const { _id, student_id, status, price, ...room_data } = room_info._doc;
      data = {
        ...others,
        ...room_data,
        room_status: status,
        room_price: price,
        fee_status,
      };
    } else {
      data = { ...others, room_no: "N/A", room_type: "N/A", fee_status };
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) return next(createError(404, "Student not found!"));
    const { name, profile_url } = req.body;
    let updatedData;
    if (name && profile_url) {
      updatedData = { name, profile_url };
    } else if (name) {
      updatedData = { name };
    } else if (profile_url) {
      updatedData = { profile_url };
    }
    const studentInfo = await Student.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
    const { password, ...others } = studentInfo._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) return next(createError(404, "Student not found!"));
    if (student.room_id !== "N/A") {
      const room = await Room.findById(student.room_id);
      const index = room.student_id.indexOf(student._id);
      if (index > -1) room.student_id.slice(index, 1);
      room.save();
    }
    await Student.findByIdAndDelete(id);
    res.status(200).json("Student deleted successfully!");
  } catch (error) {
    next(error);
  }
};

export const roomChangeRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) return next(createError(404, "Student not found!"));
    const { room_no } = req.body;
    const room = await Room.findOne({ room_no });
    if (!room) return next(createError(404, "Room not found!"));
    if (room.status === "Occupied")
      return next(createError(409, "Room already occupied!"));
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: { room_change_request: room._id },
      },
      { new: true }
    );
    const { password, ...others } = updatedStudent._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};
