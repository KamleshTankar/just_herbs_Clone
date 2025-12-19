import express from "express";

import { login, signup, getAllUsers, RemoveUser } from "../controlers/Admin/Adminauth.js";

import { Getallproducts, Addproduct, Updateproduct, Deleteproduct } from "../controlers/Admin/Products.js";

import { getAllOrders, viewOrderById, updateOrderStatus, deleteOrder } from "../controlers/Admin/Oderscontroler.js";

import { upload } from "../middlewares/upload/upload.middlewares.js";
// import auth from "../middlewares/Authmiddle.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.delete("/removeuser/:id", RemoveUser);

router.get("/Getallproducts", Getallproducts);
router.post("/Addproduct", upload.fields([{name:"images", maxCount:7}]), Addproduct);
router.patch("/Updateproduct", Updateproduct);
router.delete("/Deleteproduct", Deleteproduct);

router.get("/allorders", getAllOrders);
router.get("/vieworder/:id", viewOrderById);
router.patch("/updateorderstatus/:id", updateOrderStatus);
router.delete("/deleteorder/:id", deleteOrder);


export default router;