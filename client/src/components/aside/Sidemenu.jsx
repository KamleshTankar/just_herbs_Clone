import { useState } from "react";
import { Link } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";

const Sidemenu = ({ onAvailabilityChange, onPriceChange }) => {
  const [maxPrice, setMaxPrice] = useState(10000);


  const handlePriceChange = (value) => {
    setMaxPrice(value);
    onPriceChange(value);
  };

  return (
    <aside className="w-[30%] px-4 pt-2 bg-orange-300">
      <details className="border-b-2 border-gray-300" open>
        <summary className="h-10 px-2 flex justify-between items-center cursor-pointer">
          <span>MAIN MENU</span>
          <span>
            <TbChevronDown />
          </span>
        </summary>
        <ul className="bg-gray-100 mt-2 space-y-1 pl-4 py-2 text-sm">
          <li>
            <Link to="/perfumes" className="hover:text-orange-400">
              Perfumes
            </Link>
          </li>
          <li>
            <Link to="/attars" className="hover:text-orange-400">
              Attars
            </Link>
          </li>
          <li>
            <Link to="/air" className="hover:text-orange-400">
              Air
            </Link>
          </li>
          <li>
            <Link to="/skin" className="hover:text-orange-400">
              Skin
            </Link>
          </li>
          <li>
            <Link to="/gift" className="hover:text-orange-400">
              Gift
            </Link>
          </li>
        </ul>
      </details>

      <details className="border-b-2 border-gray-300 mt-2" open>
        <summary className="h-10 px-2 flex justify-between items-center cursor-pointer">
          <span>AVALIBILITY</span>
          <span>
            <TbChevronDown />
          </span>
        </summary>
        <div className="pl-4 py-2">
          <label htmlFor="in-stock" className="flex items-center gap-2">
            <input
              type="checkbox"
              id="in-stock"
              onChange={(e) => onAvailabilityChange(e.target)}
            />
            In Stock
          </label>
        </div>
      </details>

      <details className="border-b-2 border-gray-300 mt-2" open>
        <summary className="h-10 px-2 flex justify-between items-center cursor-pointer">
          <span>PRICE</span>
          <span>
            <TbChevronDown />
          </span>
        </summary>
        <div className="pl-4 py-2">
          <input
            type="range"
            id="price-range"
            min="0"
            max="10000"
            className="w-full"
            onChange={(e) => handlePriceChange(Number(e.target.value))}
          />
          <p className="text-sm mt-1">Max Price: ₹{maxPrice}</p>
        </div>
      </details>
    </aside>
  );
};

export default Sidemenu;
