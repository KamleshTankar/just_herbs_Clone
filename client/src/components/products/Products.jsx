import React, { useCallback } from "react";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router";

// import { AddToCart } from "../../Redux-Toolkit/Slices/CartSlice";

const Products = React.memo(({ Prod, i }) => {

  // const dispatch = useDispatch();
  const { Id } = useParams();

  const handleAddToCart = useCallback(() => {
    // dispatch(AddToCart({ product, id }));
    // dispatch(Prod, Id);
    console.log(Prod.id, Id);
  }, [Prod, Id]);
  
  return (
    <div
      key={i}
      className="w-full h-auto py-4 Lp-l:mx-0 flex flex-col justify-center items-center border-2 hover:border-black rounded-md"
    >
      <img src={Prod.thumbnail || "/placeholder.jpg"} alt={Prod.title || "Product image"} loading="lazy"
        className=" h-[140px] w-[140px] my-2 object-contain mix-blend-multiply hover:scale-125 transition duration-300" />

      <h2 className="w-full h-8 text-black my-1 text-lg text-center font-serif font-medium truncate">
        {Prod.title || "Untitled Product"}
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
});

export default Products;
