import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../Api/Api";

export const getallproduct = createAsyncThunk("getallproducts", async () => {
  const response = await API_URL.get("/user/Getallproducts");
  return response.data;
});


export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    error: null,
    status: "idel",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getallproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action?.payload;
        state.status = "successsed";
      })
      .addCase(getallproduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ProductSlice.reducer;