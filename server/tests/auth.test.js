import request from "supertest";
import { app } from "../index.js";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

describe("Auth Endpoints", () => {
  let token;

  beforeEach(async () => {
    // Create a test user and generate a JWT token
    const student = await Student.create({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
      college: "Bahria University",
      course: "Engineering",
      hostel: "Hostel1",
      room_id: "N/A",
      room_change_request: "N/A",
      room_booked_until: new Date(),
    });
    token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  it("should sign up a new student", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "New User",
      email: "newuser@example.com",
      password: "123456",
      college: "Bahria University",
      course: "Engineering",
      hostel: "Hostel1",
      room_id: "N/A",
      room_change_request: "N/A",
      room_booked_until: new Date(),
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Student has been created successfully!");
  });

  it("should login a student", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login a student with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Wrong credentials!");
  });
});
