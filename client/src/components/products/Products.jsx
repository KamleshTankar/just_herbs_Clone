import React from "react";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router";

// import { AddToCart } from "../../Redux-Toolkit/Slices/CartSlice";

const Products = ({ Prod, i }) => {

  // const dispatch = useDispatch();
  const { Id } = useParams();

  const handleAddToCart = () => {
    // dispatch(AddToCart({ product, id }));
    // dispatch(Prod, Id);
    console.log(Prod.id, Id);
  };
  return (
    <>
      <div key={i}
        className="w-full h-auto py-4 Lp-l:mx-0 flex flex-col justify-center items-center border-2 hover:border-black rounded-md"
      >
        <img src={Prod.thumbnail} alt={Prod.title}
          className=" h-[140px] w-[140px] my-2 mix-blend-multiply hover:scale-125 transition duration-300"
        />
        <h4 className="w-full h-8 text-black my-1 text-xl text-center font-serif font-medium overflow-hidden">
          {Prod.title}
        </h4>
        <span className="text-black my-1 text-bh2">Rating {Prod.rating}</span>
        <span className="text-black my-1 text-bh2">$ {Prod.price}</span>
        <span className="text-black my-1 text-bh2">Stock {Prod.stock}</span>
        <button title="add-to-cart" aria-label="add-to-cart" onClick={handleAddToCart} className="w-[200px] Lp-l:w-[200px] text-4h font-semibold p-3 rounded-md bg-white border-2 border-black border-solid text-black hover:bg-blue-500 hover:text-white hover:border-blue-500">
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default Products;
