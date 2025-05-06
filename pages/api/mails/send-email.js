// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   const { to, subject, text } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//     });

//     res.status(200).json({ message: "Email sent" });
//   } catch (error) {
//     console.error("Email error:", error);
//     res.status(500).json({ message: "Email failed" });
//   }
// }
