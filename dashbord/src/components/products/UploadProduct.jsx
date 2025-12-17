import React, { useState } from 'react'

import { FaCloudUploadAlt } from "react-icons/fa";
import Banner from '../Banner'

const UploadProduct = () => {
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('');
  const [pSubCategory, SetPSubCategory] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pQuantity, setPQuantity] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pSize, setPSize] = useState('');
  const [pTags, setPTags] = useState('');
  const [pDimensions, setPDimensions] = useState('');
  const [pWeight, setPWeight ] = useState('');
  const [pImages,setPImages] = useState([]);

  const AddProduct = () => {
    const newProduct = {
      pTitle, pCategory, pSubCategory, pImages, pDescription,
      pPrice, pQuantity, pSize, pTags, pDimensions, pWeight
    }
    
    if(!pTitle || !pCategory || !pSubCategory || !pPrice || !pQuantity || !pDescription || pImages.length===0 || !pSize || !pTags || !pDimensions || !pWeight) {
      alert("Please fill all the fields");
      return;
    }
    console.log(newProduct);
  }

  return (
    <>
      <Banner page={"Upload Product"} />
      <form onSubmit={AddProduct} className="py-4">
        <section className="w-[96%] h-auto mx-auto mt-2 p-2 bg-white rounded-md">
          <h2 className="text-2xl font-medium">Basic Information</h2>
          <div className="flex flex-col my-2">
            <label htmlFor="ProductName" className="text-lg font-medium">
              Product Name
            </label>
            <input type="text" name="ProductName" id="ProductName" onChange={(e) => { setPTitle(e.target.value); }}
              className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex flex-col my-2">
            <label htmlFor="description" className="text-lg font-medium"> Product Description </label>
            <textarea name="description" id="description" onChange={(e) => { setPDescription(e.target.value); }}
              className="h-32 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-1 gap-2 items-center">
            <div className='flex my-2'>
            <div className="flex flex-col w-1/2 mr-2">
              <label htmlFor="pCategory">Category</label>
              <input type="text" name="pCategory" id="pCategory" onChange={(e) => { setPCategory(e.target.value); }}
                className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none"
              />

            </div>
              
            <div className="flex flex-col w-1/2">
              <label htmlFor="subcategory">SUB CATEGORY</label>
              <input type="text" name="subcategory" id="subcategory" onChange={(e) => { SetPSubCategory(e.target.value); }}
                className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none"
              />
            </div>
            </div>

            <div className='flex my-2'>
            <div className="flex flex-col w-1/2 mr-2">
              <label htmlFor="Stock">Stock</label>
              <input type="number" name="Stock" id="Stock" onChange={(e) => { setPQuantity(e.target.value); }}
                className="bg-gray-100 p-4 mt-2 border-2 border-gray-300 focus:outline-none rounded-md"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="Price">Price</label>
              <input type="number" name="Price" id="Price" onChange={(e) => { setPPrice(e.target.value); }}
                className="bg-gray-100 p-4 mt-2 border-2 border-gray-300 focus:outline-none rounded-md"
              />
            </div>
            </div>

            <div className="w-full flex gap-4 my-2 ">
              <div className='w-4/12 flex flex-col my-2'>
                <label htmlFor="pSize">Size</label>
                <input type="text" name="pSize" id="pSize" onChange={(e)=>{ setPSize(e.target.value);}}
                  className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" />
              </div>

              <div className='w-3/5 flex flex-col my-2'>
                <label htmlFor="pTags">Tags</label>
                <input type="text" name="pTags" id="pTags" onChange={(e)=>{ setPTags(e.target.value);}}
                  className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" />
              </div>
            </div>

            <div className=' w-full flex gap-4 my-2 '>
              <div className='w-3/5 flex flex-col'>
                <label htmlFor="dimensions">Dimensions</label>
                <input type="text" name="dimensions" id="dimensions" onChange={(e)=>{ setPDimensions(e.target.value);}}
                  className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" />
              </div>

              <div className='w-4/12 flex flex-col'>
                <label htmlFor="weight">Weight</label>
                <input type="text" name="weight" id="weight" onChange={(e)=>{ setPWeight(e.target.value);}}
                  className="h-14 p-4 bg-gray-200 border border-gray-400 rounded-md focus:outline-none" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-[96%] h-auto mx-auto mt-3 p-2 bg-white rounded-md">
          <h2 className="text-2xl font-medium">Media Files</h2>
          <div className="flex gap-2 my-3">
            <div className="w-40 h-40 border-2 border-dashed border-gray-300">
              <input
                type="file"
                name=""
                id=""
                onChange={(e) => {
                  setPImages(e.target.value);
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