import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import users from "../../models/Adminmodel.js";
import customers from "../../models/Usermodel.js";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await customers.find().populate("addresses")
      .populate("cartItems.productid").populate("myorders");;
    const allUserDetails = [];
    allUsers.forEach((user) => {

      allUserDetails.push({
        _id: user._id,
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        email: user.email,
        gender: user.gender,
        address: user.addresses,
        number: user.number,
        carts: user.cartItems,
        MyOrders: user.myorders,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const RemoveUser = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  };

  try {
const user = await customers.findById(_id);

    if (!user) {
      return res.status(404).json({ acknowledged: true, message: "User not found", deletedCount: 0, _id });
    };

    let addressResult = { deletedCount: 0, acknowledged: true };
    if (user.addresses && user.addresses.length > 0) {
      const Address = mongoose.model("Address");
      addressResult = await Address.deleteMany({_id: { $in: user.addresses }, });
    };

    const deleteResult = await customers.deleteOne({ _id });

    res.status(200).json({ acknowledged: deleteResult.acknowledged, message: "User deleted successfully",
      deletedCount: deleteResult.deletedCount, addressDeletedCount: addressResult.deletedCount, });

    // const user = await customers.deleteOne({ _id });
    // const address = await mongoose.model('Address').deleteMany({ _id: { $in: user.addresses } });
    // const result = { user, address };
    
    // res.status(200).json({ acknowledged: result.acknowledged, message: "User deleted successfully", deletedCount: 1, });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};