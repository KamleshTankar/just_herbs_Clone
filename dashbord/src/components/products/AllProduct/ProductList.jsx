import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetallProduct } from "../../../redux-toolkit/Slice/ProductSlice";

import Skeleton from "react-loading-skeleton";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import Banner from "../../Banner";
import Products from "./Product";

const ProductList = () => {
  // const [productlist, setProductlist] = useState([]);
  const [page, setPages] = useState(1);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { error, product = [], loading } = useSelector((state) => state.Product);
  
  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);

  const paginatedProducts = product.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE,
  );

  // const FeatchProducts = async () => {
  //   try {
  //     const response = await fetch("https://dummyjson.com/products");
  //     const data = await response.json();
  //     setProductlist(data.products);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(true);
  //   }
  // };
    
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
    
  const selectPageHandler = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
      setPages(newPage);
    };

  useEffect(() => {
        // FeatchProducts();
        dispatch(GetallProduct());
    },[dispatch]);
  
   if (loading) return <SkeletonLoading />;
   if (error) return <p className="text-red-500 text-center">{error}</p>;

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
          {paginatedProducts.map((prod) => (
            <Products key={prod._id} Prod={prod} />
          ))}
        </div>
        {/* <div className="w-full grid justify-center">
          {productlist.slice(pages * 10 - 10, pages * 10).map((prod) => {
            return loading ? <SkeletonLoading /> : <Products Prod={prod} />;
          })}
        </div> */}
        <div className="w-4/5 mx-auto flex justify-center gap-4 my-2">
          <button
            type="button"
            className="bg-gray-200 p-3 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => selectPageHandler(page - 1)}
          >
            <FaArrowAltCircleLeft />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              type="button"
              className={`p3 ${page === i + 1 ? "bg-gray-400 p-4" : "bg-gray-100"}`}
              onClick={() => selectPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            className="bg-gray-200 p-3 disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => selectPageHandler(page + 1)}
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      </main>
    </>
  );
};

export default ProductList;
