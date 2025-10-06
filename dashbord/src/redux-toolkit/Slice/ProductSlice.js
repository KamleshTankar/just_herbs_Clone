import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../Api/Api";

export const getallproduct = createAsyncThunk("getallproducts", async () => {
  const response = await API_URL.get("/admin/Getallproducts");
  return response.data;
});

export const addproduct = createAsyncThunk('addproduct', async (productdata) => {
  const response = await API_URL.post('/admin/Addproduct', productdata);
  return response.data;
});

export const updateproduct = createAsyncThunk('admin/addproduct', async (productdata) => {
  const response = await API_URL.patch('/admin/Addproduct',productdata);
  return response.data;
});

export const deleteproduct = createAsyncThunk('admin/deleteproduct', async () => {
  const response = await API_URL.delete('/admin/Deleteproduct');
  return response.data;
});


export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    error: null,
    status:'idel',
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getallproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getallproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.status = "successsed";
      })
      .addCase(getallproduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(addproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.status = "successsed";
      })
      .addCase(addproduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateproduct.pending, (state) => { 
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.status = "successed";
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteproduct.pending, (state) => { 
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.status = "successed";
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ProductSlice.reducer;
