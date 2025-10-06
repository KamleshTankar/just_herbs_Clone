import mongoose from "mongoose";

const OrdersSchema = mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number,  default: 1 },
      price: { type: Number },
      Image: { type: String },
      Title: { type: String },
    },
  ],
  shippingAddress: {
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true, },
  },
  PaymentMethod: {
    type: String,
    // required: true,
    enum: ["Paypal", "Stripe", "GooglePay", "Paytam", "CreditCard", "DebitCard", "NetBanking", "CashOnDelivery"],
  },
  //  paymentIntentId: {
  //   type: String, // Stripe PaymentIntent ID
  // },
  // clientSecret: {
  //   type: String, // returned by Stripe to confirm the payment on frontend
  // }
  // PaymentResult: {
  //   id: String,
  //   status: String,
  //   update_time: String,
  //   email_address: String,
  // },
  taxprice: { type: Number, default: 0.0 },
  shippingcharges: { type: Number, default: 0.0 },
  totalAmount: { type: Number, default: 0.0 },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  status: {
    type: String,
    enum: ["pending", "processing", "transits", "delivered", "cancelled"],
    default: "pending",
  },
  trakingDetails: { type: String, default: "No updates yet" },
},
{ timestamps: true },
);

export default mongoose.model("Orders", OrdersSchema);

