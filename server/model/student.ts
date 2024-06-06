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
    },
    Notifications: {
      type: Array,
    },
    parentNumber: {
      type: Number,
    },
    parentEmail: {
      type: String,
    },
    parentPassword: {
      type: String,
      required: true,
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
