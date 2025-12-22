import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetallProduct } from "../../redux-toolkit/Slice/ProductSlice";

import Skeleton from "react-loading-skeleton";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import Banner from "../Banner";
import Products from "./Product";

const ProductList = () => {
  const [productlist, setProductlist] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.Product);

  const FeatchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProductlist(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
    
  const SkeletonLoading = () => {
        return (
            <table className="w-full">
              <tbody>
                <tr className=" grid grid-cols-8">
                  <td className="flex justify-center">
              <Skeleton height={20} width={40} />  
                  </td>
                  <td className="flex justify-center">
              <Skeleton height={20} width={100} />
                  </td>
                  <td className="flex justify-center">
              <Skeleton height={20} width={100} />  
                  </td>
                  <td className="flex justify-center">
              <Skeleton height={20} width={40} />
                  </td>
                  <td className="flex justify-center">
              <Skeleton height={20} width={40} />                
                  </td>
                  <td className="flex justify-center">                
              <Skeleton height={20} width={60} />
                  </td>
            <td className="flex justify-center gap-2">
              <Skeleton height={20} width={30} />
              <Skeleton height={20} width={30} />
              <Skeleton height={20} width={30} />
                  </td>
                </tr>
              </tbody>
            </table>
            /* <div className="w-full grid grid-cols-7 items-center justify-center">
            </div> */
        );
    };
    
  const selectPageHandler = (selectedpage) => {
      setPages(selectedpage);
    };

  useEffect(() => {
        FeatchProducts();
        dispatch(GetallProduct());
    },[dispatch]);
  
    if (error) return <SkeletonLoading/>;

  return (
    <>
      <Banner page={"Product List"} />
        <main className="w-full h-auto">
        <table className="w-full h-12">
        <thead>
        <tr className="h-12 grid grid-cols-7 items-center gap-6 mx-2">
            <th className="w-36">PID</th>
            <th className="w-36">Product</th>
            <th className="w-36">Name</th>
            <th className="w-36">Price</th>
            <th className="w-36">Stock</th>
            <th className="w-36">Category</th>
            <th className="w-36">Action</th>
        </tr>
        </thead>
        </table>
        <div className="w-full h-auto">
          {product.slice(pages * 10 - 10, pages * 10).map((prod) => {
            return loading ? { error } : <Products key={prod._id} Prod={prod} />;
          })}
        </div>
        {/* <div className="w-full grid justify-center">
          {productlist.slice(pages * 10 - 10, pages * 10).map((prod) => {
            return loading ? <SkeletonLoading /> : <Products Prod={prod} />;
          })}
        </div> */}
        <div className="w-4/5 mx-auto flex justify-center gap-4 my-2">
          <button
            type="submit"
            className="bg-gray-200 p-4"
            onClick={() => selectPageHandler(pages - 1)}
          >
            <FaArrowAltCircleLeft />
          </button>
          {[...Array(productlist.length / 10)].map((_, i) => {
            return (
              <button
                type="submit"
                className={
                  pages === i + 1 ? "bg-gray-400 p-4" : "bg-gray-100 p-4"
                }
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </button>
            );
          })}
          <button
            type="submit"
            className="bg-gray-200 p-4"
            onClick={() => selectPageHandler(pages + 1)}
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      </main>
    </>
  );
};

export default ProductList;
