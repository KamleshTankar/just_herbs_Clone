import React, { useState } from 'react'

import Navbar from './navbar/Navbar'

const Header = ({ isOpen, setIsOpen }) => {
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return (
    <header className={`w-full h-auto relative ${sticky ? "bg-yellow-100" : "bg-red-100"}`}>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header