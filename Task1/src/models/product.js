import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  sku: Number,
  name: String,
  type: String,
  price: Number,
  upc: String,
  category: [{ id: String, name: String }],
  shipping: Number,
  description: String,
  manufacturer: String,
  model: String,
  url: String,
  image: String,
});

module.exports = mongoose.model("Products", ProductSchema);
