import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "student" },
    studentRegnumber: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "parent" },
    paymentId: { type: String, required: true },
    paymentFlw_ref: { type: String, required: true },
    paymentTx_ref: { type: String, required: true, unique: true },
    paymentConfirmed: { type: Boolean, default: false },
    amount: { type: String, required: true },
    classPayedFor: { type: String, required: true },
    termPayedFor: { type: String, required: true },
    paymentCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const payment = mongoose.model("payment", paymentSchema);

export default payment;
