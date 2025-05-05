import { sendEmail } from "../../../lib/mailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const html = `
      <h2>New User Created</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><a href="http://localhost:3000/admin/login">Go to Admin Panel</a></p>
    `;

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
