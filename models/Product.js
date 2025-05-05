import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    category_id: { type: String, required: true },
    image: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
