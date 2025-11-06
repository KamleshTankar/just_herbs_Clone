import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import Banner from "../../components/banner/Banner";
import FilterSide from "../../components/filterside/FilterSide";
import Sidemenu from "../../components/aside/Sidemenu";
import Products from "../../components/products/Products";

import BgImage from '../../assets/banner/banner1.jpg';

import { getallproduct } from "../../Redux-Toolkit/Slices/ProductSlice";

const AirFresheners = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [grids, setGrids] = useState("grid-cols-box gap-8");
  const [availabilityFilter, setAvailabilityFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(1000);

  const dispatch = useDispatch();
  // const { product } = useSelector((state) => state.ProductsList);

  const productsPerPage = 10;

  useEffect(() => {
    const FeatchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.log("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    FeatchProducts();
    dispatch(getallproduct());
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...products];

    if (availabilityFilter) {
      filtered = filtered.filter((prod) => prod.stock > 0);
    }

    if (priceFilter < 1000) {
      filtered = filtered.filter((prod) => prod.price <= priceFilter);
    }

    setFilteredProducts(filtered);
    setPages(1);
    
  }, [products, availabilityFilter, priceFilter]);

  const selectPageHandler = (selectedpage) => {
    if (
      selectedpage < 1 || selectedpage > totalPages ||
      selectedpage > Math.ceil(products.length / productsPerPage)
    )
      return;
    setPages(selectedpage);
  };
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginatedProducts = filteredProducts.slice(
    (pages - 1) * productsPerPage,
    pages * productsPerPage
  );


  return (
    <>
      <Banner imageUrl={BgImage} title={"Air Fresheners"} />
      {/* <Banner title={"Air Fresheners"} /> */}
      <FilterSide GridSelect={(val)=>setGrids(val)} Product={filteredProducts} />
      <div className="w-[94%] mx-auto flex justify-between gap-4">
        <Sidemenu onAvailabilityChange={setAvailabilityFilter} onPriceChange={setPriceFilter} />

        <main className="w-[70%] mt-2">
          {loading ? (
            <div className={`grid ${grids}`}>
              {Array.from({ length: productsPerPage }).map((_, i) => (
                <div key={i}>
                  <Skeleton height={200} width={200} />
                  <Skeleton height={20} width={200} />
                  <Skeleton height={20} width={200} />
                  <Skeleton height={30} width={200} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`w-full grid ${grids} justify-center`}>
              {paginatedProducts.map((prod) => (
                <Products Prod={prod} key={prod.id} />
              ))}
            </div>
          )}
          <div className="w-4/5 mx-auto flex justify-center gap-2 my-6">
            <button
              disabled={pages === 1}
              className="bg-gray-200 p-3 rounded disabled:opacity-50"
              onClick={() => selectPageHandler(pages - 1)}
              aria-label="Previous Page"
            >
              <FaArrowAltCircleLeft />
            </button>

            {pageNumbers.map((num) => (
              <button
                key={num}
                aria-label="page number"
                className={`p-3 rounded 
              ${pages === num ? "bg-gray-400" : "bg-gray-100"}`}
                onClick={() => selectPageHandler(num)}
              >
                {num}
              </button>
            ))}

            <button
              disabled={pages === totalPages}
              className="bg-gray-200 p-3 rounded disabled:opacity-50"
              onClick={() => selectPageHandler(pages + 1)}
              aria-label="Next Page"
            >
              <FaArrowAltCircleRight />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default AirFresheners;
