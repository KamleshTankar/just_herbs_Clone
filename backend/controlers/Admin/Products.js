import mongoose from "mongoose";

import products from "../../models/Productmodel.js";

export const Getallproducts = async (req, res) => {
    try {
        const allProducts = await products.find();
        const allProductDetails = [];
        allProducts.forEach((product) => {
          allProductDetails.push({
            _id: product._id,
            title: product.title,
            category: product.category,
            subCategory: product.subCategory,
            thumbnail: product.thumbnail,
            image:product.images,
            price: product.price,
            weight: product.weight,
            stock: product.stock,
            size: product.size,
            description: product.description,
            quantity: product.quantity,
            joinedOn: product.updatedOn,
          });
        });
        res.status(200).json(allProductDetails);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
};

export const GetSingleproduct = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Product unavailable...");
  }
  try {
    const product = await products.findById(_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Addproduct = async (req, res) => {
  const { title, category, subCategory, description, 
    price, stock, size, weight } = req.body;

  try {
        let thumbnail = {};
          const file = req.files.images[0];
          thumbnail = {
            name: file.originalname,
            path: file.filename,
          };
      
    const images = req.files.images.map((file) => ({
      name: file.originalname,
      path: file.filename,
    }));

    if (!title || !category || price === undefined) {
          return res.status(400).json({
            message: "Title, category, and price are required",
          });
    }
    
    const ExistingProduct = await products.findOne({ title });
    if (ExistingProduct) {
      return res.status(409).json({ message: "Product already Exist." });
    }

    const NewProduct = await products.create({
      title,
      category,
      subCategory,
      thumbnail,
      images,
      description,
      price,
      stock,
      size,
      weight,
    });
    
    res.status(201).json({ newProduct: NewProduct});
  } catch (error) {
    console.error("AddProduct error:", error);
    res.status(500).json({ message:error.message });
  }
};

export const Updateproduct = async (req, res) => {
    const { _id } = req.body;
    const { title, category, subCategory, description, price, stock } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Product unavailable...");
    }
  
  try {
          // const Images = req.files.images.map((file) => ({
          //   name: file.originalname,
          //   path: file.filename,
          // }));
    
      const updatedProduct = await products.findByIdAndUpdate(
        _id,
        { $set: {title, category, subCategory, description, price, stock } },
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