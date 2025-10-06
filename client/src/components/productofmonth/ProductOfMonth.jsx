import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";

const ProductOfMonth = () => {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const FeatchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        // console.log(data.product);
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        // console.log(error);
        setLoading(true);
      }
    };
  
    const LimitedProduct = products.filter((item) => item.id === 6);
  
    useEffect(() => {
      FeatchProducts();
    }, [products]);
  
    const SkeletonLoading = () => {
      return (
        <>
          <div className="w-full flex flex-col justify-center lap:flex-row lap:justify-between px-12">
            <div className="w-full lap:w-3/5 flex flex-col gap-4">
              <div className="w-full lap:w-3/5">
                <Skeleton height={200} width={200} />
              </div>
              <div className="w-full lap:w-3/5 flex gap-4">
                <Skeleton height={100} width={100} />
                <Skeleton height={100} width={100} />
                <Skeleton height={100} width={100} />
                <Skeleton height={100} width={100} />
              </div>
            </div>
            <div className="w-full lap:w-2/5">
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={200} />
              <Skeleton height={20} width={200} />
              <Skeleton height={30} width={200} />
            </div>
          </div>
        </>
      );
    };
  
    const goTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };
  
  return (
    <section className=" border border-solid border-gray-300">
      <div className="text-center py-4">
        <h3>Product of Month</h3>
        {loading ? <Skeleton height={30} width={200} /> : <h1>Sandalwood</h1>}
      </div>
      {LimitedProduct.map((prod) => {
        return loading ? (
          <SkeletonLoading />
        ) : (
          <>
            <article className="w-full flex flex-col justify-center lap:flex-row lap:justify-between px-12">
              <div className="w-full lap:w-3/5 flex flex-col gap-4">
                <div className="w-full lap:w-3/5">
                  <img
                    src={prod.thumbnail}
                    alt="authenticity-img"
                    className="w-full lap:w-3/5"
                  />
                </div>
                <div className="w-full lap:w-3/5 flex gap-4">
                  <img
                    src={prod.images[1]}
                    alt="auth-image-1"
                    className="w-20 h-20"
                  />
                  <img
                    src={prod.images[2]}
                    alt="auth-image-2"
                    className="w-20 h-20"
                  />
                  <img
                    src={prod.images[1]}
                    alt="auth-image-3"
                    className="w-20 h-20"
                  />
                  <img
                    src={prod.images[2]}
                    alt="auth-image-4"
                    className="w-20 h-20"
                  />
                </div>
              </div>
              <div className="w-full lap:w-2/5">
                <div className="flex flex-col border-b border-solid border-gray-300">
                  <h2 onClick={goTop}>
                    <Link to="perfumes">Chandan Perfume</Link>{" "}
                  </h2>
                  <div className="flex justify-between">
                    <h3>Rs.1,450</h3>
                    <span className="flex">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="12"
                        class="icon icon-star-rating"
                        viewBox="0 0 12 11"
                      >
                        <path
                          d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z"
                          fill="#1c1c1c"
                        ></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="12"
                        class="icon icon-star-rating"
                        viewBox="0 0 12 11"
                      >
                        <path
                          d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z"
                          fill="#1c1c1c"
                        ></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="12"
                        class="icon icon-star-rating"
                        viewBox="0 0 12 11"
                      >
                        <path
                          d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z"
                          fill="#1c1c1c"
                        ></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="12"
                        class="icon icon-star-rating"
                        viewBox="0 0 12 11"
                      >
                        <path
                          d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z"
                          fill="#1c1c1c"
                        ></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="12"
                        class="icon icon-star-rating"
                        viewBox="0 0 12 11"
                      >
                        <path
                          d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z"
                          fill="#1c1c1c"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className=" flex gap-2">
                  <h5>Size :</h5>
                  <button className="border border-solid border-gray-400 rounded-sm">
                    50ml
                  </button>
                </div>
                <div className="border border-solid border-gray-300">
                  <button>-</button>
                  <input type="number" name="Qty" value="0" id="" />
                  <button>+</button>
                </div>
                <button>Add to Cart</button>
                <div className="border-y border-solid border-gray-300">
                  <h4>Description</h4>
                </div>
              </div>
            </article>
          </>
        );
      })}
    </section>
  );
};

export default ProductOfMonth;
