import { disconnect } from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import connection from "../database/connection.js";
import Student from "../models/Student.js";
import Room from "../models/Room.js";
import Fee from "../models/Fee.js";
import Voucher from "../models/Voucher.js";
import Announcement from "../models/Announcement.js";
import Suggestion from "../models/Suggestion.js";

dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected...");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

const generateStudents = (num) => {
  const students = [];
  const colleges = [
    "Bahria University",
    "FAST University",
    "Karachi University",
    "NED University",
  ];
  const courses = ["Social Sciences", "Engineering", "Humanitarian", "Medical"];
  const hostels = ["Hostel1", "Hostel2", "Hostel3", "Hostel4"];

  for (let i = 0; i < num; i++) {
    const student = new Student({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      //   profile_url: faker.image.avatar(),
      college: faker.helpers.arrayElement(colleges),
      course: faker.helpers.arrayElement(courses),
      hostel: faker.helpers.arrayElement(hostels),
      room_id: "N/A",
      room_change_request: "N/A",
      room_booked_until: faker.date.future(),
    });
    students.push(student);
  }
  console.log(faker.person.fullName());
  return students;
};

const generateRooms = (num) => {
  const rooms = [];
  const roomTypes = ["Single", "Double"];
  const statuses = ["Available", "Occupied", "Maintenance"];

  for (let i = 0; i < num; i++) {
    const room = new Room({
      student_id: [],
      room_no: faker.number.int({ min: 100, max: 999 }),
      room_type: faker.helpers.arrayElement(roomTypes),
      status: faker.helpers.arrayElement(statuses),
      price: faker.number.int({ min: 1000, max: 5000 }),
    });
    rooms.push(room);
  }
  return rooms;
};

const generateFees = (num) => {
  const fees = [];
  const months = [
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
  ];

  for (let i = 0; i < num; i++) {
    const fee = new Fee({
      month: faker.helpers.arrayElement(months),
      year: faker.number.int({ min: 2020, max: 2024 }),
      amount: faker.number.int({ min: 1000, max: 5000 }),
      due_date: faker.date.future(),
      consumer_id: faker.string.uuid(),
    });
    fees.push(fee);
  }
  return fees;
};

const generateVouchers = async (num) => {
  const vouchers = [];
  const statuses = ["Paid", "Unpaid", "Pending"];
  const students = await Student.find({});
  const fees = await Fee.find({});

  for (let i = 0; i < num; i++) {
    const voucher = new Voucher({
      fee_id: faker.helpers.arrayElement(fees)._id,
      student_id: faker.helpers.arrayElement(students)._id,
      amount: faker.number.int({ min: 1000, max: 5000 }),
      status: faker.helpers.arrayElement(statuses),
    });
    vouchers.push(voucher);
  }
  return vouchers;
};

const generateAnnouncements = (num) => {
  const announcements = [];

  for (let i = 0; i < num; i++) {
    const announcement = new Announcement({
      title: faker.lorem.sentence(),
      date: faker.date.past(),
      description: faker.lorem.paragraph(),
    });
    announcements.push(announcement);
  }
  return announcements;
};

const generateSuggestions = (num) => {
  const suggestions = [];

  for (let i = 0; i < num; i++) {
    const suggestion = new Suggestion({
      title: faker.lorem.sentence(),
      date: faker.date.past(),
      description: faker.lorem.paragraph(),
    });
    suggestions.push(suggestion);
  }
  return suggestions;
};

const insertData = async () => {
  connection();

  try {
    await Student.deleteMany();
    await Room.deleteMany();
    await Fee.deleteMany();
    await Voucher.deleteMany();
    await Announcement.deleteMany();
    await Suggestion.deleteMany();

    const students = generateStudents(100);
    const rooms = generateRooms(50);
    const fees = generateFees(50);
    const announcements = generateAnnouncements(20);
    const suggestions = generateSuggestions(30);
    const vouchers = await generateVouchers(200);

    await Student.insertMany(students);
    await Room.insertMany(rooms);
    await Fee.insertMany(fees);
    await Announcement.insertMany(announcements);
    await Suggestion.insertMany(suggestions);
    await Voucher.insertMany(vouchers);

    await disconnect();

    console.log("Data successfully inserted!");
    process.exit();
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  }
};

insertData();
