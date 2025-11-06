import { useState } from "react";
import "./App.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

import { BrowserRouter as Router } from "react-router";

import Header from "./components/Header";
import AllRoutes from "./AllRoutes";
import Footer from "./components/footer/Footer";
import Cart from "./components/cart/Cart";
function App() {
  const [isOpen, setIsOpen] = useState();

  const isClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SkeletonTheme baseColor="#76b5c5">
      <Router>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <Cart isClose={isClose} isOpen={isOpen} />
        <div className="relative top-[10rem]">
        <AllRoutes />
        <Footer />
        </div>
      </Router>
    </SkeletonTheme>
  );
}

export default App;
