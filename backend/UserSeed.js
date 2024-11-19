import connectDatabase from "./db/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // Load environment variables

const UserRegister = async () => {
  try {
    await connectDatabase(); // Ensure connection to the correct database

    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
    console.log("Admin user created in qrcode database");
  } catch (err) {
    console.error("Error creating admin user:", err);
  } finally {
    process.exit(); // Close the process after seeding
  }
};

UserRegister();
