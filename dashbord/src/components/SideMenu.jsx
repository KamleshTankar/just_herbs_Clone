import { useState } from 'react'
import { NavLink, Link } from 'react-router'

import { TbLayoutDashboardFilled, TbShoppingCart, TbUserSquare, TbChartHistogram, TbChevronRight, TbChevronDown } from "react-icons/tb";

const SideMenu = ({isOpen, isClose}) => {
  const [active, setActive] = useState(false);

  const Option = () => {
    setActive(!active);
  }

  return (
    <section
      className={`${isOpen ? "-left-full" : "left-0"} 
      " w-[25vw] h-full -left-full absolute -top-2 z-20 bg-red-300"`}
    >
      <div className="h-full w-full bg-orange-200 px-4 pt-2">
        <h3 className=" text-2xl font-semibold p-2">Menu</h3>
        <ul className=" mt-8">
          <li className="h-10 text-xl font-medium border-b-2 border-gray-500 my-6 hover:bg-gray-200">
            <NavLink to="/" onClick={() => isClose()}>
              <button className="w-full flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <TbLayoutDashboardFilled />
                  Dashbord
                </span>
                <span>
                  <TbChevronRight />
                </span>
              </button>
            </NavLink>
          </li>
          <li
            className={`${
              active ? "h-auto" : "h-10"
            } text-xl font-medium border-b-2 border-gray-500 my-6 hover:bg-gray-200`}
          >
            <button
              className="w-full flex items-center justify-between"
              onClick={Option}
            >
              <span className="flex items-center gap-1">
                <TbLayoutDashboardFilled /> Products
              </span>
              <span>{active ? <TbChevronDown /> : <TbChevronRight />}</span>
            </button>
            <div className={`mb-1 ${active ? "block" : "hidden"}`}>
              <ul>
                <Link to="productlist" onClick={() => isClose()}>
                  <li className="text-xl font-medium p-2 hover:bg-gray-300">
                    {" "}
                    product list{" "}
                  </li>
                </Link>
                <Link to="uploadproduct" onClick={() => isClose()}>
                  <li className="text-xl font-medium p-2 hover:bg-gray-300">
                    {" "}
                    add new product{" "}
                  </li>
                </Link>
                <Link to="productinfo" onClick={() => isClose()}>
                  <li className="text-xl font-medium p-2 hover:bg-gray-300">
                    {" "}
                    product info{" "}
                  </li>
                </Link>
              </ul>
            </div>
            {/* <NavLink to="products">Products</NavLink> */}
          </li>
          <li className="h-10 text-xl font-medium border-b-2 border-gray-500 my-6 hover:bg-gray-200">
            <NavLink to="orders" onClick={() => isClose()}>
              <button className="w-full flex items-center justify-between">
                <span className=" flex items-center gap-1">
                  <TbShoppingCart /> Orders
                </span>
                <span>
                  <TbChevronRight />
                </span>
              </button>
            </NavLink>
          </li>
          <li className="h-10 text-xl font-medium border-b-2 border-gray-500 my-6 hover:bg-gray-200">
            <NavLink to="users" onClick={() => isClose()}>
              <button className="w-full flex items-center justify-between">
                <span className=" flex items-center gap-1">
                  <TbUserSquare /> Users
                </span>
                <span>
                  <TbChevronRight />
                </span>
              </button>
            </NavLink>
          </li>
          <li className="h-10 text-xl font-medium border-b-2 border-gray-500 my-6 hover:bg-gray-200">
            <NavLink to="transactions" onClick={() => isClose()}>
              <button className="w-full flex items-center justify-between">
                <span className=" flex items-center gap-1">
                  <TbLayoutDashboardFilled /> Transaction
                </span>
                <span>
                  <TbChevronRight />
                </span>
              </button>
            </NavLink>
          </li>
          <li className="h-10 text-xl font-medium border-b-2 border-gray-500 my-6 hover:bg-gray-200">
            <NavLink to="charts" onClick={() => isClose()}>
              <button className="w-full flex items-center justify-between">
                <span className=" flex items-center gap-1">
                  <TbChartHistogram />
                  Charts
                </span>
                <span>
                  <TbChevronRight />
                </span>
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SideMenu