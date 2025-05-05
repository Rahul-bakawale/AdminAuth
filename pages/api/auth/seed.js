import { connectToDB } from "../../../lib/db";
import AdminUser from "../../../models/admin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await connectToDB();

  const existing = await AdminUser.findOne({ email: "abhi@diginow.co.uk" });
  if (existing) {
    console.log("Admin already exists:", existing);
    return process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const newAdmin = await AdminUser.create({
    email: "abhi@diginow.co.uk",
    password: hashedPassword,
  });
  res.status(200).json({ message: "Added Admin" });
}
