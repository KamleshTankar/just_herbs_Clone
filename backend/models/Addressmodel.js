import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    House: { type: String },
    Street: { type: String },
    Landmark: { type: String },
    Zip: { type: Number },
    City: { type: String },
    State: { type: String },
    Country: { type: String },
    Type: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
    Default: { type: Boolean, default: true },
});


export default mongoose.model('Address', addressSchema);