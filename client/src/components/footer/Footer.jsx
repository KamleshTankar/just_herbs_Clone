import React from 'react'
import { Link } from "react-router";

const Footer = () => {

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="lap:max-w-8lx mx-auto mt-16 py-4 grid grid-cols-com lap:grid-cols-inp tab:grid-cols-ft2t tab:text-left gap-32 justify-center text-center lap:text-left text-black">
        <ul className="list-none">
          <li className=" text-h5 mb-6 text-center">
            <Link to="/" onClick={goTop}>
              {" "}
              <h5 className="text-2xl font-semibold">JUST HERBS</h5>{" "}
            </Link>
          </li>
          <li className=" mb-12 leading-7 text-slate-500 text-spn">
            A line of pure, bespoke and Ayurvedic results-driven skin and hair
            care made from certified organic and wildcrafted ingredients
            collected from across India..
          </li>
        </ul>
        <ul className=" list-none">
          <li className=" text-h5 font-bold mb-6 uppercase font-titles">
            ABOUT
          </li>
          <li className="text-text-black mb-4 text-span cursor-pointer transition-all hover:text-gold">
            Our Story
          </li>
          <li className="text-text-black mb-4 text-span cursor-pointer transition-all hover:text-gold">
            Our Beauty Journal
          </li>
          <li className="text-text-black mb-4 text-span cursor-pointer transition-all hover:text-gold">
            Gifting
          </li>
          <li className="text-text-black mb-4 text-span cursor-pointer transition-all hover:text-gold">
            Ingredients
          </li>
        </ul>
        <ul className="list-none">
          <li className="text-h5 font-bold mb-6 uppercase font-titles cursor-auto">
            {" "}
            HELP{" "}
          </li>
          <li className="mb-4 text-span">Contact Us</li>
          <li className="mb-4 text-span">Privacy Policy</li>
          <li className="mb-4 text-span">Refund Policy</li>
          <li className="mb-4 text-span">Shipping Policy</li>
          <li className="mb-4 text-span">Terms of Service</li>
          <li className="mb-4 text-span">Track Your Order</li>
        </ul>
        <ul className="list-none">
          <li className="text-h5 font-bold mb-6 uppercase font-titles cursor-auto">
            STAY UPDATED
          </li>
          <li className="mb-4 text-span">
            Sign Up for our newsletter to know all about launches & offers!
          </li>
          <li className="mb-4 text-span">
            <input
              className="font-text text-input font-normal leading-6 bg-slate-200 border border-transparent py-in px-in2 outline-0 mt-4 rounded-full"
              type="email"
              name="email"
              placeholder="Enter Email Address"
            />
          </li>
          <li className="mb-4 text-span">
            <button
              className="no-underline text-white font-bold bg-gold py-3 px-8 rounded-full transition-all border-2 border-solid border-white text-p cursor-pointer w-full hover:shadow-2xl hover:bg-white hover:text-black hover:border-gold"
              type="submit"
            >
              Submit
            </button>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Footer