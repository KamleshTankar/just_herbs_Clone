import React, { useState, useEffect } from 'react'

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const OrderDetails = ({Length}) => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  // const [orders, setOrders] = useState([]);


  // const loadOrders = async () => {
  //   // try {
  //   //   const res = await fetchOrders();
  //   //   setOrders(res.data.data);
  //   // } catch (err) {
  //   //   console.error("Error fetching orders:", err);
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  // };

  // const handleStatusChange = async (id, newStatus) => {
  //   try {
  //     // await updateOrderStatus(id, newStatus);
  //     loadOrders();
  //   } catch (err) {
  //     console.error("Failed to update order:", err);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this order?")) return;
  //   try {
  //     await deleteOrder(id);
  //     loadOrders();
  //   } catch (err) {
  //     console.error("Failed to delete order:", err);
  //   }
  // };

  
  const getstatusBg = (status) => {
    const lower = status.toLowerCase();
    const styles = {
      pending: "#E0E0E0",
      processing: "#FFFFCC",
      transits: "#CCE5FF",
      delivered: "#CCFFCC",
      cancel: "#FFCCCC",
    };
    return styles[lower] || "gray";
  };
  const getstatusBorder = (status) => {
    const lower = status.toLowerCase();
    const styles = {
      pending: "#A0A0A0",
      processing: "#FFFF33",
      transits: "#3399FF",
      delivered: "#33FF33",
      cancel: "#FF3333",
    };
    return styles[lower] || "gray";
  };
  
  const status = "Cancel"; // Example status, replace with actual status from your data
  const Bgstyle = {
    border: `2px  solid ${getstatusBorder(status)}`,
    color: "black", backgroundColor: getstatusBg(status)
  };
  
  const FeatchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const selectPageHandler = (selectedpage) => {
    setPages(selectedpage);
  };



  useEffect(() => {
    FeatchProducts();
  }, [products]);

  return (
    <div className="w-[96%] h-auto mx-auto mt-2 rounded-md">
      <table className="w-full">
        <thead>
          <tr className=" h-12 grid grid-cols-8 items-center justify-center bg-gray-200">
            <th className=' w-36 h-10 text-center'>ID</th>
            <th className=' w-36 h-10 text-center'>Name</th>
            <th className=' w-36 h-10 text-center'>Date</th>
            <th className=' w-36 h-10 text-center'>Price</th>
            <th className=' w-36 h-10 text-center'>Quntity</th>
            <th className=' w-36 h-10 text-center'>Total Amount</th>
            <th className=' w-36 h-10 text-center'>Status</th>
            <th className=' w-36 h-10 text-center'>Action</th>
          </tr>
        </thead>
        {products.slice(pages * 10 - 10, pages * Length).map((prod, i) => {
          return (
            <tbody key={i}>
              <tr className="grid grid-cols-8 items-center justify-center px-2 py-4 mt-2 rounded bg-white">
                <th className=' w-36 h-10 text-center'>{prod.id}</th>
                <th className=' w-36 h-10 text-center'>{prod.title}</th>
                <th className=' w-36 h-10 text-center'>1/1/2022</th>
                <th className=' w-36 h-10 text-center'>$ {prod.price}</th>
                <th className=' w-36 h-10 text-center'>3</th>
                <th className=' w-36 h-10 text-center'>{`$ ${parseFloat(prod.price * 3).toFixed(2)}`}</th>
                <th style={Bgstyle} className=' w-36 h-10 text-base uppercase flex items-center justify-center gap-2 rounded-3xl'>
                  <th style={{ backgroundColor: getstatusBorder(status) }} className='w-3 h-3 rounded-full'></th> {status}</th>
                <th className=' w-36 h-10 text-center'>...</th>
              </tr>
            </tbody>
          );
        })}
      </table>

      <div className="w-4/5 mx-auto flex justify-center gap-4 my-2">
        <button
          type="submit"
          className="bg-gray-200 p-4"
          onClick={() => selectPageHandler(pages - 1)}
        >
          <FaArrowAltCircleLeft />
        </button>
        {[...Array(products.length / 10)].map((_, i) => {
          return (
            <button
              type="submit"
              className={
                pages === i + 1 ? "bg-gray-400 p-4" : "bg-gray-100 p-4"
              }
              onClick={() => selectPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          type="submit"
          className="bg-gray-200 p-4"
          onClick={() => selectPageHandler(pages + 1)}
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
}

export default OrderDetails