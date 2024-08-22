import request from "supertest";
import { app } from "../index.js";
import Announcement from "../models/Announcement.js";
import jwt from "jsonwebtoken";

describe("Announcement Endpoints", () => {
  let token;

  beforeEach(async () => {
    // Create a test user and generate a JWT token
    token = jwt.sign({ id: "testUserId" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Create some initial data
    await Announcement.create({
      title: "Initial Announcement",
      date: new Date(),
      description: "This is an initial announcement",
    });
  });

  it("should get all announcements", async () => {
    const res = await request(app)
      .get("/api/announcements/all")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should create a new announcement", async () => {
    const res = await request(app)
      .post("/api/announcements/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Announcement",
        date: new Date(),
        description: "This is a test announcement",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Test Announcement");
  });

  it("should delete an announcement", async () => {
    const announcement = await Announcement.findOne({
      title: "Initial Announcement",
    });

    const res = await request(app)
      .delete(`/api/announcements/remove/${announcement._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "message",
      "Announcement deleted successfully!"
    );
  });
});
