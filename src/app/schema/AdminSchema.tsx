import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }

});

export const Admin = mongoose.models.Admin ||  mongoose.model("Admin", AdminSchema);