import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import users from "../../models/Usermodel.js";
import Addressm from "../../models/Addressmodel.js";

export const signup = async (req, res) => {
  const { Firstname, Lastname, email, password, number, gender,} = req.body;
  
  try {
    if (!Firstname || !Lastname || !email || !password || !number) {
      return res
        .status(401)
        .json({ message: "Please fill in all required fields." });
    }

    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(409).json({ message: "User already Exist." });
    }


    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await users.create({
      Firstname,
      Lastname,
      email,
      password: hashedPassword,
      gender,
      number,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email }).populate("addresses");
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

// export const getAllUsers = async (req, res) => {
//   try {
//     const allUsers = await users
//       .find()
//       .populate("addresses")
//       .populate("cartItems.productid")
//       .populate("myorders");
//     const allUserDetails = [];
//     allUsers.forEach((user) => {
//       allUserDetails.push({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         address: user.address,
//         number: user.number,
//         carts: user.cartproducts,
//         MyOrders: user.myorders,
//         joinedOn: user.joinedOn,
//       });
//     });
//     res.status(200).json(allUserDetails);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { Firstname, Lastname, gender, number, about,
    Country, Zip, House, Street, Landmark, City, State, Type, Default,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User unavailable...");
  }

  try {

        const newAddress = await Addressm.create({
          Country, Zip, House, Street, Landmark,
          City, State, Type, Default, });
        // if (newAddress) {
        //   await users.findByIdAndUpdate(_id, { $push: { addresses: newAddress } }, { new: true });
        // }

    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { Firstname: Firstname, Lastname: Lastname, gender: gender, about: about, address: [newAddress], number: number } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
