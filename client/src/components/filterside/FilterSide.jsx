import React, { useState, useEffect, useRef } from 'react'

import { TbChevronUp, TbChevronDown } from "react-icons/tb";

const FilterSide = ({GridSelect, Product}) => {
  const [openSort, setOpenSort] = useState(false);
  const [sticky, setSticky] = useState(false);
  const sortRef = useRef(null);

  const SortBar = () =>  setOpenSort(!openSort);

  useEffect(() => {
    const handleScroll = () =>  setSticky(window.scrollY > 290); 
  
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sortRef.current && !sortRef.current.contains(event.target)) {
          setOpenSort(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    
    const sortOptions = [
      "Featured",
      "Best Selling",
      "A-Z",
      "Price: Low to High",
      "Price: High to Low",
    ];

  return (
    <>
      <aside
        className={`w-full h-12 z-20 flex items-center bg-white border-y border-black px-4 
        ${sticky ? "fixed top-[4rem]" : "top-[26.7rem]"}`}
      >
        <div className="w-[12%] h-6 flex justify-center items-center gap-2 ">
          <button
            aria-label="2-column grid"
            className=" grid grid-cols-2 gap-x-1"
            onClick={() => {
              GridSelect("grid-cols-box gap-6");
            }}
          >
            <svg className="w-[0.6rem] h-[0.6rem]">
              <rect className="w-[0.6rem] h-[0.6rem]" fill="gray" />
            </svg>
            <svg className="w-[0.6rem] h-[0.6rem]">
              <rect className="w-[0.6rem] h-[0.6rem]" fill="gray" />
            </svg>
            <svg className="w-[0.6rem] h-[0.6rem]">
              <rect className="w-[0.6rem] h-[0.6rem]" fill="gray" />
            </svg>
            <svg className="w-[0.6rem] h-[0.6rem]">
              <rect className="w-[0.6rem] h-[0.6rem]" fill="gray" />
            </svg>
          </button>
          <button
            aria-label="3-column grid"
            className=" grid grid-cols-3 items-center gap-x-1"
            onClick={() => {
              GridSelect("grid-cols-box2 gap-6");
            }}
          >
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
            <svg className="w-[7px] h-[7px]">
              <rect className="w-[7px] h-[7px]" fill="gray" />
            </svg>
          </button>
          <button
            aria-label="List view"
            className=" grid grid-cols-1 items-center"
            onClick={() => {
              GridSelect("grid-cols-box3 gap-4");
            }}
          >
            <svg className="w-7 h-1">
              <rect className="w-8 h-[3px]" fill="gray" />
            </svg>
            <svg className="w-7 h-1">
              <rect className="w-8 h-[3px]" fill="gray" />
            </svg>
            <svg className="w-7 h-1">
              <rect className="w-8 h-[3px]" fill="gray" />
            </svg>
            <svg className="w-7 h-1">
              <rect className="w-8 h-[3px]" fill="gray" />
            </svg>
          </button>
        </div>

        <div className="w-[76%] h-full flex justify-center items-center border-x-2 border-gray-400">
          <h1 className="text-sm font-medium">{Product.length} Products</h1>
        </div>

        <div ref={sortRef} className="w-[12%] h-full relative flex justify-center items-center" >
          <button
            className="flex items-center gap-1 text-sm"
            aria-label="Sort options"
            onClick={SortBar}
          >
            SORT BY{openSort ? <TbChevronDown /> : <TbChevronUp />}
          </button>
          {openSort && (
            <div
              role="menu"
              className="absolute top-12 right-0 w-40 flex flex-col bg-white border border-gray-300 shadow-md z-10 rounded-sm"
            >
              {sortOptions.map((option, index) => (
                <button
                  key={index}
                  className="py-2 px-3 text-gray-600 text-left hover:bg-gray-100 hover:text-gray-800 transition"
                  role="menuitem"
                  onClick={() => {
                    console.log(`Selected sort: ${option}`);
                    setOpenSort(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default FilterSide