import { transporter } from "./Email.config.js";
import {
  Verification_Email_Template,
  Welcome_Email_Template
} from "../libs/EmailTemplate.js";

export const SendVerificationCode = async (email, otp) => {
  await transporter.sendMail({
    from: '"SnapWall" snapwall.official@gmail.com',
    to: email,
    subject: "Verify your email",
    html: Verification_Email_Template.replace("{verificationToken}", otp),
  });
};

export const WelcomeEmail = async (email, username) => {
  await transporter.sendMail({
    from: '"SnapWall" snapwall.official@gmail.com',
    to: email,
    subject: "Welcome to SnapWall",
    html: Welcome_Email_Template.replace("{name}", username),
  });
};


export const SendPromotionEmail = async ({
  fullName,
  email,
  contact,
  address,
  message,
}) => {
  await transporter.sendMail({
    from: '"SnapWall Promotions" snapwall.official@gmail.com',
    to: "makthalavignesh18@gmail.com", // admin email
    subject: "📢 New Promotion Request",
    html: `
      <h2>New Promotion Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};
