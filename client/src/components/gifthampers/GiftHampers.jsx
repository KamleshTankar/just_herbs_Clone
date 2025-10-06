import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";

import Products from "../../components/products/Products";

const GiftHampers = () => {

  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const FeatchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
  
    const NewProduct = products.filter((item) => item.id <= 4);
  
      useEffect(() => {
        FeatchProducts();
      }, [products]);
    
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
    <section className="text-center">
      <h3>Collection</h3>
      <h1>Perfume & Attar Gift Hampers</h1>
      <div className="grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-4 my-4">
        {NewProduct.map((prod) => {
          return loading ? <SkeletonLoading /> : <Products Prod={prod} />;
        })}
      </div>
      <button className="p-4 bg-gray-200 hover:bg-white hover:border-2 border-gray-200">
        <Link to="perfumes">View All</Link>
      </button>
    </section>
  );
};

export default GiftHampers;
