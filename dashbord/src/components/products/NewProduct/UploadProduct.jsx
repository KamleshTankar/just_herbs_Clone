import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { resetProductState, AddProduct } from "../../../redux-toolkit/Slice/ProductSlice";

import { FaCloudUploadAlt, FaTruckLoading } from "react-icons/fa";

import Banner from '../../Banner'
import DragDropUpload from "./DragDropUploads";
// import { useNavigate } from 'react-router';

const UploadProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [Product, setProducts] = useState({
    title: '',
    category: '',
    subCategory: '',
    price: '',
    stock: '',
    description: '',
    size: [],
    weight: '',
  });
  const [sizeInput, setSizeInput] = useState("");
  const [loading, setLoading] = useState(false);  

  const dispatch = useDispatch();
  // const navigator = useNavigate();
  const { success } = useSelector((state) => state.Product);
  // const { user } = useSelector((state) => state.Auth);
  
  useEffect(() => {
    if (success) {
       setProducts({
         title: "",
         category: "",
         subCategory: "",
         description: "",
         price: "",
         stock: "",
         size: "",
         tags: [],
         dimensions: {},
         weight: "",
         images:[]
       });

       setTimeout(() => dispatch(resetProductState()), 2000);
    }
  }, [success, dispatch]);
  
  const handleSizeKeyDown = (e) => {
    if (e.key === "Enter" && sizeInput.trim()) {
      e.preventDefault();

      if (Product.size.includes(sizeInput.trim())) return;

      setProducts((prev) => ({
        ...prev,
        size: [...prev.size, sizeInput.trim()],
      }));

      setSizeInput("");
    }
  };

  const removeSize = (value) => {
    setProducts((prev) => ({
      ...prev,
      size: prev.size.filter((s) => s !== value),
    }));
  };


  const handleChange =useCallback((e) => {
      const { name, value } = e.target;
    setProducts((prev) => ({ ...prev, [name]: value }));
  }, []);

  const NewProduct = useCallback((e) => {
    e.preventDefault();
    if (!productImage) { 
      alert("Please upload a product image.");
      return;
    }
    try {
      setLoading(true);
      
      const formdata = new FormData();
      formdata.append("title", Product.title);
      formdata.append("category", Product.category);
      formdata.append("subCategory", Product.subCategory);
      formdata.append("price", Product.price);
      formdata.append("stock", Product.stock);
      formdata.append("description", Product.description);
      Product.size.forEach((size) => formdata.append("size[]", size));
      formdata.append("weight", Product.weight);
      formdata.append("image", productImage);
      dispatch(AddProduct(formdata));
      alert("Product uploaded successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product. Please try again.");
    } finally {
      setLoading(false);
    }

    // if (user) {
    //     setTimeout(() => {
    //     dispatch(AddProduct(Product));
    //     setLoading(false);
    //   }, 1000);
    // } else {
    //   setTimeout(() => {
    //     navigator("/login");
    //   }, 500);
    //   }
  },[Product, productImage, dispatch]);

  return (
    <>
      <Banner page={"Upload Product"} />
      <form onSubmit={NewProduct} className="py-6 space-y-4">
        <section className="w-[96%] mx-auto bg-white rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-3">
            <label htmlFor="title">Title</label>
            <input name="title" placeholder="Product Name" value={Product.title}
              onChange={handleChange} required className="input" />

            <label htmlFor="description">Description</label>
            <textarea name="description" placeholder="Description" value={Product.description}
              onChange={handleChange} className="input h-32 resize-none" required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
              <label htmlFor="category"> Category</label>
              <input name="category" placeholder="Category" value={Product.category}
                onChange={handleChange} id='category' className="input" required />
              </div>

              <div>
              <label htmlFor="subCategory"> Sub Category</label>
              <input name="subCategory" id='subCategory' placeholder="Sub Category" value={Product.subCategory}
                onChange={handleChange} className="input" required />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
              <label htmlFor="stock">Stock</label>
              <input type="number" name="stock" id='stock'
                  placeholder="Stock" min={0} value={Product.stock}
                  onChange={handleChange} className="input" required />
              </div>

              <div>
              <label htmlFor="price">Price</label>
                <input type="number" id='price' name="price" placeholder="Price"
                  min={0} value={Product.price} onChange={handleChange}
                  className="input" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
              <label htmlFor="size"> Size</label>
              <input name="size" id='size' placeholder="Size ( e.g., s,m or 2,4,6 )" value={sizeInput}
                  onChange={(e) => { setSizeInput(e.target.value) }} onKeyDown={handleSizeKeyDown} className="input col-span-2" />
                
                <div className="flex flex-wrap gap-2 mt-2">
                {Product.size.map((s) => (
      <span key={s} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 text-sm" >
        {s}
        <button type="button" onClick={() => removeSize(s)} className="text-red-500 font-bold" >
          ×
        </button>
      </span>
                  ))}
                  </div>
              </div>

              <div>
                  <label htmlFor="weight"> Weight Value</label>
                  <input type="text" name="weight" placeholder='Weight(e.g., 20kg or 50ml)' value={Product.weight}
                    onChange={handleChange} className='input' required/>
              </div>
            </div>

          </div>
        </section>

        <section className="w-[96%] mx-auto p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Media Files</h2>

          <DragDropUpload
            image={productImage}
            setImage={setProductImage}
            preview={previewImage}
            setPreview={setPreviewImage}
            // setImages={(updater) =>
            //   setProducts((prev) => ({
            //     ...prev,
            //     images:
            //       typeof updater === "function"
            //         ? updater(prev.images)
            //         : updater,
            //   }))
            // }
          />

          <button type="submit" disabled={loading} aria-label="upload the product and view"
            className=" w-full h-12 mt-3 px-4 py-1 bg-blue-400 flex items-center justify-center gap-2" >
          { loading ? <FaTruckLoading className=' text-2xl hover:text-white' /> : <FaCloudUploadAlt className='text-2xl hover:text-white' /> }
          { loading ? "UPLOADING..." : "PUBLISH AND VIEW" }
          </button>
        </section>
      </form>
    </>
  );
}

export default UploadProduct