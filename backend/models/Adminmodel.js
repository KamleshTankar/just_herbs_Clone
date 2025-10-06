import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("Admin", adminSchema);