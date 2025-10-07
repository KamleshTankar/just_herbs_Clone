// import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import {jwtDecode} from "jwt-decode";
import { logout } from "../../Redux-Toolkit/Slices/AuthSlice"; 

import { TbSearch, TbShoppingCart } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";

const Navbar = ({ isOpen, setIsOpen }) => {
  const [resnav, setResNav] = useState(false);
  const [sticky, setSticky] = useState(false);

  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.User);

  const handelOpen = () => setResNav(!resnav);

  const handleScroll = () => {
    setSticky(window.scrollY > 0);
  };

  const goTop = () => { window.scrollTo({ top: 0, behavior: "smooth", }); };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    useEffect(() => {
      if (token) {
        try {
          const decodeToken = jwtDecode(token);
          if (decodeToken.exp * 1000 < Date.now()){
            dispatch(logout());
          }
        } catch (error) {
          console.error("Invalid token", error);
          dispatch(logout());
        }
      }
    }, [token, dispatch]);

  return (
    <>
      <div className="w-full fixed top-0 z-50 bg-green-200">
        {!sticky && (
          <div className="w-full h-8 bg-amber-700 flex justify-center items-center text-white text-sm">
            <p> High Festive Demand: Dispatch may take 2-3 extra days </p>
          </div>
        )}

        <div
          className={`"h-32 bg-gray-200 flex items-center relative"
          ${sticky ? "h-16 bg-white shadow-md" : "h-32 bg-gray-200"}`}
        >
          <button className=" block fixed top-8 right-12 z-91 lap:hidden"
            onClick={handelOpen} aria-label="Toggle navigation menu">
            <div className="space-y-1">
              <svg
                width="50"
                height="5"
                className={`my-1 transition-all duration-[0.5s] delay-75 ease-in-out ${
                  resnav ? "-rotate-45 translate-y-1" : ""
                }`}
              >
                <rect x="0" y="0" width="50" height="5" fill="blue" />
              </svg>
              {!resnav && (
                <svg width="50" height="5">
                  <rect x="0" y="0" width="50" height="5" fill="orange" />
                </svg>
              )}
              <svg
                width="50"
                height="5"
                className={`my-1 transition-all duration-[0.5s] delay-75 ease-in-out ${
                  resnav ? "rotate-45 -translate-y-1" : ""
                }`}
              >
                <rect x="0" y="0" width="50" height="5" fill="red" />
              </svg>
            </div>
          </button>

          <div className="lap:w-1/5 lap:h-24 flex justify-center items-center">
            <Link to="/" onClick={goTop}> <h5 className='text-2xl font-semibold'>JUST HERBS</h5> </Link>
          </div>

          <nav
            className={`bg-white w-full h-screen fixed top-0 flex flex-row justify-center z-90 transition-transform duration-300 ease-in-out  
        tab:flex tab:flex-row tab:justify-center tab:w-full tab:fixed lap:bg-transparent lap:relative lap:left-0 lap:w-3/5 lap:h-12 lap:translate-x-0 
          ${resnav ? "" : "-translate-x-full"}`}
          >
            <ul className="flex flex-col lap:flex-row justify-center items-center gap-9 font-semibold list-none text-black">
              <li className="h-full group relative flex items-center justify-center after:content-[''] after:w-[0%] after:hover:w-[100%] after:h-8 after:-z-1 after:absolute after:top-4 after:border-b-4 after:border-orange-500 after:transition-all after:duration-1/5 after:delay-75 after:ease-in-out">
                <Link to="perfumes" onClick={goTop}>
                  Skin
                </Link>
                <ul className="w-36 h-auto bg-slate-100 text-yellow-500 text-center absolute top-12 z-50 hidden group-hover:block">
                  <li className="text-sm h-6 my-3">
                    <Link to="/aquaperfumes" onClick={goTop}>
                      Aqua Perfumes
                    </Link>
                  </li>
                  <li className="text-sm h-6 my-3">
                    <Link to="/oudperfumes" onClick={goTop}>
                      Oud Perfumes
                    </Link>
                  </li>
                  <li className="text-sm h-6 my-3">
                    <Link to="/premiumperfumes" onClick={goTop}>
                      Premium Perfumes
                    </Link>
                  </li>
                  <li className="text-sm h-6 my-3">
                    <Link to="suvarnaperfumes" onClick={goTop}>
                      Suvarna Perfumes
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="h-full group relative flex items-center justify-center after:content-[''] after:w-[0%] after:hover:w-[100%] after:h-8 after:-z-1 after:absolute after:top-4 after:border-b-4 after:border-orange-500 after:transition-all after:duration-1/5 after:delay-75 after:ease-in-out">
                <Link to="attars" onClick={goTop}>
                  Hair
                </Link>
                <ul className="w-32 bg-slate-100 text-yellow-500 text-center absolute top-12 z-50 hidden group-hover:block">
                  <li className="text-sm h-6 my-3">
                    <Link to="/oudattars" onClick={goTop}>
                      Lxury Oud Attar
                    </Link>
                  </li>
                  <li className="text-sm h-6 my-3">
                    <Link to="/suvarnaattars" onClick={goTop}>
                      Suvarna Attar
                    </Link>
                  </li>
                  <li className="text-sm h-6 my-3">
                    <Link to="/premiumattars" onClick={goTop}>
                      Premium Attar
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="h-full group relative flex items-center justify-center after:content-[''] after:w-[0%] after:hover:w-[100%] after:h-8 after:-z-1 after:absolute after:top-4 after:border-b-4 after:border-orange-500 after:transition-all after:duration-1/5 after:delay-75 after:ease-in-out">
                <Link to="air" onClick={goTop}>
                  {" "}
                  Bath & Body{" "}
                </Link>
              </li>
              <li className="h-full group relative flex items-center justify-center after:content-[''] after:w-[0%] after:hover:w-[100%] after:h-8 after:-z-1 after:absolute after:top-4 after:border-b-4 after:border-orange-500 after:transition-all after:duration-1/5 after:delay-75 after:ease-in-out">
                <Link to="oil" onClick={goTop}>
                  {" "}
                  Makeup{" "}
                </Link>
              </li>
              <li className="h-full group relative flex items-center justify-center after:content-[''] after:w-[0%] after:hover:w-[100%] after:h-8 after:-z-1 after:absolute after:top-4 after:border-b-4 after:border-orange-500 after:transition-all after:duration-1/5 after:delay-75 after:ease-in-out">
                <Link to="skin" onClick={goTop}>
                  {" "}
                  Fragrances{" "}
                </Link>
                <ul className="w-32 bg-slate-100 text-yellow-500 text-center absolute top-12 z-50 hidden group-hover:block">
                  <li>
                    <Link to="/toners" onClick={goTop}>
                      Toners
                    </Link>
                  </li>
                  <li>
                    <Link to="/ubtan" onClick={goTop}>
                      Ubtan
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="h-full group relative flex items-center justify-center after:content-[''] after:w-[0%] after:hover:w-[100%] after:h-8 after:-z-1 after:absolute after:top-4 after:border-b-4 after:border-orange-500 after:transition-all after:duration-1/5 after:delay-75 after:ease-in-out">
                <Link to="gift" onClick={goTop}>
                  Gifting
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lap:w-1/5 flex items-center justify-center gap-6">
          
            <div className="w-9 h-9 font-medium text-4xl lap:text-2xl relative group">
              <button aria-label="user-profile" className="w-9 h-9 font-medium text-4xl lap:text-2xl">
                {user ? user.Firstname?.charAt(0) : <FaRegUser />}
              </button>
              <div className=" before:content-[''] before:border-b-[17px] before:border-solid before:border-b-white before:border-r-[10px] before:border-r-transparent 
              before:border-l-[10px] before:border-l-transparent before:absolute before:-top-4 before:left-10 w-auto h-auto bg-white absolute
              z-91 -right-6 top-10 rounded-lg py-1 hidden group-hover:block shadow-lg"
              >
                {user ?  <>
                    <Link to="/profile" onClick={goTop} className="block px-4 py-2 hover:bg-gray-100" > Profile </Link>
                    <Link to="/resetpassword" onClick={goTop} className="block px-4 py-2 hover:bg-gray-100" > Reset Password </Link>
                    <button onClick={() => dispatch(logout())} className="w-full text-left px-4 py-2 hover:bg-gray-100" > Logout </button>
                  </>
                : 
                  <>
                    <Link to="/login" onClick={goTop} className="block px-4 py-1 text-p font-mono hover:bg-gray-100"> Login </Link>
                    <Link to="/signup" onClick={goTop} className="block px-4 py-1 text-p font-mono hover:bg-gray-100"> Signup </Link>
                  </>
                }
              </div>
            </div>

            <button className="w-9 h-9 font-medium text-4xl lap:text-2xl" aria-label="search-button">
              <TbSearch />
            </button>

            <button
              className=" w-9 h-9 flex items-center relative font-medium text-4xl lap:text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <TbShoppingCart />
              { 5 > 0 ?
              <span className="w-6 h-6 absolute right-0 -top-1 text-base text-center font-medium bg-yellow-50 rounded-full">
                0 {/* {user.result.cartItems.length} */}
              </span>
            :
              <span className="w-6 h-6 absolute right-0 -top-1 text-base text-center font-medium rounded-full"></span>
                }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar

