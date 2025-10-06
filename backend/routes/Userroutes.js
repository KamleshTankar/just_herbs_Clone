import express from "express";

import { login, signup, updateProfile } from "../controlers/User/Userauth.js";

import { addproduct, increseQuantity, decreseQuantity, deleteCartproduct, getAllCarts } from "../controlers/User/Cartauth.js";

import { Getallproducts } from "../controlers/Admin/Products.js";

// import { createOrder } from "../controlers/User/Odercontroler.js";
import { createOrder, getMyOrders } from "../controlers/User/Odercontroler.js";

import auth from "../middlewares/Authmiddle.js";


const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.patch("/updateprofile/:id", updateProfile);

router.get("/Getallproducts", Getallproducts);

router.post("/addtocart/:id", addproduct);
router.patch("/increseQuantity/:id", auth, increseQuantity);
router.patch("/decreseQuantity/:id", auth, decreseQuantity);
router.delete("/deleteCart/:id", auth, deleteCartproduct);
router.get("/AllCarts/:id", getAllCarts);

router.post("/createorder", createOrder);
router.get("/myorders/:id", getMyOrders);


export default router;
