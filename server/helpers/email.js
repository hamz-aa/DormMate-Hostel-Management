import nodemailer from "nodemailer";
import crypto from "crypto";

export const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex");
};

export const sendVerificationEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Your OTP code is ${otp}. It will expire in 1 hour.`,
  };

  await transporter.sendMail(mailOptions);
};
