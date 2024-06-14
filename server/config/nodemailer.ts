import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
console.log("envFile:", {
  user: process.env.user,
  pass: process.env.pass,
});
const transporter = nodemailer.createTransport({
  host: "smtp.google.com",
  port: 587,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

export const sendMail = async (Option: any) => {
  try {
    const info = await transporter.sendMail({
      from: Option.from,
      to: Option.to,
      subject: Option.subject,
      text: Option.text,
    });

    console.log("message sent:", info);
    return info.messageId;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
