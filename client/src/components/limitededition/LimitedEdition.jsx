import React, { useState, useEffect, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";


const LimitedEdition = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const FetchProducts = useCallback(async () => {
    const controller = new AbortController();
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError("Unable to load the product. Please try again later.",error.message);
        console.error("Failed to fetch products:", error);
      }
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  },[]);

  useEffect(() => {
    FetchProducts();
  }, [FetchProducts]);

  const LimitedProduct = products.filter((item) => item.id === 6);

  const goTop = () =>  window.scrollTo({ top: 0, behavior: "smooth" });
  
  const SkeletonLoading = () => {
    return (
      <div className="w-full flex flex-col justify-center lap:flex-row lap:justify-between px-12">
        <div className="w-full lap:w-3/5 flex flex-col gap-4">
          <Skeleton height={200} width={200} />
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height={100} width={100} />
            ))}
          </div>
        </div>
        <div className="w-full lap:w-2/5 space-y-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height={20} width={200} />
          ))}
        </div>
      </div>
    );
  };

  const ProductCard = React.memo(({ prod, goTop }) => {
    const [quantity, setQuantity] = useState(1);
    
    const increaseQty = () => setQuantity((Qty) => Qty + 1);
    const decreaseQty = () => setQuantity((Qty) => Math.max(Qty - 1, 1));

    return (
      <article className="w-full flex flex-col justify-center lap:flex-row lap:justify-between px-12">
         <div className="w-full lap:w-3/5 flex flex-col gap-4">
           <img
             src={prod.thumbnail}
             alt={prod.title}
             loading="lazy"
             className="w-full lap:w-3/5"
           />
           <div className="flex gap-3 flex-wrap">
             {prod.images.slice(1, 5).map((img, index) => (
               <img
                 key={index}
                 src={img} loading="lazy"
                 alt={`${prod.title} variant ${index + 1}`}
                 className="w-20 h-20 object-cover rounded-md border border-gray-300"
               />
             ))}
           </div>
         </div>

         <div className="w-full lap:w-2/5 space-y-4">
           <div className="border-b border-gray-300">
             <h2 onClick={goTop} className="text-xl font-semibold hover:text-amber-700 transition-colors">
               <Link to="/perfumes">Chandan Perfume</Link>
             </h2>
             <div className="flex justify-between items-center mt-1">
               <h3 className="text-lg font-medium text-gray-800">Rs.1,450</h3>
               <div className="flex">
                 {[...Array(5)].map((_, i) => (
                   <svg
                     key={i}
                     aria-hidden="true"
                     focusable="false"
                     width="12"
                     className="icon icon-star-rating"
                     viewBox="0 0 12 11"
                   >
                     <path
                       d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z"
                       fill="#1c1c1c"
                     />
                   </svg>
                 ))}
               </div>
             </div>
           </div>

           <div className="flex gap-2 items-center">
             <h5 className=" font-medium">Size :</h5>
             <button className="border border-gray-400 rounded-sm px-3 py-1 hover:bg-gray-100">
               50ml
             </button>
           </div>

           <div className="flex items-center gap-2 border border-gray-300 px-2 py-1 w-fit rounded-md">
             <button type="button" aria-label="minus Qty" onClick={decreaseQty} className="text-lg px-2 font-bold hover:text-amber-600">-</button>
             <input
               type="number"
               name="Qty"
               aria-label="quantity input"
               Value={quantity}
               onChange={(e)=>setQuantity(Math.max(1, parseInt(e.target.value)||1))}
               className="w-12 text-center"
             />
             <button type="button" aria-label="plus Qty" onClick={increaseQty} className="text-lg px-2 font-bold hover:text-amber-600">+</button>
           </div>

           <button type="button" aria-label="add to cart" className="bg-black text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors">
             Add to Cart
           </button>

           <div className="border-y border-gray-300 py-3">
             <h4 className="font-semibold text-gray-800">Description</h4>
             <p className="text-sm text-gray-600">{prod.description}</p>
           </div>
         </div>
      </article>
    );
  });

  return (
    <section className=" bg-white border border-solid border-gray-300">
      <div className="text-center py-6">
        <h3 className="text-sm uppercase tracking-widest text-gray-500">Fragrance of Authenticity!</h3>
        {loading ? <Skeleton height={30} width={180} className="mx-auto mt-2" /> : <h1 className="text-3xl font-bold text-gray-900 mt-2">Sandalwood</h1>}
      </div>

      {error && <p className="text-red-500 text-sm mb-6">{error}</p>}
      
      {loading ? (
        <SkeletonLoading />
      ) : (
        LimitedProduct.map((prod) => <ProductCard key={prod.id} prod={prod} goTop={goTop} />)
      )}
    </section>
  );
};

export default LimitedEdition;
