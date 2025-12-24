import React from 'react'
import { Routes, Route } from "react-router";

import Dashbord from "./pages/Dashbord";
import ProductsList from "./components/products/ProductList";
import ProductInfo from "./components/products/ProducctInfo";
import EditProduct from './components/products/productEdit';
import UploadProduct from "./components/products/UploadProduct";
import Orders from "./pages/Oders";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Charts from "./pages/Charts";
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Signin';

const AllRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashbord />} />
      <Route exact path="productlist" element={<ProductsList />} />
      <Route exact path="productinfo/:_id" element={<ProductInfo />} />
      <Route exact path='editproduct/:_id' element={<EditProduct/>}/>
      <Route exact path="uploadproduct" element={<UploadProduct />} />
      <Route exact path="orders" element={<Orders />} />
      <Route exact path="users" element={<Users />} />
      <Route exact path="transactions" element={<Transactions />} />
      <Route exact path="charts" element={<Charts />} />
      
      <Route exact path="signup" element={<Signup />} />
      <Route exact path="login" element={<Login />} />
    </Routes>
  );
}

export default AllRoutes