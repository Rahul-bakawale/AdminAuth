import { connectToDB } from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    try {
      const { fullName, email, phone, profilePicture } = req.body;

      if (!fullName || !email || !profilePicture) {
        return res.status(400).json({
          message: "Full name, email, and profile picture are required.",
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(409).json({ message: "Email already exists" });

      const newUser = new User({ fullName, email, phone, profilePicture });
      await newUser.save();

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
