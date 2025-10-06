import { configureStore, combineSlices } from "@reduxjs/toolkit";
import  AuthSlice from "../Slices/AuthSlice"
import ProductSlice from "../Slices/ProductSlice";
import CartSlice from "../Slices/CartSlice";
import OrderSlice from "../Slices/OrderSlice"; 


// const rootReducer = combineSlices({ User: AuthSlice,});
const rootReducer = combineSlices({ User: AuthSlice, ProductsList: ProductSlice, Cart:CartSlice, Order:OrderSlice });

export const store = configureStore({
  reducer: rootReducer,
});