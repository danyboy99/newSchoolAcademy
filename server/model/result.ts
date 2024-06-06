import mongoose, { Schema } from "mongoose";

const resultSchema = new Schema(
  {
    studentRegNumber: {
      type: String,
      required: true,
    },
    classResult: {
      type: String,
      required: true,
    },
    termResult: {
      type: String,
      required: true,
    },
    result: [{ subject: String, score: Number, grade: String }],
  },
  {
    timestamps: true,
  }
);

const result = mongoose.model("result", resultSchema);

export default result;
