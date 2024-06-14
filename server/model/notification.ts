import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const notifications = mongoose.model("notification", notificationSchema);

export default notifications;
