import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    Firstname: { type: String, required: true, trim: true },
    Lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    number: { type: Number },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    cartItems: [{
        productid: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: Number, default: 1 },
      }],
    myorders: [{type:mongoose.Schema.Types.ObjectId, ref:"Orders"}],
    joinedOn: { type: Date, default: Date.now },
  },
  { timestamps: true });

// Ensure only one default address
userSchema.pre('save', function(next) {
  const defaultAddresses = this.addresses.filter(addr => addr.isDefault);
  if (defaultAddresses.length > 1) {
    return next(new Error('Only one address can be marked as default.'));
  }
  next();
});

export default mongoose.model("User", userSchema);

