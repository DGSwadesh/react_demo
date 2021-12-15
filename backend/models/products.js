import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String, },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema, "users");
