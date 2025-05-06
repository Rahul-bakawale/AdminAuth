import { sendEmail } from "../../../lib/mailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await sendEmail({
      subject: `New User Created: ${fullName}`,
      html,
    });

    return res
      .status(200)
      .json({ message: "Email sent to admin successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to send email", error: err.message });
  }
}
