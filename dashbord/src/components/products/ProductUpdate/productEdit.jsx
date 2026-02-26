import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { GetSingleProduct, UpdateProduct } from "../../../redux-toolkit/Slice/ProductSlice";

import { FaCloudUploadAlt, FaTruckLoading } from "react-icons/fa";
import Banner from "../../Banner";
import DragDropUpload from "../NewProduct/DragDropUploads";

const Editproduct = () => {
  const [pImages, setPImages] = useState([]);
    // const [sizeInput, setSizeInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [Products, setProducts] = useState({
      title: '',
      category: '',
      subCategory: '',
      price: '',
      stock: '',
      description: '',
      size: [],
      weight: '',
    });
  
    const dispatch = useDispatch();
    const { _id } = useParams();
    const { singleProduct } = useSelector((state) => state.Product);

    useEffect(() => {
      if (!singleProduct || singleProduct._id !== _id) {
        dispatch(GetSingleProduct(_id));
      }
    }, [_id, dispatch, singleProduct]);
  
    useEffect(() => {
      if (singleProduct) {
        setProducts(singleProduct);
      }
    }, [singleProduct]);
  
    // const handleSizeKeyDown = (e) => {
    //   if (e.key === "Enter" && sizeInput.trim()) {
    //     e.preventDefault();
  
    //     if (Product.size.includes(sizeInput.trim())) return;
  
    //     setProducts((prev) => ({
    //       ...prev,
    //       size: [...prev.size, sizeInput.trim()],
    //     }));
  
    //     setSizeInput("");
    //   }
    // };
  
    // const removeSize = (value) => {
    //   setProducts((prev) => ({
    //     ...prev,
    //     size: prev.size.filter((s) => s !== value),
    //   }));
    // };
  
    const handleChange =useCallback((e) => {
        const { name, value } = e.target;
      setProducts((prev) => ({ ...prev, [name]: value }));
    }, []);
    
    const UpdateSingleProduct =useCallback((e) => {
      e.preventDefault();

      try {
        setLoading(true);
        const data = new FormData();

        Object.keys(Products).forEach((key) => {
          data.append(key, Products[key]);
        })

        pImages.forEach((image) => {
          data.append("images", image);
        });

        dispatch(UpdateProduct({ formdata:data, id: _id }));
        alert("Product updated successfully!");
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
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

    }, [Products, pImages, _id, dispatch]);
  
  const InputField = React.memo(({ label, ...props }) => (
    <div className="flex flex-col">
      <label className="font-medium">{label}</label>
      <input {...props} className="h-12 p-3 bg-gray-100 border rounded-md" />
    </div>
  ));

  const TextAreaField = React.memo(({ label, ...props }) => (
    <div className="flex flex-col">
      <label className="font-medium">{label}</label>
      <textarea {...props} className="h-28 p-3 bg-gray-100 border rounded-md" />
    </div>
  ));

return (
<>
    <Banner page={"Upload Product"} />
    <form onSubmit={UpdateSingleProduct} className="py-4">
    <section className="w-[80%] h-auto mx-auto mt-2 p-2 bg-white rounded-md">
        <h2 className="text-2xl font-medium">Edit Product Deteils</h2>

            <InputField label="Product Name" name="title" value={Products.title} onChange={handleChange} />
            <InputField label="Category" name="category" value={Products.category} onChange={handleChange} />
            <InputField label="SubCategory" name="subCategory" value={Products.subCategory} onChange={handleChange} />
            <TextAreaField label="Description" name="description" value={Products.description} onChange={handleChange} />
            <InputField label="Stock" name="stock" type="number" value={Products.stock} onChange={handleChange} />
            <InputField label="Price" name="price" type="number" value={Products.price} onChange={handleChange} />

                
        {/* <div className="flex flex-col my-2">
        <label htmlFor="ProductName" className="text-lg font-medium"> Product Name </label>
          <input type="text" value={product.title} defaultValue={title} name="productname" id="ProductName" onChange={handleChange} className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" />
        </div>

        <div className="flex flex-col my-2">
        <label htmlFor="Category" className="text-lg font-medium"> Category </label>
          <input type="text" value={product.category} defaultValue={category} name="category" id="Category" onChange={handleChange} className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" />
        </div>
        
        <div className="flex flex-col my-2">
        <label htmlFor="SubCategory" className="text-lg font-medium"> Sub Category </label>
          <input type="text" value={product.subCategory} defaultValue={subCategory} name="subcategory" id="SubCategory" onChange={handleChange} className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" />
        </div>
                
        <div className="flex flex-col my-2">
          <label htmlFor="ProductDis" className="text-lg font-medium"> Product Description </label>
          <textarea name="productdescription" placeholder={product.description} defaultValue={description} id="ProductDescription" onChange={handleChange} className="h-32 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" ></textarea>
        </div>
                
        <div className="flex flex-col my-2">
            <label htmlFor="Stock">Stock</label>
            <input type="number" value={product.stock} defaultValue={stock} name="stock" id="Stock" onChange={handleChange} className="bg-gray-100 p-4 mt-2 border-2 border-gray-300 focus:outline-none rounded-md" />
        </div>

        <div className="flex flex-col my-2">
        <label htmlFor="Price">Price</label>
        <input type="number" value={product.price} defaultValue={price} name="price" id="Price" onChange={handleChange} className="bg-gray-100 p-4 mt-2 border-2 border-gray-300 focus:outline-none rounded-md" />
        </div> */}

        {/* <div className="flex flex-col my-2">
            <label htmlFor="">Ratings</label>
            <div className="flex gap-2 p-4 mt-2">
              <span className="text-yellow-400 hover:scale-125">
                <FaRegStar className="w-8 h-8" />
              </span>
              <span className="text-yellow-400 hover:scale-125">
                <FaRegStar className="w-8 h-8" />
              </span>
              <span className="text-yellow-400 hover:scale-125">
                <FaRegStar className="w-8 h-8" />
              </span>
              <span className="text-yellow-400 hover:scale-125">
                <FaRegStar className="w-8 h-8" />
              </span>
              <span className="text-yellow-400 hover:scale-125">
                <FaRegStar className="w-8 h-8" />
              </span>
            </div>
        </div> */}
        
        <h2 className="text-2xl font-medium">Media Files</h2>
        <div className="h-52 flex gap-4 my-2">
          {/* {image.map((img, index) => (
            <img key={index} src={`http://localhost:2729/uploads/${img.path}`} alt={`Product Image ${index + 1}`} className="h-full w-auto object-cover rounded-md" />
          ))} */}
        </div>

        <DragDropUpload image={pImages} setImage={setPImages} />
        
        <button
          type="submit" disabled={loading}
          aria-label="upload the product and view"
          className=" w-full h-12 px-4 py-1 bg-blue-400 rounded-md flex items-center justify-center gap-2"
        >
          { loading ? <FaTruckLoading className=' text-2xl hover:text-white' /> : <FaCloudUploadAlt className='text-2xl hover:text-white' /> }
          { loading ? "UPLOADING..." : "UPADTE AND VIEW" }
        </button>
    </section>
    </form>
</>
);
};

export default Editproduct;
