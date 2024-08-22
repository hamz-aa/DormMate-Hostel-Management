import { disconnect } from "mongoose";
import { genSalt, hash } from "bcrypt";
import Student from "../models/Student.js";
import connection from "../database/connection.js";
import dotenv from "dotenv";

dotenv.config();

async function seedAdmin() {
  // Connect to the database
  //   await connect("mongodb://localhost/your-database", {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });

  connection();

  // Check if admin already exists
  const existingAdmin = await Student.findOne({ isAdmin: true });

  if (!existingAdmin) {
    // Create admin credentials
    const adminCredentials = {
      name: "admin",
      email: "admin@mail.com",
      password: "admin",
      isAdmin: true,
      // Add other fields as needed
    };

    // Hash the admin password
    const salt = await genSalt();
    const hashedPassword = await hash(adminCredentials.password, salt);
    adminCredentials.password = hashedPassword;

    // Create admin user
    const admin = new Student(adminCredentials);
    await admin.save();

    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }

  // Close the database connection
  await disconnect();
}

// Execute the admin seeder
seedAdmin()
  .then(() => {
    console.log("Admin seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding admin:", err);
    process.exit(1);
  });
