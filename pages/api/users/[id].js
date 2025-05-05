import { connectToDB } from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  await connectToDB();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { fullName, email, phone, profilePicture } = req.body;
      if (!fullName || !email || !profilePicture) {
        return res.status(400).json({
          message: "Full name, email, and profile picture are required.",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { fullName, email, phone, profilePicture },
        { new: true }
      );

      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });

      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error updating user", error: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser)
        return res.status(404).json({ message: "User not found" });

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error deleting user", error: err.message });
    }
  }

  res.setHeader("Allow", ["PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
