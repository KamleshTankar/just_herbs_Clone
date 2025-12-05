import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TbLetterX, TbArrowNarrowRight } from "react-icons/tb";
// import {DELETECART, INCRESEQUANTITY, DECRESEQUANTITY} from "../../slice/CartSlice"
import { GetAllCart } from "../../Redux-Toolkit/Slices/CartSlice";

const Cart = ({ isClose, isOpen }) => {
  const [animateId, setAnimateId] = useState(null);
  const [guestCart, setGuestCart] = useState(() => {
    return JSON.parse(localStorage.getItem("Cartitem")) || [];
  });

  const cartRef = useRef(null);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.Cart);
  const { user } = useSelector((state) => state.User);

  useEffect(() => {
    if (user?._id) {
      dispatch(GetAllCart({ id: user._id }));
    }
  }, [user?._id, dispatch]);

    const subtotal = useMemo(() => {
      const items = user ? cartItems : guestCart;
      return items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    }, [user, cartItems, guestCart]);
  
  const syncLocalStorage = (updated) => {
        setGuestCart(updated);
        localStorage.setItem("Cartitem", JSON.stringify(updated));
  };
  
  const runBounceAnimation = (id) => {
    setAnimateId(id);
    setTimeout(() => setAnimateId(null), 300);
  }

  const increaseQuantity = useCallback((id) => {
        if (user) {          
          // dispatch(INCRESEQUANTITY(id, quantity));
          console.log(id);
        } else {
            const updated = guestCart.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
            syncLocalStorage(updated);
            runBounceAnimation(id);
        }
  },[user, guestCart]);

  const decreaseQuantity = useCallback((id) => {
        if (user) {          
          // dispatch(DECRESEQUANTITY(id, quantity));
          console.log(id);
        } else {
          const updated = guestCart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
            syncLocalStorage(updated);
            runBounceAnimation(id);
          
        }
  },[user, guestCart]);
  
  const removeFromCart = useCallback((id) => {
        if (user) {
          // dispatch(DELETECART(id));
          console.log(id);
        } else {
          const updated = guestCart.filter((item) => item.id !== id);
          syncLocalStorage(updated);
        }
      }, [user,guestCart]);
  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (isOpen && cartRef.current && !cartRef.current.contains(e.target)) {
          isClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, isClose]);

  return (
    <aside ref={cartRef}
      className={`fixed top-0 right-0 z-91 bg-white h-screen w-full lap:max-w-[40vw] tab:w-[35vw] shadow-xl transition-transform duration-500 ease-[cubic-bezier(.25,.8.25,1)] 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className=" flex justify-between items-center px-7 py-4 border-b border-gray-200">
        <h2 className=" text-2xl lap:text-lg">
          Your Shopping Cart ({user ? cartItems.length : guestCart.length})
        </h2>
        <button
          onClick={() => isClose()}
          aria-label="close-cart-button"
          className="text-4xl"
        >
          <TbArrowNarrowRight />
        </button>
      </div>

      <div className=" h-[70vh] overflow-y-auto px-4 py-3">
        {user
          ? cartItems.map((item) => (
            <div
            key={item.id}
            className="flex items-start gap-3 mb-4 border border-gray-300 p-2 rounded-md relative bg-gray-50 animate-fade-in"
            >
                {/* Product Image */}
                <div className="w-[25vw] lap:w-[10vw] h-[13vh] lap:h-[18vh]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 pl-4">
                  <h2 className="text-base font-semibold truncate">
                    {item.name}
                  </h2>

                  <div className="flex items-center mt-2 gap-4">
                    {/* Quantity */}
                    <div className="flex border border-black text-sm rounded">
                      <button
                        className="w-8 h-8 bg-gray-200 border-r border-black"
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                      >
                        -
                      </button>
                      <div className="w-8 h-8 flex items-center justify-center">
                        {" "}
                        {item.quantity}{" "}
                      </div>
                      <button
                        className="w-8 h-8 bg-gray-200 border-l border-black"
                        onClick={() => increaseQuantity(item.id, item.quantity)}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-sm font-medium">${item.price}</p>

                    {/* Total Price */}
                    <p className="text-sm font-medium">
                      ${parseFloat(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="absolute right-2 top-2 text-xl text-gray-600 hover:text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  <TbLetterX />
                </button>
              </div>
            ))
          : guestCart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 mb-4 border border-gray-300 p-2 rounded-md relative bg-gray-50 animate-fade-in"
              >
                {/* Product Image */}
                <div className="w-[25vw] lap:w-[10vw] h-[13vh] lap:h-[18vh]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 pl-4">
                  <h2 className="text-base font-semibold truncate">
                    {item.name}
                  </h2>

                  <div className="flex items-center mt-2 gap-4">
                    {/* Quantity */}
                  <div className={`flex border border-black text-sm rounded transition
                      ${animateId === item.id ? "animate-quantity-bounce":""}`}>
                      <button
                        className="w-8 h-8 bg-gray-200 border-r border-black"
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                      >
                        -
                      </button>
                      <div className="w-8 h-8 flex items-center justify-center">
                        {item.quantity}
                      </div>
                      <button
                        className="w-8 h-8 bg-gray-200 border-l border-black"
                        onClick={() => increaseQuantity(item.id, item.quantity)}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-sm font-medium">${item.price}</p>

                    {/* Total Price */}
                    <p className="text-sm font-medium">
                      ${parseFloat(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="absolute right-2 top-2 text-xl text-gray-600 hover:text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  <TbLetterX />
                </button>
              </div>
            ))}
      </div>

      <div className=" flex justify-center items-center gap-8 border-t-2 border-dashed border-black py-4 bg-white">
        <div>
          Subtotal ({user ? cartItems.length : guestCart.length}):
          <span className="text-xl font-semibold font-mono">
            $ {parseFloat(subtotal).toFixed(2)}
          </span>
        </div>
        <button className="w-[200px] text-4h font-semibold p-3 rounded-md border-2 border-black text-black bg-transparent hover:bg-black hover:text-white hover:border-black transition">
          Go To Checkout
        </button>
      </div>
    </aside>
  );
}

export default Cart
  
