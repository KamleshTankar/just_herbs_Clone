import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { getallproduct } from "../../redux-toolkit/Slice/ProductSlice";

import { FaCloudUploadAlt, FaRegStar } from "react-icons/fa";
import Banner from "../Banner";

const Editproduct = () => {
    const [ptitle, setPTitle] = useState("");
    const [pimage, setPImage] = useState([]);
    const [pdescription, setPDescription] = useState("");
    const [pprice, setPPrice] = useState("");
    const [pquantity, setPQuantity] = useState("");
  
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.Product);

    const { _id } = useParams();

    const singleproduct = product.filter((item) => item._id === _id);

    const { Description, Title, price, Quntity } = singleproduct[0];

    useEffect(() => {
      dispatch(getallproduct());
    }, [dispatch]);
    
    const UpdateProduct = (e) => {
        e.preventDefault();
    const newProduct = {
        ptitle, pimage, pdescription, pprice, pquantity };
        console.log(newProduct);
    };

return (
<>
    <Banner page={"Upload Product"} />
    <form onSubmit={UpdateProduct} className="py-4">
    <section className="w-[80%] h-auto mx-auto mt-2 p-2 bg-white rounded-md">
        <h2 className="text-2xl font-medium">Edit Product Deteils</h2>
                
        <div className="flex flex-col my-2">
        <label htmlFor="ProductName" className="text-lg font-medium"> Product Name </label>
          <input type="text" value={Title} name="productname" id="ProductName" onChange={(e) => { setPTitle(e.target.value); }} className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" />
        </div>
                
        <div className="flex flex-col my-2">
          <label htmlFor="ProductDis" className="text-lg font-medium"> Product Description </label>
          <textarea name="productdescription" value={Description} id="ProductDescription" onChange={(e) => { setPDescription(e.target.value); }} className="h-32 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" ></textarea>
        </div>
                
        <div className="flex flex-col my-2">
            <label htmlFor="Stock">Stock</label>
            <input type="number" value={Quntity} name="Stock" id="Stock" onChange={(e) => { setPQuantity(e.target.value); }} className="bg-gray-100 p-4 mt-2 border-2 border-gray-300 focus:outline-none rounded-md" />
        </div>

        <div className="flex flex-col my-2">
        <label htmlFor="Price">Price</label>
        <input type="number" value={price} name="Price" id="Price" onChange={(e) => { setPPrice(e.target.value); }} className="bg-gray-100 p-4 mt-2 border-2 border-gray-300 focus:outline-none rounded-md" />
        </div>

        <div className="flex flex-col my-2">
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
        </div>
        
        <h2 className="text-2xl font-medium">Media Files</h2>

        <div className="flex gap-2 my-3">
          <div className="w-40 h-40 border-2 border-dashed border-gray-300">
            <input
              type="file"
              name=""
              id=""
              onChange={(e) => {
                setPImage(e.target.value);
              }}
              className="w-40 h-40"
            />
          </div>

          <div className="w-40 h-40 border-2 border-dashed border-gray-300">
            <input type="file" name="" id="" className="w-40 h-40" />
          </div>

          <div className="w-40 h-40 border-2 border-dashed border-gray-300">
            <input type="file" name="" id="" className="w-40 h-40" />
          </div>

          <div className="w-40 h-40 border-2 border-dashed border-gray-300">
            <input type="file" name="" id="" className="w-40 h-40" />
          </div>
        </div>
        
        <button
          type="submit"
          aria-label="upload the product and view"
          className=" w-full h-12 px-4 py-1 bg-blue-400 rounded-md flex items-center justify-center gap-2"
        >
          <FaCloudUploadAlt /> UPDATE AND VIEW
        </button>
    </section>
    </form>
</>
);
};

export default Editproduct;
