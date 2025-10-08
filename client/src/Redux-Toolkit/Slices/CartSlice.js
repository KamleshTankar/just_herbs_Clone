import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../Api/Api";

export const AddToCart = createAsyncThunk("AddToCart", async (Item, Id) => {
try {
    const response = await API_URL.post(`/user/addcart/${Id}`, Item);
    return response.data;
} catch (error) {
    throw new Error(`"Failed to add to cart": ${error.message}`);
    }
});
export const IncreseQuantity = createAsyncThunk("IncreseQuantity", async (Item, Id) => {
  try {
      const response = await API_URL.post(`/user/increasecart/${Id}`, Item);
      return response.data;
  } catch (error) {
      throw new Error("Failed to increase quantity");
    }
});
export const DecreseQuantity = createAsyncThunk("DecreseQuantity", async (Item, Id) => {
  try {
      const response = await API_URL.post(`/user/decreasecart/${Id}`, Item);
      return response.data;
  } catch (error) {
      throw new Error("Failed to decrease quantity");
    }
});
export const DeleteCart = createAsyncThunk("DeleteCart", async (Id) => {
  try {
      const response = await API_URL.post(`/user/deletecart/${Id}`);
      return response.data;
  } catch (error) {
      throw new Error("Failed to delete cart item");
    }
});

export const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    status: "idel",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.status = "successsed";
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(IncreseQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(IncreseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.status = "successsed";
      })
      .addCase(IncreseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DecreseQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(DecreseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.status = "successsed";
      })
      .addCase(DecreseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DeleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(DeleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.status = "successsed";
      })
      .addCase(DeleteCart.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default CartSlice.reducer;
