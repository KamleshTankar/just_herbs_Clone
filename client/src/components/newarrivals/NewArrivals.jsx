import React, { useState, useEffect } from 'react'
import Skeleton from "react-loading-skeleton";
import { Link } from 'react-router-dom'

import Products from "../../components/products/Products";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

  const NewProduct = products.slice(0, 4);;

    useEffect(() => {
      FeatchProducts();
    }, []);
  
    const SkeletonLoading = () => {
      return (
        <div className="w-full grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton height={200} width={200} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={200} />
              <Skeleton height={30} width={200} />
            </div>
          ))}
        </div>
      );
    };

  return (
    <section className="text-center py-4">
      <h3>Collection</h3>
      <h1>New Arrivals</h1>

      <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-box3 lap:justify-center lap:gap-4 my-4">
        {loading ? (
          <SkeletonLoading />
        ) : (
          NewProduct.map((prod) => <Products key={prod.id} Prod={prod} />)
        )}
      </div>

      <button className="p-4 bg-gray-200 hover:bg-white hover:border-2 border-gray-200">
        <Link to="/perfumes">View All</Link>
      </button>
    </section>
  );
}

export default NewArrivals


