import mongoose from "mongoose";
import userslist from "../../models/Usermodel.js";
import Product from "../../models/Productmodel.js";


export const addproduct = async (req, res) => {
  const { productId, quantity, userId } = req.body;

  try {
    if (!productId || !quantity || !userId) {
      return res.status(400).json({ message: "Product ID, quantity, and user ID are required" });
    }

    const user = await userslist.findOne({ _id: userId });
    
    // ✅ Fetch prices from DB and calculate total
    const Data = await Product.findById({ _id: productId });
    const name = Data.title; // Assuming Title is the name of the product
    const price = Data.price; // Assuming price is the price of the product
    const image = Data.images; // Assuming Image is the image of the product
    const Category = Data.category;
    const SubCategory = Data.subCategory;
    
    const cartIndex = user.cartItems.findIndex((p) => p.productId.toString() === productId);
    console.log(cartIndex);

      if (cartIndex > -1) {
        user.cartItems[cartIndex].quantity += req.body.cartItems.quantity;
      } else {
        user.cartItems.push({ productId, name, Category, SubCategory, image, price, quantity });
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
      const productId = req.body.productId;
      const item = User.cartItems.findIndex(i => i.productId.toString() === productId);
      
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
      const productId = req.body.productId;
      const cartIndex = user.cartItems.findIndex((i) => i.productId.toString() === productId);

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
  const { id: userId } = req.body;

  try {
        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
    }
    
      const User = await userslist.findOne({ _id:userId }).populate("cartItems.productId");
      
        if (!User) {
          return res.status(404).json({ message: "User not found" });
    }
    console.log(User.cartItems);
    
        res.status(200).json( User.cartItems);
        
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment, title, photos } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // prevent duplicate review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id
    );

    if (alreadyReviewed)
      return res
        .status(400)
        .json({ success: false, message: "Already reviewed" });

    const review = {
      user: req.user.id,
      rating,
      comment,
      title,
      photos,
    };

    product.reviews.push(review);

    // update ratings
    product.ratings.count = product.reviews.length;
    product.ratings.average =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ success: true, message: "Review added" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

