import React, { useState } from 'react'

import { FaCloudUploadAlt, FaRegStar } from "react-icons/fa";
import Banner from '../Banner'

const UploadProduct = () => {
  const [ptitle, setPTitle] = useState('');
  const [pcategory, setPCategory] = useState('');
  const [pimage,setPImage] = useState('');
  const [pdescription, setPDescription] = useState('');
  const [pprice, setPPrice] = useState('');
  const [pquantity, setPQuantity] = useState('');
  // const [pid,setPId] = useState('');
  // const [subimage, setSubImage] = useState('');

  const AddProduct = () => {
    const newProduct ={ptitle,pcategory,pimage,pdescription,pprice,pquantity}
    console.log(newProduct);
  }

  return (
    <>
      <Banner page={"Upload Product"} />
      <form onSubmit={AddProduct} className="py-4">
        <section className="w-[96%] h-auto mx-auto mt-2 p-2 bg-white rounded-md">
          <h2 className="text-2xl font-medium">Basic Infomation</h2>
          <div className="flex flex-col my-2">
            <label htmlFor="ProductName" className="text-lg font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="productname"
              id="ProductName"
              onChange={(e)=>{setPTitle(e.target.value)}}
              className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="ProductDis" className="text-lg font-medium">
              Product Description
            </label>
            <textarea
              name=""
              id=""
              onChange={(e)=>{setPDescription(e.target.value)}}
              className="h-32 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-1 gap-2 items-center">
            <div className="flex flex-col my-2">
              <label htmlFor="">Category</label>
              <select
                name=""
                id=""
                onChange={(e)=>{setPCategory(e.target.value)}}
                className="p-4 mt-2 border-2 border-solid rounded-md"
              >
                <option value="">none</option>
                <option value="perfume">perfume</option>
                <option value="attar">attar</option>
              </select>
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="Stock">Stock</label>
              <input
                type="number"
                name="Stock"
                id="Stock"
                onChange={(e)=>{setPQuantity(e.target.value)}}
                className="bg-gray-100 p-4 mt-2 border-2 border-gray-300 focus:outline-none rounded-md"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="Price">Price</label>
              <input
                type="number"
                name="Price"
                id="Price"
                onChange={(e)=>{setPPrice(e.target.value)}}
                className="bg-gray-100 p-4 mt-2 border-2 border-gray-300 focus:outline-none rounded-md"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="">SUB CATEGORY</label>
              <select
                name=""
                id=""
                className="p-4 mt-2 border-2 border-solid rounded-md"
              >
                <option value="none">none</option>
                <option value="Unisex">Unisex</option>
                <option value="MAN">MAN</option>
                <option value="WOMAN">WOMAN</option>
              </select>
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="">Ratings</label>
              <div className="flex gap-2 p-4 mt-2">
                <span className="text-yellow-400 hover:scale-125"><FaRegStar/></span>
                <span className="text-yellow-400 hover:scale-125"><FaRegStar/></span>
                <span className="text-yellow-400 hover:scale-125"><FaRegStar/></span>
                <span className="text-yellow-400 hover:scale-125"><FaRegStar/></span>
                <span className="text-yellow-400 hover:scale-125"><FaRegStar/></span>
              </div>
            </div>
          </div>
        </section>
        <section className="w-[96%] h-auto mx-auto mt-3 p-2 bg-white rounded-md">
          <h2 className='text-2xl font-medium'>Media Files</h2>
          <div className="flex gap-2 my-3">
            <div className="w-40 h-40 border-2 border-dashed border-gray-300">
              <input type="file" name="" id="" onChange={(e)=>{setPImage(e.target.value)}} className='w-40 h-40'/>
            </div>

            <div className="w-40 h-40 border-2 border-dashed border-gray-300">
              <input type="file" name="" id="" className='w-40 h-40'/>
            </div>

            <div className="w-40 h-40 border-2 border-dashed border-gray-300">
              <input type="file" name="" id="" className='w-40 h-40'/>
            </div>

            <div className="w-40 h-40 border-2 border-dashed border-gray-300">
              <input type="file" name="" id="" className='w-40 h-40'/>
            </div>
          </div>
          <button type='submit'
            aria-label="upload the product and view"
            className=" w-3/5 h-12 px-4 py-1 bg-blue-400 flex items-center justify-center gap-2"
          >
            <FaCloudUploadAlt /> PUBLISH AND VIEW
          </button>
        </section>
      </form>
    </>
  );
}

export default UploadProduct