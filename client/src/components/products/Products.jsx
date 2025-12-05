import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";

import { AddToCart } from "../../Redux-Toolkit/Slices/CartSlice";

const Products = ({ Prod }) => {
  const [loaded, setLoaded] = useState(false);


  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);

  const handleAddToCart = useCallback(() => {
    const newItem = {
      id: Prod.id,
      name: Prod.title,
      image: Prod.thumbnail,
      price: Prod.price,
      quantity: 1,
    };

    if (user) {
      dispatch(AddToCart({ productId:Prod.id, userId:user?._id, quantity:newItem.quantity }));
    }else {
      const existingCart = JSON.parse(localStorage.getItem("Cartitem")) || [];

      const index = existingCart.findIndex((p) => p.id === newItem.id);

      if (index > -1) {
        existingCart[index].quantity += 1;
        const updatedQty=[...existingCart]
        localStorage.setItem("Cartitem", JSON.stringify(updatedQty));
        alert("cart already avaliable quantity updated");
      } else {        
        const updatedCart = [...existingCart, newItem];
        localStorage.setItem("Cartitem", JSON.stringify(updatedCart));
        alert("Guest cart updated:", updatedCart);
      }
    } 
  }, [Prod, user, dispatch]);
  
  return (
    <div
      className="w-full h-auto py-4 Lp-l:mx-0 flex flex-col justify-center items-center border-2 hover:border-black rounded-md"
    >
      <img src={Prod.thumbnail || "/placeholder.jpg"} alt={Prod.title || "Product image"} loading="lazy"
        srcSet={`${Prod.thumbnail}? w=200 200w,${Prod.thumbnail}? W=400 400w,${Prod.thumbnail}? w=800 800w`} sizes="(max-with:600px)200px, 400px"
        className={`h-[140px] w-[140px] my-2 object-contain mix-blend-multiply hover:scale-125 transition duration-300 ${loaded ? "blur-0 scale-100":"blur-xl scale-110"}`} onLoad={()=>setLoaded(true)} />

      <h2 className="w-full h-8 text-black my-1 text-lg text-center font-serif font-medium truncate">
        <Link to={`/collection/product/${Prod.id}`}> {Prod.title || "Untitled Product"} </Link>
      </h2>

      <p className="text-gray-700 mt-1 text-sm">
        Rating: <span className="font-medium text-black">{Prod.rating || "N/A"}</span>
      </p>

      <p className="text-gray-700 mt-1 text-sm">
        Price: <span className="font-medium text-black"> ${Prod.price?.toFixed?.(2) || "0.00"} </span>
      </p>

      <p className="text-gray-700 mt-1 text-sm">
        Stock: <span className="font-medium text-black">{Prod.stock || 0}</span>
      </p>

      <button title="add-to-cart" aria-label="add-to-cart" onClick={handleAddToCart}
        className="w-[200px] Lp-l:w-[200px] text-4h font-semibold p-3 rounded-md bg-white border-2 border-black border-solid text-black hover:bg-blue-500 hover:text-white hover:border-blue-500">
        Add to Cart
      </button>
    </div>
  );
};

export default React.memo(Products);
