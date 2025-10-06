import React, { useState, useEffect } from 'react'
import Skeleton from "react-loading-skeleton";

const Singleproduct = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    
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
    
      useEffect(() => {
        FeatchProducts();
      }, [products]);
    
  return (
    <>
      Singleproduct
      {loading ? (
        <SkeletonLoading />
      ) : (
        <>
          <article>
            <div>
              <div>
                <img src="" alt="product-image" />
              </div>
              <div>
                <img src="" alt="product-other-image" />
              </div>
            </div>
            <div>
              <h2>product name</h2>
              <span>
                <h3>price</h3> <h4>original price</h4>
              </span>
              <p>MRP is inclusive of all taxes.</p>
              <div>
                <input type="number" name="" id="" />
              </div>
              <button>Add to Cart</button>
              <div>Size </div>
              <div>Sent</div>
            </div>
          </article>
        </>
      )}
    </>
  );
}

export default Singleproduct