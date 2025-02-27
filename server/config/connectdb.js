import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Please provide Mongodb uri in dotenv file");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("Error in connecting to DB" + error);   
    process.exit(1);
  }
}

export default connectDB;
