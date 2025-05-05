import { connectToDB } from "../../../lib/db";
import AdminUser from "../../../models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  await connectToDB();

  const admin = await AdminUser.findOne({ email });
  if (!admin) return res.status(401).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { adminId: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({ token, message: "Login successful" });
}
