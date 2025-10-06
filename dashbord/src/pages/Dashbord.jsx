import React from 'react'
import { Link } from 'react-router';

import { TbUserCircle, TbShoppingCart } from "react-icons/tb";
import { MdReviews, MdShoppingBag } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

import Banner from '../components/Banner'
import InfoCard from '../components/InfoCard';
import SalesChart from '../components/SalesChart';

const Dashbord = () => {
  return (
    <section className="w-full h-auto">
      <Banner page={"Dashbord"} />
      <div className="w-[95%] h-[70vh] flex flex-col lap:flex-row gap-4 mx-auto my-4">
        <div className="w-[65%] h-[70vh] grid grid-cols-1 tab:grid-cols-2 lap:grid-cols-2 gap-4">
          <Link to="/users">
          <InfoCard
            icbg={"bg-gradient-to-br from-[#00000000] to-[#00000033]"}
            Color={"bg-gradient-to-r from-green-500 to-green-300"}
            title={"Total Users"}
            count={489}
            grow={true}
            Icon={<TbUserCircle className=" opacity-30 text-3xl text-white" />}
            Icon2={<HiDotsVertical />}
          />
          </Link>
          <Link to="orders">
          <InfoCard
            icbg={"bg-gradient-to-br from-[#00000000] to-[#00000033]"}
            Color={"bg-gradient-to-r from-purple-500 to-purple-300"}
            title={"Total Order"}
            count={1000}
            grow={false}
            Icon={<TbShoppingCart className="opacity-30 text-3xl text-white" />}
            Icon2={<HiDotsVertical />}
          />
          </Link>
          <Link to="productlist">
          <InfoCard
            icbg={"bg-gradient-to-br from-[#00000000] to-[#00000033]"}
            Color={"bg-gradient-to-r from-blue-500 to-blue-300"}
            title={"Total Product"}
            count={50}
            grow={true}
            Icon={<MdShoppingBag className="opacity-30 text-3xl text-white" />}
            Icon2={<HiDotsVertical />}
          />
          </Link>
          <Link to="charts">
          <InfoCard
            icbg={"bg-gradient-to-br from-[#00000000] to-[#00000033]"}
            Color={"bg-gradient-to-r from-yellow-500 to-yellow-300"}
            title={"Total Review"}
            count={600}
            grow={false}
            Icon={<MdReviews className="opacity-30 text-3xl text-white" />}
            Icon2={<HiDotsVertical />}
          />
          </Link>
        </div>
        
        <div className="w-[35%] h-[70vh]">
          <Link to="sales">
          <InfoCard
            Color={"bg-blue-400"}
            title={"Total Sales"}
            count={900}
            Icon2={<HiDotsVertical />}
            />
          </Link>
        </div>
      </div>
      <div className="w-[95%] h-[60vh] mx-auto mb-2 bg-white">
        <h1 className="py-3 text-xl font-medium pl-4">Orders</h1>
        <div>
          <div>
            <ul className="h-12 bg-yellow-200 px-2 grid grid-cols-8 gap-3">
              <li>Customer Name</li>
              <li>User ID</li>
              <li>Product Name</li>
              <li>Qty</li>
              <li>Ordered Placed</li>
              <li>Amount</li>
              <li>Payment Status</li>
              <li>Order Status</li>
            </ul>
          </div>
          <div className="py-4 px-2 grid grid-cols-8 border-b border-solid border-gray-300">
            <span>jhon</span>
            <span>1</span>
            <span>lipsblam</span>
            <span>2</span>
            <span>12-12-2020</span>
            <span>220</span>
            <span>paid</span>
            <span>processing</span>
          </div>
          <div className="py-4 px-2 grid grid-cols-8 border-b border-solid border-gray-300">
            <span>jhon</span>
            <span>2</span>
            <span>lipsblam</span>
            <span>2</span>
            <span>12-12-2020</span>
            <span>220</span>
            <span>paid</span>
            <span>processing</span>
          </div>
          <div className="py-4 px-2 grid grid-cols-8 border-b border-solid border-gray-300">
            <span>jhon</span>
            <span>3</span>
            <span>lipsblam</span>
            <span>2</span>
            <span>12-12-2020</span>
            <span>220</span>
            <span>paid</span>
            <span>processing</span>
          </div>
          <div className="py-4 px-2 grid grid-cols-8 border-b border-solid border-gray-300">
            <span>jhon</span>
            <span>4</span>
            <span>lipsblam</span>
            <span>2</span>
            <span>12-12-2020</span>
            <span>220</span>
            <span>paid</span>
            <span>processing</span>
          </div>
        </div>
      </div>
      <SalesChart />
    </section>
  );
}

export default Dashbord