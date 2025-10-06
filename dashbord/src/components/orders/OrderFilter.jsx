import React, { useState, useEffect } from 'react'

import { TbSearch } from "react-icons/tb";

const OrderFilter = ({seLength}) => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('');

  const FeatchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const filterStatus = (event) => {
    // const productCat = products.filter((item) => item.category === event.taget.value);
    // setStatus(productCat);
    setStatus(event.target.value);
  };
  
  const filterSort = (event) => {
    // const productCat = products.filter((item) => item.category === event.target.value);
    // setSort(productCat);
    setSort(event.target.value);
    
  };
  
  const filterLength = (event) => {
    // const productCat = products.filter((item) => item.category === event.target.value);
    // setLength(productCat);
    seLength(event.target.value);
  };
  
        useEffect(() => {
          FeatchProducts();
        }, [products]);

  return (
    <div className="w-[96%] h-auto mx-auto mt-2 p-2 bg-white rounded-md">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <select name="Orders Status" id="" onChange={filterStatus} className="p-2 border border-gray-300 rounded-md" >
            <option value="">Orders Status</option>
            <option value="All Orders">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex flex-col">
          <select name="Sort By" id="" onChange={filterSort} className="p-2 border border-gray-300 rounded-md" >
            <option value="">Sort By</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-a">Z-A</option>
            <option value="Low-High price">Low-Hight price</option>
            <option value="Hight-Low price">Hight-Low price</option>
          </select>
        </div>
        <div className="flex flex-col">
          <select name="Select Length" id="" onChange={filterLength} className="p-2 border border-gray-300 rounded-md" >
            <option value="10">Select Length</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
        {/* <div className="flex flex-col">
          <select
            name="Orders Status"
            id=""
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="Orders Status">Orders Status</option>
            <option value="All Orders">All Orders</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div> */}
        <div>check<span>{status}</span><span>{sort}</span></div>
        <div className="flex border border-gray-300 rounded-md">
          <input
            type="search"
            name="search"
            id="search"
            className=" p-2 rounded-l-md focus:border-2 focus:border-yellow-500 focus:rounded-l-md focus:outline-none"
            placeholder="Search"
          />
          <button type="submit" className="p-2 font-medium text-xl"> <TbSearch /> </button>
        </div>
      </div>
    </div>
  );
}

export default OrderFilter