import React,{useState} from 'react'
import { Link } from "react-router";

const Footer = () => {
  const [email, setEmail] = useState("");

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email.trim()) {
        alert("Please enter a valid email address.");
        return;
      }
      alert(`Thank you for subscribing, ${email}!`);
      setEmail("");
    };

  return (
      <footer className="lap:max-w-8lx mx-auto mt-16 py-4 grid grid-cols-com lap:grid-cols-inp tab:grid-cols-ft2t tab:text-left gap-32 justify-center text-center lap:text-left text-black">
        <div>
            <Link to="/" onClick={goTop} className=' inline-block mb-4 text-h5 text-center'>
              <h2 className="text-2xl font-semibold tracking-wide">JUST HERBS</h2>
            </Link>
          <p className=" mb-12 leading-relaxed text-gray-500 text-spn">
            A line of pure, bespoke and Ayurvedic results-driven skin and hair
            care made from certified organic and wildcrafted ingredients
            collected from across India..
          </p>
        </div>

        <div>
          <h2 className=" text-h5 mb-4 uppercase font-titles"> ABOUT </h2>
        <ul className=" list-none space-y-2 text-sm">
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
        </div>

        <div>
          <h2 className="text-h5 mb-4 uppercase font-titles cursor-auto"> HELP </h2>
        <ul className="list-none space-y-2 text-sm">
          <li className="mb-4 text-span">Contact Us</li>
          <li className="mb-4 text-span">Privacy Policy</li>
          <li className="mb-4 text-span">Refund Policy</li>
          <li className="mb-4 text-span">Shipping Policy</li>
          <li className="mb-4 text-span">Terms of Service</li>
          <li className="mb-4 text-span">Track Your Order</li>
        </ul>
        </div>

        <div>
          <h2 className="text-h5 mb-4 uppercase font-titles cursor-auto"> STAY UPDATED </h2>
          <p className="mb-4 text-gray-600 text-span">
            Sign Up for our newsletter to know all about launches & offers!
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="email" className="sr-only"> Email Address </label>
          <input id="email" type="email" name="email"
            aria-label="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <button
            type="submit"
            className="text-white font-semibold bg-[#8B4513] py-2.5 px-6 rounded-full transition-all border-2 border-transparent hover:bg-white hover:text-[#8B4513] hover:border-[#8B4513] shadow-md"
          >
            Subscribe
          </button>
        </form>
        </div>

      </footer>
  );
}

export default Footer