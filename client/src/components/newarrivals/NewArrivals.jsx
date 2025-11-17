import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import Products from "../../components/products/Products";
import ProductsLoaders from '../Loaders/ProductLoaders';

// const SkeletonLoading = () => (
//   <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//     {[...Array(4)].map((_, index) => (
//       <div
//         key={index}
//         className="flex flex-col items-center p-3 bg-gray-50 rounded-md shadow-sm"
//       >
//         <Skeleton height={220} width={"100%"} />
//         <Skeleton height={20} width={"80%"} className="mt-2" />
//         <Skeleton height={20} width={"60%"} />
//         <Skeleton height={35} width={"50%"} className="mt-2" />
//       </div>
//     ))}
//   </div>
// );


const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const FetchProducts = useCallback(async () => {
    const controller = new AbortController();
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://dummyjson.com/products?limit=4", {
          signal: controller.signal,
        });
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Failed to fetch products:", error);
          setError(error.message);
        }
      } finally {
        setLoading(false);
    }
    return () => controller.abort();
    },[]);

    useEffect(() => {
      FetchProducts();
    }, [FetchProducts]);
  
  const NewProduct = products.slice(0, 4);
    
  return (
    <section className="text-center py-10 px-4 bg-white">
      <h3 className="text-lg font-medium text-gray-600 uppercase tracking-widest"> Collection </h3>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">New Arrivals</h1>

      {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

      <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-box3 lap:justify-center lap:gap-4 my-4">
        {loading ? (
          <ProductsLoaders />
        ) : (
          NewProduct.map((prod) => <Products key={prod.id} Prod={prod} />)
        )}
      </div>

      <Link to="/perfumes"
        className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full border border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200" >
        View All
      </Link>
    </section>
  );
}

export default NewArrivals


