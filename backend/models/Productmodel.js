import mongoose from "mongoose";
import slugify from "slugify";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    photos: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true, unique: true, maxlength: 150 },
  category: { type: String, required: true },
  subCategory: { type: String, required:true },
  images: { type: String },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 10, min: 0 },
  size: [{ type: String }],
  weight: { type: String },
  ratings: { average: { type: Number, default: 0, min: 0, max: 5 }, count: { type: Number, default: 0 } },
  reviews: [reviewSchema],
  isActive: { type: Boolean, default: true },
  slug: { type: String, required: true, unique: true }
},
  { timestamps: true}
);

// Prevent duplicate reviews per user
productSchema.pre("save", function (next) {
  const userIds = this.reviews.map(r => r.user.toString());
  if (new Set(userIds).size !== userIds.length) {
    return next(new Error("User can only review a product once"));
  }
  next();
});

// Auto-update ratings
productSchema.pre("save", function (next) {
  if (!this.isModified("reviews")) return next();

  const count = this.reviews.length;
  const average =
    count === 0
      ? 0
      : this.reviews.reduce((sum, r) => sum + r.rating, 0) / count;

  this.ratings.count = count;
  this.ratings.average = Number(average.toFixed(1));

  next();
});

productSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Products", productSchema);



