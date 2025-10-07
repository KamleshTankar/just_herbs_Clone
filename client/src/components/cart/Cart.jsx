import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
 
import { TbLetterX, TbArrowNarrowRight } from "react-icons/tb";
// import {DELETECART, INCRESEQUANTITY, DECRESEQUANTITY} from "../../slice/CartSlice"
 
const Cart = ({ isClose, isOpen }) => {
  const [total, setTotal] = useState(0);
  // const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.Cart);

    useEffect(() => {
      if (cartItems) {
        const Total = cartItems.reduce((accu, curr) => {
          return accu + curr.price * curr.quantity;
        }, 0);
        setTotal(Total);
      }
      if (cartItems && cartItems.length > 0) {
        const calculatedTotal = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setTotal(calculatedTotal);
      } else {
        setTotal(0);
      }
    }, [cartItems]);

      const increaseQuantity = (id, quantity) => {
        if (quantity >= 1) {
          // dispatch(INCRESEQUANTITY(id, quantity));
        }
      };

      const decreaseQuantity = (id, quantity) => {
        if (quantity > 1) {
          // dispatch(DECRESEQUANTITY(id, quantity));
        }
      };
      const removeFromCart = (id) => {
        // dispatch(DELETECART(id));
      };

  return (
    <aside
      className={`${
        isOpen ? "right-0" : "right-full"
      } " w-full h-screen lap:max-w-[40vw] tab:w-[35vw] lap:h-full bg-white fixed right-0 top-0 z-91 mx-auto"`}
    >
      <div className=" flex justify-between my-4 px-7">
        <h2 className=" text-2xl lap:text-lg">
          Your shopping cart ({cartItems.length})
        </h2>
        <button
          onClick={() => isClose()} aria-label="close-cart-button"
          className=" font-medium text-4xl lap:text-h4"
        >
          <TbArrowNarrowRight />
        </button>
      </div>

      <div className=" h-[70vh] overflow-y-scroll">
        {cartItems.length === 0 ? (
          <p className="text-center mt-10 text-lg">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-start mb-4 border border-black p-2 relative"
            >
              {/* Product Image */}
              <div className="w-[25vw] lap:w-[10vw] h-[13vh] lap:h-[18vh]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 pl-4">
                <h2 className="text-base font-semibold truncate">
                  {item.title}
                </h2>
                <div className="flex items-center mt-2 gap-4">
                  {/* Quantity */}
                  <div className="flex border border-black text-sm">
                    <button
                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                      className="w-8 h-8 bg-gray-200 border-r border-black"
                    >
                      -
                    </button>
                    <div className="w-8 h-8 flex items-center justify-center">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => increaseQuantity(item.id, item.quantity)}
                      className="w-8 h-8 bg-gray-200 border-l border-black"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-sm font-medium">${item.price}</p>
                  </div>

                  {/* Total Price */}
                  <div>
                    <p className="text-sm font-medium">
                      ${parseFloat(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="absolute right-2 top-2 text-xl"
              >
                <TbLetterX />
              </button>
            </div>
          ))
        )}
      </div>

      <div className=" flex justify-center items-center gap-8 border-t-2 border-dashed border-black">
        <div> Subtotal ({cartItems.length}): 
          <span className="text-xl font-semibold font-mono">  $ {parseFloat(total).toFixed(2)} </span>
        </div>
        <button className="w-[200px] text-4h font-semibold p-3 my-4 rounded-md border-2 border-black border-solid bg-transparent text-black hover:bg-black hover:text-white hover:border-black">
          Go To Checkout
        </button>
      </div>
    </aside>
  );
}

export default Cart
  
