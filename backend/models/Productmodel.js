import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  Title: { type: String, required: true },
  // Image: { type: String, required: true },
  Category: { type: String, required: true },
  Sub_Category: { type: String },
  Image: { type: String },
  Images: [{ type: String }],
  Description: { type: String },
  price: { type: Number, required: true },
  Quantity: { type: Number, default: 10 },
  updatedOn: { type: Date, default: Date.now },
});

export default mongoose.model("Products", productSchema);
