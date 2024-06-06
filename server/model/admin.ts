import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passportImg: {
      type: String,
    },
    staffNum: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const admin = mongoose.model("admin", adminSchema);

export default admin;
