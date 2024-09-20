import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ClinicManagementAapp");
    // await mongoose.connect("mongodb://mongo:27017/ClinicManagementAapp"); to use it when deploying with docker
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

