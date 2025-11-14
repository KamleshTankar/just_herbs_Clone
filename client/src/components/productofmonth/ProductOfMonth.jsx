import React, { useState, useEffect, useCallback } from "react";
import Skeleton from "react-loading-skeleton";

import SkeletonLoading from "../Loaders/SingleLoader";
import ProductCard from "../products/ProductCard";

const ProductOfMonth = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const FetchProducts = useCallback(async () => {
      const controller = new AbortController();
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
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
  
    const LimitedProduct = products.filter((item) => item.id === 6);
  
    useEffect(() => {
      FetchProducts();
    }, [FetchProducts]);
  
  
    const goTop = () =>  window.scrollTo({ top: 0, behavior: "smooth", });
  
  return (
    <section className=" bg-white border border-solid border-gray-300">
      <div className="text-center py-6">
        <h3 className=" text-sm uppercase tracking-widset text-gray-500">Product of Month</h3>
        {loading ? <Skeleton height={30} width={200} className="mx-auto mt-2"/> : <h1 className=" text-3xl font-bold text-gray-900 mt-2">Sandalwood</h1>}
      </div>

      {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

      {loading ? (<SkeletonLoading />) : (
      LimitedProduct.map((prod)=><ProductCard key={prod.id} prod={prod} goTop={goTop} />)
      )}
    </section>
  );
};

export default ProductOfMonth;
