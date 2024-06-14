import mongoose, { Schema } from "mongoose";

const parentSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    mobileNumber: {
      type: Number,
      required: true,
    },
    childrenRegNumber: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const parent = mongoose.model("parent", parentSchema);

export default parent;
