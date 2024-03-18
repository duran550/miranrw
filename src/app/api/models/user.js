import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: String,
    email: String,
    password: String,
    role: Number
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;