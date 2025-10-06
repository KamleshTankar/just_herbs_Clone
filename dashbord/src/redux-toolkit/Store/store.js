import { configureStore, combineSlices } from "@reduxjs/toolkit";
import  AuthSlice from "../Slice/AuthSlice"
import ProductSlice from "../Slice/ProductSlice";
import UserSlice from "../Slice/usersSlice";

const rootReducer = combineSlices({ Auth: AuthSlice, Product: ProductSlice, Allusers: UserSlice, });

export const store = configureStore({
  reducer: rootReducer,
});
