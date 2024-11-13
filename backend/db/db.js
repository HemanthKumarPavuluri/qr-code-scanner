import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (err) {
    console.log(err);
  }
};

export default connectDatabase;
