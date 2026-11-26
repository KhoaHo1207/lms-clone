import transporter from "@/config/mail.js";
import { ENV } from "@/config/env.js";
import { authTemplate } from "@/templates/mail.template.js";

interface SendWelcomeEmailParams {
  email: string;
  fullName: string;
  otp: string;
  subject?: string;
}

export const sendWelcomeEmail = async ({
  email,
  fullName,
  otp,
  subject = `${ENV.MAIL_FROM_NAME} - Đăng ký tài khoản thành công!`,
}: SendWelcomeEmailParams): Promise<void> => {
  await transporter.sendMail({
    from: `${ENV.MAIL_FROM_NAME} <${ENV.MAIL_FROM_EMAIL}>`,
    to: email,
    subject,
    text: `Xin chào ${fullName}, mã xác minh của bạn là ${otp}`,
    html: authTemplate(fullName, otp),
  });
};
