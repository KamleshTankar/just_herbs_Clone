import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../Api/Api";

export const GetallProduct = createAsyncThunk("product/GetallProducts", async () => {
  const response = await API_URL.get("/admin/Getallproducts");
  return response.data;
});

export const AddProduct = createAsyncThunk('product/AddProduct',
  async (productData, { rejectWithValue }) => {
    console.log(productData);
  try {    
    const response = await API_URL.post('/admin/Addproduct', productData,
      { headers: { "Content-type": "multipart/form-data" }, });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to add product");
  }
});

export const UpdateProduct = createAsyncThunk('product/UpdateProduct', async (productData) => {
  const response = await API_URL.patch('/admin/Addproduct',productData);
  return response.data;
});

export const DeleteProduct = createAsyncThunk('product/DeleteProduct', async () => {
  const response = await API_URL.delete('/admin/Deleteproduct');
  return response.data;
});


export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetallProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(GetallProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.status = "success";
      })
      .addCase(GetallProduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(AddProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(AddProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.status = "success";
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(UpdateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.status = "success";
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DeleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.status = "success";
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetProductState } = ProductSlice.actions;
export default ProductSlice.reducer;
