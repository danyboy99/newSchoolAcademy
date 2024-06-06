import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.google.com",
  port: 587,
  auth: {
    user: "danyboy99official@gmail.com",
    pass: "D@nilo99",
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

    console.log("message sent:", info.messageId);
    return info.messageId;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
