import React, { useState, useEffect } from 'react'

import { TbChevronUp, TbChevronDown } from "react-icons/tb";

const FilterSide = ({GridSelect, Product}) => {
  const [opensort, setOpenSort] = useState(false);
  const [sticky, setSticky] = useState(false);

  const SortBar = () => {
    setOpenSort(!opensort);
  }

  useEffect(() => {
    const handleScroll = () => { setSticky(window.scrollY > 290); };
  
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  return (
    <>
      <aside
        className={`w-full h-12 z-20 flex items-center bg-white border-y border-black px-4 
        ${sticky ? "fixed top-[4rem]" : "top-[26.7rem]"}`}
      >
        <div className="w-[12%] h-6 flex justify-center items-center gap-2 ">
          <button
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
          <h4 className="text-sm font-medium">{Product.length} Products</h4>
        </div>

        <div className="w-[12%] h-full relative flex justify-center items-center">
          <button className="flex items-center gap-1 text-sm" aria-label="Sort options"
            onClick={SortBar} >
            SORT BY{opensort ? <TbChevronDown /> : <TbChevronUp />}
          </button>
          <div
            className={`w-full flex flex-col absolute top-12 bg-slate-300 z-1 ${
              opensort ? "" : "hidden"
            }`}
          >
            <button className="my-2 text-gray-400 text-start hover:text-gray-700">
              Featured
            </button>
            <button className="my-2 text-gray-400 text-start hover:text-gray-700">
              Best selling
            </button>
            <button className="my-2 text-gray-400 text-start hover:text-gray-700">
              A-z
            </button>
            <button className="my-2 text-gray-400 text-start hover:text-gray-700">
              Price, low-high
            </button>
            <button className="my-2 text-gray-400 text-start hover:text-gray-700">
              Price, high-low
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default FilterSide