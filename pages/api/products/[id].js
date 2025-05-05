import { connectToDB } from "../../../lib/db";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectToDB();

  if (req.method === "GET") {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  }

  if (req.method === "PUT") {
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await Product.findByIdAndDelete(id);
    return res.status(204).end();
  }

  return res.status(405).json({ message: "Method not allowed" });
}
