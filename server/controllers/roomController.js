import Room from "../models/Room.js";
import { createError } from "../error.js";
import Student from "../models/Student.js";
import { getMonthName } from "../helpers/getMonthName.js";
import Fee from "../models/Fee.js";
import Voucher from "../models/Voucher.js";

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().sort({ room_no: 1 });
    if (!rooms || !rooms.length)
      return next(createError(404, "Rooms not found!"));
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (req, res, next) => {
  try {
    const roomNo = await Room.findOne({ room_no: req.body.room_no });
    if (roomNo) return next(createError(403, "Room already exists!"));
    const room = new Room(req.body);
    const savedRoom = await room.save();
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room.student_id.length === 2 && req.body.room_type === "Single")
      return next(createError(400, "Cannot change room type to Single!"));
    if (!room) return next(createError(404, "Room not found!"));
    if (req.body.room_no !== room.room_no) {
      const roomNo = await Room.findOne({ room_no: req.body.room_no });
      if (roomNo) return next(createError(403, "Room already exists!"));
    }
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return next(createError(404, "Room not found!"));
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room successfully deleted!");
  } catch (error) {
    next(error);
  }
};

export const roomRequest = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return next(createError(404, "Student not found!"));
    const room = await Room.findOne({ room_no: req.body.room_no });
    if (!room) return next(createError(404, "Room not found!"));
    if (room.status === "Available") {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { $set: { room_change_request: req.body.room_id } },
        { new: true }
      );
      return res.status(200).json(updatedStudent);
    }
    return next(createError(400, "Room not available!"));
  } catch (error) {
    next(error);
  }
};

export const approveRequest = async (req, res, next) => {
  try {
    if (req.body.approved) {
      const student = await Student.findById(req.body.student_id);
      const room = await Room.findById(req.body.room_id);
      if (
        (room.room_type === "Single" && room.student_id.length >= 1) ||
        (room.room_type === "Double" && room.student_id.length >= 2)
      )
        return next(createError(400, "Room not available!"));
      if (room.student_id.includes(student._id))
        return next(createError(400, "Student already exists in this room!"));
      if (student.room_id !== "N/A") {
        const previousRoom = await Room.findById(student.room_id);
        const index = previousRoom.student_id.indexOf(student._id);
        if (index > -1) {
          previousRoom.student_id.splice(index, 1);
        }
        previousRoom.status = "Available";
        previousRoom.save();
      }
      student.room_id = student.room_change_request;
      student.room_change_request = "N/A";
      room.student_id.push(student._id);
      if (room.room_type === "Single") {
        room.status = "Occupied";
      } else if (room.room_type === "Double") {
        room.status = room.student_id.length === 2 ? "Occupied" : "Available";
      }
      student.save();
      room.save();
      res
        .status(200)
        .json({ room_id: room._id, student_id: student._id, approved: true });
    } else {
      const student = await Student.findById(req.body.student_id);
      student.room_change_request = "N/A";
      student.save();
      res.status(200).json({ student_id: student._id, approved: false });
    }
  } catch (error) {
    next(error);
  }
};

export const getRoomRequests = async (req, res, next) => {
  try {
    const requestedStudents = await Student.find({
      room_change_request: { $ne: "N/A" },
    });
    if (!requestedStudents || !requestedStudents.length)
      return next(createError(404, "Students not found!"));
    console.log(requestedStudents);

    const date = new Date();
    let obj = {};
    const response = [];
    console.log(requestedStudents);
    const month = getMonthName(date.getMonth());
    const feeSlip = await Fee.findOne({ month });
    for (let student of requestedStudents) {
      const room = await Room.findById(student.room_change_request);
      const voucher = await Voucher.findOne({
        fee_id: feeSlip._id,
        student_id: student._id,
      });
      obj.student_id = student._id;
      obj.room_id = room._id;
      obj.email = student.email;
      obj.fee_status = voucher?.status || "N/A";
      obj.room_no = room.room_no;
      obj.room_price = room.price;
      response.push({ ...obj });
    }
    if (!response.length)
      return next(createError(404, "Requested students not found!"));
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const removeStudentFromRoom = async (req, res, next) => {
  try {
    const student = await Student.findById(req.body.student_id);
    if (!student) return next(createError(404, "Student not found!"));
    const room = await Room.findById(req.params.id);
    if (!room) return next(createError(404, "Room not found!"));
    student.room_id = "N/A";
    const index = room.student_id.indexOf(student._id);
    if (index > -1) room.student_id.splice(index, 1);
    student.save();
    room.save();
    console.log(index);
    res.status(200).json("Student removed successfully!");
  } catch (error) {
    next(error);
  }
};

export const addStudentInRoom = async (req, res, next) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) return next(createError(404, "Student not found!"));
    const room = await Room.findById(req.params.id);
    if (!room) return next(createError(404, "Room not found!"));
    if (room.status === "Available") {
      student.room_id = room._id;
      room.student_id.push(student._id);
      if (
        room.room_type === "Single" ||
        (room.room_type === "Double" && room.student_id.length >= 2)
      )
        room.status = "Occupied";
      student.save();
      room.save();
      res.status(200).json("Student added successfully!");
    } else {
      next(createError(400, "Room not available!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return next(createError(404, "Room not found!"));
    const { ...others } = room._doc;
    others.student = [];
    if (room.student_id.length > 0) {
      for (let i in room.student_id) {
        const student = await Student.findById(room.student_id[i]);
        others.student[i] = {
          id: room.student_id[i],
          name: student.name,
          email: student.email,
        };
      }
    }
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};
