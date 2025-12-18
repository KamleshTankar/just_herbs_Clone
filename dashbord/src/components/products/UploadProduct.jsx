import React, { useState, useCallback } from 'react'

import { FaCloudUploadAlt } from "react-icons/fa";

import Banner from '../Banner'
import DragDropUpload from "./DragDropUploads";

const UploadProduct = () => {
  const [Product, setProducts] = useState({
    title: '',
    category: '',
    subCategory: '',
    price: '',
    quantity: '',
    description: '',
    size: '',
    tags: '',
    dimensions: '',
    weight: '',
    images: []
  });
  const [errors, setErrors] = useState({});
  
  const handleChange =useCallback((e) => {
      const { name, value } = e.target;
    setProducts((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
    },[]);

  // const handleImage = (e) => {
  //     setProducts((prev) => ({
  //       ...prev,
  //       images: [...prev.images, ...e.target.files],
  //     }));
  //   };

  const validate = useCallback(() => { 
    const newErrors = {};

    if (!Product.title) newErrors.title = "Product Title is required";
    if (!Product.category) newErrors.category = "Product Category is required";
    if (!Product.subCategory) newErrors.subCategory = "Product Sub Category is required";
    if (!Product.price) newErrors.price = "Product Price is required";
    if (!Product.quantity) newErrors.quantity = "Product Quantity is required";
    if (!Product.description) newErrors.description = "Product Description is required";
    if (!Product.size) newErrors.size = "Product Size is required";
    if (!Product.tags) newErrors.tags = "Product tags is required";
    if (!Product.dimensions) newErrors.dimensions = "Product Dimensions is required";
    if (!Product.weight) newErrors.weight = "Product Weight is required";
    if (Product.images.length === 0) newErrors.images = "At least one image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  },[Product]);
  
  const AddProduct = useCallback((e) => {
    e.preventDefault();

    if (!validate()) return;
    
        console.log(Product);
  },[Product, validate]);

  return (
    <>
      <Banner page={"Upload Product"} />
      <form onSubmit={AddProduct} className="py-6 space-y-4">
        <section className="w-[96%] mx-auto bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-3">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              placeholder="Product Name"
              value={Product.title}
              onChange={handleChange}
              error={errors.title}
              className="input"
            />

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Product Description"
              value={Product.description}
              onChange={handleChange}
              className="input h-32 resize-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label htmlFor="category"> Category</label>
              <input
                name="category"
                placeholder="Category"
                value={Product.category}
                onChange={handleChange}
                className="input"
              />

              <label htmlFor="subCategory"> Sub Category</label>
              <input
                name="subCategory"
                placeholder="Sub Category"
                value={Product.subCategory}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                name="quantity"
                placeholder="Stock"
                min={0}
                value={Product.quantity}
                onChange={handleChange}
                className="input"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                min={0}
                value={Product.price}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid grid-cols-5 gap-3">
              <input
                name="size"
                placeholder="Size"
                value={Product.size}
                onChange={handleChange}
                className="input col-span-2"
              />
              <input
                name="tags"
                placeholder="Tags (comma separated)"
                value={Product.tags}
                onChange={handleChange}
                className="input col-span-3"
              />
            </div>

            <div className="grid grid-cols-5 gap-3">
              <input
                name="dimensions"
                placeholder="Dimensions"
                value={Product.dimensions}
                onChange={handleChange}
                className="input col-span-3"
              />
              <input
                name="weight"
                placeholder="Weight"
                value={Product.weight}
                onChange={handleChange}
                className="input col-span-2"
              />
            </div>
          </div>
        </section>

        <section className="w-[96%] mx-auto p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Media Files</h2>

          <DragDropUpload
            images={Product.images}
            setImages={(updater) =>
              setProducts((prev) => ({
                ...prev,
                images:
                  typeof updater === "function"
                    ? updater(prev.images)
                    : updater,
              }))
            }
          />

          <button
            type="submit"
            aria-label="upload the product and view"
            className=" w-full h-12 px-4 py-1 bg-blue-400 flex items-center justify-center gap-2"
          >
            <FaCloudUploadAlt /> PUBLISH AND VIEW
          </button>
        </section>
      </form>
    </>
  );
}

export default UploadProduct