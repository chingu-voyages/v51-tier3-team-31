import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports

  authMethod: "plain",

  auth: {
    user: process.env.GOOGLE_ACCOUNT_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const mailOptions = {
    from: process.env.GOOGLE_ACCOUNT_EMAIL,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
