import nodemailer from "nodemailer";

export async function sendEmail({ subject, html }) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "abhi@diginow.co.uk",
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
}
