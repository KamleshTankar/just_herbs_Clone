import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";


const LimitedEdition = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FeatchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    FeatchProducts();
  }, []);

  const LimitedProduct = products.filter((item) => item.id === 6);

    const goTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
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

   const ProductCard = ({ prod }) => {
     return (
       <article className="w-full flex flex-col justify-center lap:flex-row lap:justify-between px-12">
         <div className="w-full lap:w-3/5 flex flex-col gap-4">
           <img
             src={prod.thumbnail}
             alt={prod.title}
             className="w-full lap:w-3/5"
           />
           <div className="flex gap-4">
             {prod.images.slice(1, 5).map((img, index) => (
               <img
                 key={index}
                 src={img}
                 alt={`product-${index}`}
                 className="w-20 h-20"
               />
             ))}
           </div>
         </div>

         <div className="w-full lap:w-2/5 space-y-4">
           <div className="border-b border-solid border-gray-300">
             <h2 onClick={goTop}>
               <Link to="/perfumes">Chandan Perfume</Link>
             </h2>
             <div className="flex justify-between">
               <h3>Rs.1,450</h3>
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
             <h5>Size :</h5>
             <button className="border border-solid border-gray-400 rounded-sm px-2 py-1">
               50ml
             </button>
           </div>

           <div className="flex items-center gap-2 border border-solid border-gray-300 px-2 py-1 w-fit">
             <button>-</button>
             <input
               type="number"
               name="Qty"
               defaultValue={0}
               className="w-12 text-center"
             />
             <button>+</button>
           </div>

           <button className="bg-black text-white px-4 py-2 rounded">
             Add to Cart
           </button>

           <div className="border-y border-solid border-gray-300 py-2">
             <h4>Description</h4>
             <p>{prod.description}</p>
           </div>
         </div>
       </article>
     );
   };

  return (
    <section className=" border border-solid border-gray-300">
      <div className="text-center py-4">
        <h3>Fragrance of Authenticity!</h3>
        {loading ? <Skeleton height={30} width={200} /> : <h1>Sandalwood</h1>}
      </div>

      {loading ? (
        <SkeletonLoading />
      ) : (
        LimitedProduct.map((prod) => <ProductCard key={prod.id} prod={prod} />)
      )}
    </section>
  );
};

export default LimitedEdition;
