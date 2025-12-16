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
            Quantity: product.Quantity,
            joinedOn: product.updatedOn,
          });
        });
        res.status(200).json(allProductDetails);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};

export const Addproduct = async (req, res) => {
  let { title, category, subCategory, description, price, quantity, size, tags, dimensions, weight } = req.body;
  try {
    const ExistingProduct = await products.findOne({ title });
    if (ExistingProduct) {
      return res.status(409).json({ message: "Product already Exist." });
    }

    let image = null;
        if (req.files?.image) {
          image = `/uploads/${req.files.image[0].filename}`;
        }

    let images = [];
        if (req.files?.images) {
          images = req.files.images.map(
            (file) => `/uploads/${file.filename}`
          );
        }

    let NewProduct = await products.create({
      title,
      category,
      subCategory,
      image,
      images,
      description,
      price,
      quantity,
      size,
      tags,
      dimensions,
      weight,
    });
    
    res.status(200).json({ NEWProduct: NewProduct});
  } catch (error) {
    res.status(500).json("Something went Wrong...");
  }
};

export const Updateproduct = async (req, res) => {
    const { _id } = req.body;
    const { Title, Category, Sub_Category, Image, Images, Description, price, Quantity } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Product unavailable...");
    }
  
    try {
      const updatedProduct = await products.findByIdAndUpdate(
        _id,
        { $set: {Title:Title, Category:Category, Sub_Category:Sub_Category, Image:Image, Images:Images, Description:Description, price:price, Quantity:Quantity } },
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