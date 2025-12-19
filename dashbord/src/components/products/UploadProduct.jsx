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
    description: {},
    size: '',
    tags: [],
    dimensions: '',
    weight: '',
    images: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);  
  
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
    setLoading(true);

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
              <div>
              <label htmlFor="category"> Category</label>
              <input
                name="category"
                placeholder="Category"
                value={Product.category}
                onChange={handleChange}
                className="input"
                />
                </div>

              <div>
              <label htmlFor="subCategory"> Sub Category</label>
              <input
                name="subCategory" id='subCategory'
                placeholder="Sub Category"
                value={Product.subCategory}
                onChange={handleChange}
                className="input"
                />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number" name="quantity" id='quantity'
                placeholder="Stock"
                min={0}
                value={Product.quantity}
                onChange={handleChange}
                className="input"
                />
              </div>

              <div>
              <label htmlFor="price">Price</label>
              <input
                type="number" id='price' name="price" placeholder="Price" min={0}
                value={Product.price} onChange={handleChange} className="input" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
              <label htmlFor="size"> Size</label>
              <input name="size" id='size' placeholder="Size" value={Product.size}
                onChange={handleChange} className="input col-span-2" />
              </div>

              <div>
              <label htmlFor="tags"> Tags</label>
                <input name="tags" id='tags' placeholder="Tags (comma separated)"
                value={Product.tags} onChange={handleChange} className="input col-span-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="dimensions"> Dimensions</label>
              <input name="dimensions" placeholder="Dimensions" value={Product.dimensions}
                onChange={handleChange} id='dimensions' className="input col-span-3" />
              </div>

              <div>
                <label htmlFor="weight"> Weight</label>
              <input name="weight" placeholder="Weight" value={Product.weight}
                onChange={handleChange} id='weight' className="input col-span-2" />
              </div>
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
            className=" w-full h-12 mt-3 px-4 py-1 bg-blue-400 flex items-center justify-center gap-2"
          >
          {loading ? "loading":<FaCloudUploadAlt /> 'PUBLISH AND VIEW'}
          </button>
        </section>
      </form>
    </>
  );
}

export default UploadProduct