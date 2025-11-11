import React, { useState, useEffect, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";

import Products from "../../components/products/Products";

const BestSeller = () => {
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
        console.log("Unable to load the product. Please try again later.", error.message);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  },[]);

  const NewProduct = products.filter((item) => item.id <= 4);

  useEffect(() => {
    FetchProducts();
  }, [FetchProducts]);

  const SkeletonLoading = () => {
    return (
      <>
        <div className="w-full grid grid-cols-1 tab:grid-cols-1 lap:grid-cols-1 justify-center">
          <Skeleton height={200} width={200} />
          <Skeleton height={20} width={200} />
          <Skeleton height={20} width={200} />
          <Skeleton height={30} width={200} />
        </div>
      </>
    );
  };

  return (
    <section className="text-center py-10 px-4 bg-white">
      <h3 className="text-lg font-medium text-gray-600 uppercase tracking-widest">Collection</h3>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">BestSeller</h1>

      {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

      <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-box3 lap:justify-center lap:gap-4 my-4">
        {NewProduct.map((prod) => {
          return loading ? <SkeletonLoading /> : <Products Prod={prod} />;
        })}
      </div>

      <Link to="/perfumes"
        className="inline-block px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full border border-transparent hover:bg-white hover:border-gray-400 transition-all duration-200" >
        View All
      </Link>
    </section>
  );
};

export default BestSeller;
