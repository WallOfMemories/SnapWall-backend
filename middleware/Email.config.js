import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "snapwall.official@gmail.com",
    pass: "sdlf gruj bjfy qnxf",
  },
});
