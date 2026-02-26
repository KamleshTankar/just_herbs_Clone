import mongoose from "mongoose";
import userslist from "../../models/Usermodel.js";
import Product from "../../models/Productmodel.js";


export const addproduct = async (req, res) => {
  const {productId, quantity, userId } = req.body;

  try {
    if (!productId || !quantity || !userId) {
      return res.status(400).json({ message: "Product ID, quantity, and user ID are required" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0", });
    }

    const user = await userslist.findById({ _id: userId });
    
    if (!user) { return res.status(404).json({ message: "User not found" }); }
    
    // ✅ Fetch prices from DB and calculate total
    const product = await Product.findById(productId);

    if (!product) { return res.status(404).json({ message: "Product not found" }); }

    if (!user.cartItems) { user.cartItems = []; }
    
    
    const cartIndex = user.cartItems.findIndex((item) => item.product.toString() === productId);

      if (cartIndex > -1) {
        user.cartItems[cartIndex].quantity += quantity;
      } else {
        user.cartItems.push({ product:productId, quantity });
      }

      const updatedUser = await user.save();
    res.status(200).json({ cartItems: updatedUser.cartItems });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const increseQuantity = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { productId } = req.body;

    if (!productId) { return res.status(400).json({ message: "Product ID is required" }); }
    
    const User = await userslist.findById(userId);

    if (!User) { return res.status(404).json({ message: 'Cart not found' }); }
    
    if (!User.cartItems || User.cartItems.length === 0) { return res.status(404).json({ message: 'Cart is empty' }); }
    
    const itemIndex = User.cartItems.findIndex((i) => i.product.toString() === productId);
      
    if (itemIndex === -1) { return res.status(404).json({ message: "Product not in cart" }); }

    User.cartItems[itemIndex].quantity += 1;
    
    await User.save();
    
    const updatedCart = User.cartItems[itemIndex];
    res.status(200).json({ message: 'Quantity increased', updatedCart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const decreseQuantity = async (req, res) => {
  
  try {
    const { id: _id } = req.params;
    const { productId } = req.body;

    if (!productId) { return res.status(400).json({ message: "Product ID is required" }); }
    
    const user = await userslist.findOne({ _id });

    if (!user) { return res.status(404).json({ message: "user not found" }); } 

    if(!user.cartItems || user.cartItems.length === 0) { return res.status(404).json({ message: "Cart is empty" }); }

    const cartIndex = user.cartItems.findIndex((i) => i.product.toString() === productId);

    if (cartIndex === -1) { return res.status(404).json({ message: "Product not found in cart" }); }

      if (user.cartItems[cartIndex].quantity > 1) {
        user.cartItems[cartIndex].quantity -= 1;
      } else {
        // Remove item if quantity is 0
        user.cartItems.splice(cartIndex, 1);
      }

    await user.save();
    const updatedCart = user.cartItems[cartIndex];
    res.status(200).json({ message: "Quantity decrese", updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCartproduct = async (req, res) => {
  
  try {
    const { id: _id } = req.params;
    const { productid } = req.body;

    const user = await userslist.findOne({ _id });

      const cartIndex = user.cartItems.findIndex((i) => i.product.toString() === productid);

      if (cartIndex < 0) {
        return res.status(400).json({ message: "Product not found in cart" });
      }

      const item = user.cartItems[cartIndex];

      if (item) {
        // Remove item if quantity is 1
        user.cartItems.splice(cartIndex, 1);
      }

    await user.save();
    res.status(200).json({ message: "cart Deleted", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllCarts = async (req, res) => {
  const { id: userId } = req.body;

  try {
        if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
    }
    
      const User = await userslist.findOne({ _id:userId }).populate("cartItems.product");
      
        if (!User) {
          return res.status(404).json({ message: "User not found" });
    }
    
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

