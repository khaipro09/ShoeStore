import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = process.env.MONGO_URL;
console.log(db);
const initConnectToDB = async () => {
  try {
    mongoose.connect(db)
    .then(async () => {
      console.log('MongoDB connected successfully');
      await import("../../models/index.js");
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    throw error;
  }
};

export { initConnectToDB };
