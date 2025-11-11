import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";

const Sidemenu = ({ onAvailabilityChange=()=>{}, onPriceChange=()=>{} }) => {
  const [maxPrice, setMaxPrice] = useState(10000);

  const handlePriceChange = (value) => {
    setMaxPrice(value);
    onPriceChange(value);
  };

    const handleAvailabilityChange = (e) => {
      onAvailabilityChange(e.target.checked);
  };
  
    const menuItems = [
      { label: "Skin", path: "/perfumes" },
      { label: "Hair", path: "/attars" },
      { label: "Bath&Body", path: "/air" },
      { label: "Makeup", path: "/oil" },
      { label: "Fragrances", path: "/skin" },
      { label: "Gifting", path: "/gift" },
  ];
  
   const useAnimatedDetails = () => {
     const ref = useRef(null);

     useEffect(() => {
       const el = ref.current;
       if (!el) return;

       const summary = el.querySelector("summary");
       const content = el.querySelector(".details-content");

       if (!summary || !content) return;

       const handleToggle = (e) => {
         e.preventDefault();
         const isOpen = el.hasAttribute("open");

         if (isOpen) {
           // Animate closing
           const sectionHeight = content.scrollHeight;
           content.style.height = `${sectionHeight}px`;

           requestAnimationFrame(() => {
             content.style.height = "0px";
           });

           setTimeout(() => el.removeAttribute("open"), 300);
         } else {
           // Animate opening
           el.setAttribute("open", "");
           const sectionHeight = content.scrollHeight;
           content.style.height = "0px";

           requestAnimationFrame(() => {
             content.style.height = `${sectionHeight}px`;
           });

           setTimeout(() => {
             content.style.height = "auto";
           }, 900);
         }
       };

       summary.addEventListener("click", handleToggle);
       return () => summary.removeEventListener("click", handleToggle);
     }, []);

     return ref;
   };
  
   // Instances for each collapsible section
   const mainMenuRef = useAnimatedDetails();
   const availabilityRef = useAnimatedDetails();
   const priceRef = useAnimatedDetails();

  return (
    <aside className="w-full sm:w-[30%] px-4 pt-2 border-2 border-gray-300 rounded-md bg-white shadow-sm">
      <details ref={mainMenuRef} className="border-b-2 mt-2 border-gray-300" open>
        <summary className="h-10 px-2 flex justify-between items-center cursor-pointer select-none">
          <span className="font-medium text-gray-800">Main Menu</span>
          <TbChevronDown className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <ul className="bg-gray-50 mt-2 space-y-1 pl-4 py-2 text-sm">
          {menuItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="block py-1 hover:text-orange-500 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </details>

      <details ref={availabilityRef} className="border-b-2 border-gray-300 mt-2" open>
        <summary className="h-10 px-2 flex justify-between items-center cursor-pointer select-none">
          <span className="font-medium text-gray-800">Availability</span>
          <TbChevronDown className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="pl-4 py-2">
          <label
            htmlFor="in-stock"
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              id="in-stock"
              onChange={handleAvailabilityChange}
              className="accent-orange-500"
            />
            In Stock
          </label>
        </div>
      </details>

      <details ref={priceRef} className="border-b-2 border-gray-300 mt-2" open>
        <summary className="h-10 px-2 flex justify-between items-center cursor-pointer select-none">
          <span className="font-medium text-gray-800">Price</span>
          <TbChevronDown className="transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="pl-4 py-2">
          <input
            type="range"
            id="price-range"
            min="0"
            max="10000"
            value={maxPrice}
            aria-label="price-rangr"
            step="100"
            className="w-full accent-orange-500 cursor-pointer"
            onChange={(e) => handlePriceChange(Number(e.target.value))}
          />
          <p className="text-sm mt-1 text-gray-700">
            Max Price: ₹{maxPrice.toLocaleString()}
          </p>
        </div>
      </details>
    </aside>
  );
};

export default Sidemenu;
