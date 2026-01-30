import React from "react";

import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router";

const Products = ({ Prod }) => {

  const { _id, title, price, stock, category, image=[] } = Prod;
  const porductID = _id?.slice(20);
  const fullImageUrl = `http://localhost:2729/admin/Getallproducts${image[0]}`; 

  console.log("Product Image URL:", fullImageUrl);
  const handelDelete = (id) => {
    console.log("Delete product:", id);
  };
  
  return (
    <>
      {/* <h1> {URL.parse(Prod.image[0])}</h1> */}
      <table className="w-full h-auto">
        <tbody>
          <tr className="h-24 grid grid-cols-7 gap-6 items-center border-b-2 hover:border-black">
            <td className="w-36 text-black text-center my-1 text-bh2">{porductID}</td>
            <td className="w-36">
            {image[0] && (
              <img
                src={fullImageUrl}
                alt={title}
                className="h-[40px] w-[40px] mix-blend-multiply hover:scale-125 transition duration-300"
              />
            )}
            </td>
            <td className="w-36 text-black text-center my-1 text-bh2">{title}</td>
            <td className="w-36 text-black text-center my-1 text-bh2">{price}</td>
            <td className="w-36 text-black text-center my-1 text-bh2">{stock}</td>
            <td className="w-36 text-black text-center my-1 text-bh2">{category}</td>
            <td className="w-36">
              <ul className="h-10 w-full flex items-center gap-6">
                <Link to={`/productinfo/${_id}`}> <li className="text-2xl hover:text-green-500"><FaEye/></li> </Link>
                <Link to={`/Editproduct/${_id}`}> <li className="text-2xl hover:text-blue-400"><FaEdit /></li> </Link>
                <li className="text-2xl hover:text-red-500" onClick={() => { handelDelete(_id) }}><FaTrashAlt/></li>
              </ul>
              
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Products;
