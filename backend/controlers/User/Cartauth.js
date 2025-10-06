import mongoose from "mongoose";
import userslist from "../../models/Usermodel.js";
import Product from "../../models/Productmodel.js";


export const addproduct = async (req, res) => {
  const { id: _id } = req.params;
  const { productid, quantity } = req.body.cartItems;

  try {
    const user = await userslist.findOne({ _id });

    // ✅ Fetch prices from DB and calculate total
            const Data = await Product.findById(productid);
            const name = Data.Title; // Assuming Title is the name of the product
            const price = Data.price; // Assuming price is the price of the product
            const image = Data.Image; // Assuming Image is the image of the product
            const Category = Data.Category; // Assuming Image is the image of the product
    
    const cartIndex = user.cartItems.findIndex((p) => p.productid.toString() === productid);

      if (cartIndex > -1) {
        user.cartItems[cartIndex].quantity += req.body.cartItems.quantity;
      } else {
        user.cartItems.push({ productid, name, Category, image, price, quantity });
      }

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const increseQuantity = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const User = await userslist.findOne({ _id });

    if (!User) {
      return res.status(404).json({ message: 'Cart not found' });
    } else {
      const productId = req.body.productid;
      const item = User.cartItems.findIndex(i => i.productid.toString() === productId);
      
      if (item > -1) {
        User.cartItems[item].quantity += 1;
      }
    }

    await User.save();
    res.status(200).json({ message: 'Quantity increased', User });
  } catch (error) {
    res.status(404).json({ message: 'Server error', error });
  }
};

export const decreseQuantity = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = await userslist.findOne({ _id });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    } else {
      const productId = req.body.productid;
      const cartIndex = user.cartItems.findIndex((i) => i.productid.toString() === productId);

      if (cartIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      const item = user.cartItems[cartIndex];

      if (item.quantity > 1) {
        user.cartItems[cartIndex].quantity -= 1;
      } else {
        // Remove item if quantity is 0
        user.cartItems.splice(cartIndex, 1);
      }
    }

    await user.save();
    res.status(200).json({ message: "Quantity decrese", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCartproduct = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = await userslist.findOne({ _id });

      const productId = req.body.productid;
      const cartIndex = user.cartItems.findIndex((i) => i.productid.toString() === productId);

      if (cartIndex === -1) {
        return res.status(400).json({ message: "Product not found in cart" });
      }

      const item = user.cartItems[cartIndex];

      if (item) {
        // Remove item if quantity is 1
        user.cartItems.splice(cartIndex, 1);
      }

    const updatedUser = await user.save();
    res.status(200).json({ message: "cart Deleted", updatedUser });
  } catch (error) {
    res.status(404).json({ message: "Server error", error });
  }
};

export const getAllCarts = async (req, res) => {
  const { id: _id } = req.params;
  
  try {
      const Users = await userslist.findOne({ _id }).populate("cartItems.productid");
      const allCartDetails = [];
      allCartDetails.push({
        cartproducts: Users.cartItems,
      });
      res.status(200).json(allCartDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

