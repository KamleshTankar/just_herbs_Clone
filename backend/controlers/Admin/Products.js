import mongoose from "mongoose";

import products from "../../models/Productmodel.js";

export const Getallproducts = async (req, res) => {
    try {
        const allProducts = await products.find();
        const allProductDetails = [];
        allProducts.forEach((product) => {
          allProductDetails.push({
            _id: product._id,
            Title: product.Title,
            Category: product.Category,
            Image:product.Image,
            price: product.price,
            Description: product.Description,
            Quntity: product.Quantity,
            joinedOn: product.updatedOn,
          });
        });
        res.status(200).json(allProductDetails);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};

export const Addproduct = async (req, res) => {
  const { Title, Category, Image, Description, price, Quantity } = req.body;
  try {
    const existingproduct = await products.findOne({ Title });
    if (existingproduct) {
      return res.status(404).json({ message: "Product already Exist." });
    }

    const newproduct = await products.create({
      Title,
      Category,
      Image,
      Description,
      price,
      Quantity,
    });
    
    res.status(200).json({ NEWProduct: newproduct});
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const Updateproduct = async (req, res) => {
    const { _id } = req.body;
    const { Title, Category, Image, Description, price, Quantity } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Product unavailable...");
    }
  
    try {
      const updatedProduct = await products.findByIdAndUpdate(
        _id,
        { $set: {Title:Title, Category:Category, Image:Image, Description:Description, price:price, Quantity:Quantity } },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
};

export const Deleteproduct = async (req, res) => {
  const { _id } = req.body;

  try {
    const Product = await products.findOne({ _id });

    if (!Product) {
      res.status(201).json("Product unavailable..." );
    } else {
      const Result = await products.deleteOne({ _id });
      res.status(200).json({ Result, Product });
    }
    
  } catch (error) {
    res.status(400).json("Something went worng...");
  }
};