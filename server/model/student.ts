import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
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
      unique: true,
    },
    password: {
      type: String,
    },
    class: {
      type: String,
      required: true,
    },
    passportImg: {
      type: String,
    },
    regNumber: {
      type: String,
      required: true,
      unique: true,
    },
    Notifications: {
      type: [Object],
    },
    restrictStatus: {
      type: Boolean,
    },
    attendance: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("student", studentSchema);

export default student;
