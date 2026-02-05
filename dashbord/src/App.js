import './App.css';
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter as Router } from 'react-router';

import Navbar from './components/HeaderMenu'
import SideMenu from './components/SideMenu';
import AllRoutes from "./AllRoutes";
import { useState } from 'react';

function App() {
  const [isopen, setIsOpen] = useState(true);

  const isClose = () => {
    setIsOpen(!isopen);
  };

  return (
    <SkeletonTheme baseColor="#76b5c5">
    <Router>
        <Navbar isOpen={isopen} setIsOpen={setIsOpen} />
      <div className='relative bg-gray-200'>
        <SideMenu isOpen={isopen} isClose={isClose}/>
        <AllRoutes />
      </div>
    </Router>
    </SkeletonTheme>
  );
}

export default App;
