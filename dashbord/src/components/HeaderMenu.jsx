import { React, useState, useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux-toolkit/Slice/AuthSlice";
import { jwtDecode } from "jwt-decode";

import { TbShoppingCart, TbBell, TbMail, TbUserCircle } from "react-icons/tb";
import { RiMenuUnfold4Line } from "react-icons/ri";
import Logo from "../assets/image_Logo.png"


const HeaderMenu = ({ isOpen, setIsOpen }) => {

  const [open, setOpen] = useState(false);
  const [bell, setBell] = useState(false);
  const [orders, setOrders] = useState(false);
  const [User, setUser] = useState(false);

  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.Auth);
  
  const Close = () => {
    setOpen(!open);
    if (!open) {
      setBell(false);
      setOrders(false);
      setUser(false);
    }
  };
  const togglebell = () => {
    setBell(!bell);
    if (!bell) {
      setOpen(false);
      setOrders(false);
      setUser(false);
    }
  };
  const toggleOrder = () => {
    setOrders(!orders);
    if (!orders) {
      setOpen(false);
      setBell(false);
      setUser(false);
    }
  };
  const toggleAuth = () => {
    setUser(!User);
    if (!User) {
      setOpen(false);
      setBell(false);
      setOrders(false);
    }
  };
  
  const handelLogout = () => {
    dispatch(logout());
  }

  const currenttoken = token;

  useEffect(() => {
    if (currenttoken) {
      const decodeToken = jwtDecode(currenttoken);
      if (decodeToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  }, [currenttoken, dispatch]);

  return (
    <header className="w-full h-14 bg-gray-400 flex">
      <div className="w-full lap:w-[60%] tab:w-3/4 flex items-center justify-center gap-8 px-4">
        <div>
          <Link to="/">
          <img src={Logo} alt="logo" />
          </Link>
        </div>
        <button
          aria-label="Close the menu"
          className="w-6 h-6 flex justify-center items-center bg-gray-100 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <RiMenuUnfold4Line />
        </button>
        <div className=" tab:block lap:block">
          <input type="search" placeholder="search" />
        </div>
      </div>
      <div className="lap:w-[40%] tab:w-3/12 lap:flex lap:items-center lap:justify-end lap:pr-16 lap:gap-6 px-4 hidden tab:flex tab:items-center tab:justify-center tab:gap-6">
        <div className="relative font-semibold text-center" onClick={() => Close()}>
          <TbMail className=" text-2xl" />
          <div className={`${open ? "block before:content-[''] before:border-b-[17px] before:border-solid before:border-b-white before:border-r-[10px] before:border-r-transparent before:border-l-[10px] before:border-l-transparent before:absolute before:-top-4 before:right-[6.5rem]":"hidden"} " w-56 h-64 bg-white absolute z-20 -left-24 top-9 rounded-lg py-1 "`}>
            <div className=" text-xl py-1 border-b-[1px] border-solid border-gray-500">mail</div>
            <div className="h-40 bg-blue-100 my-1 overflow-y-scrollscroll">mails</div>
            <button type="submit" className=" bg-blue-500 w-4/5 h-9 rounded-md">View All Mail</button>
          </div>
        </div>
        <div className="relative font-semibold text-center" onClick={()=> togglebell()}>
          <TbBell className=" text-2xl" />
        <div className={`${bell ? "block before:content-[''] before:border-b-[17px] before:border-solid before:border-b-white before:border-r-[10px] before:border-r-transparent before:border-l-[10px] before:border-l-transparent before:absolute before:-top-4 before:right-[6.5rem]":"hidden"} " w-56 h-64 bg-white absolute z-20 -left-24 top-9 rounded-lg py-1 " `}>
            <div className=" text-xl py-1 border-b-[1px] border-solid border-gray-500">Order</div>
            <div className="h-40 bg-blue-100 my-1 overflow-y-scrollscroll">orders</div>
            <button type="submit" className=" bg-blue-500 w-4/5 h-9 rounded-md">View All Orders</button>
          </div>
        </div>
        <div className="relative font-semibold text-center" onClick={()=> toggleOrder()}>
          <TbShoppingCart className=" text-2xl" />
        <div className={`${orders ? "block before:content-[''] before:border-b-[17px] before:border-solid before:border-b-white before:border-r-[10px] before:border-r-transparent before:border-l-[10px] before:border-l-transparent before:absolute before:-top-4 before:right-[6.5rem]":"hidden"} " w-56 h-64 bg-white absolute z-20 -left-24 top-9 rounded-lg py-1 " `}>
            <div className=" text-xl py-1 border-b-[1px] border-solid border-gray-500">Cart</div>
            <div className="h-40 bg-blue-100 my-1 overflow-y-scrollscroll">carts</div>
            <button type="submit" className=" bg-blue-500 w-4/5 h-9 rounded-md">View All Cart</button>
          </div>
        </div>
        <div className="relative font-semiboldb text-center" onClick={() => toggleAuth()}>
          {user === null ? <span> <TbUserCircle className=" text-2xl" /> </span>
          : <span className=" font-heading uppercase">{user?.name}</span>}
        <div className={`${User ? "block before:content-[''] before:border-b-[17px] before:border-solid before:border-b-white before:border-r-[10px] before:border-r-transparent before:border-l-[10px] before:border-l-transparent before:absolute before:-top-4 before:left-12":"hidden"} " w-auto h-auto bg-white absolute z-20 -left-12 top-9 rounded-lg py-1 "`}>
            {user === null ?
              <div className=" w-28 h-20">
            <div className=" cursor-pointer text-lg font-mono my-1 py-1 hover:text-blue-600 hover:bg-gray-200"><Link to="/login">Login</Link></div>
            <div className=" cursor-pointer text-lg font-mono my-1 py-1 hover:text-blue-600 hover:bg-gray-200"><Link to="/signup">Signup</Link></div>
              </div> : <div className=" w-36 h-28">
            <div className=" cursor-pointer text-base font-mono my-1 px-2 py-1 hover:bg-gray-100 hover:text-blue-600"><Link to="/profile">Profile</Link></div>
            <div className=" cursor-pointer text-base font-mono my-1 px-2 py-1 hover:bg-gray-100 hover:text-blue-600"><Link to="/resetpassword">Reset Password</Link></div>
            <div className=" cursor-pointer text-base font-mono my-1 px-2 py-1 hover:bg-gray-100 hover:text-blue-600" onClick={handelLogout}>LogOut</div>
              </div>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu