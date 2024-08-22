import mongoose from "mongoose";
import { app } from "./index.js";
import request from "supertest";

let server;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await mongoose.connect(process.env.MONGO_URI);
  server = app.listen(8001, () => {
    console.log("Test server running on port 8001");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    // await collection.deleteMany();
  }
});
