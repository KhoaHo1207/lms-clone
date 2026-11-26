import nodemailer from "nodemailer";
import { ENV } from "./env.js";

const transporter = nodemailer.createTransport({
  host: ENV.BREVO_SMTP_HOST,
  port: Number(ENV.BREVO_SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: ENV.BREVO_SMTP_USER,
    pass: ENV.BREVO_SMTP_KEY,
  },
});

export default transporter;
