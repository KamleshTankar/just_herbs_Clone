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

router.post("/addtocart", addproduct);
router.patch("/increseQuantity", auth, increseQuantity);
router.patch("/decreseQuantity", auth, decreseQuantity);
router.delete("/deleteCart", auth, deleteCartproduct);
router.post("/AllCarts", getAllCarts);

router.post("/createorder", createOrder);
router.get("/myorders/:id", getMyOrders);


export default router;
