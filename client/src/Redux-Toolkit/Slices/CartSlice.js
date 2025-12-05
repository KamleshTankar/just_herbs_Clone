import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../Api/Api";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error.message || "Something went wrong";

export const AddToCart = createAsyncThunk("cart/add", async (Item,{rejectWithValue}) => {
  
  try {
    const response = await API_URL.post("/user/addtocart", Item);
    return response.data;
} catch (error) {
  return rejectWithValue(getErrorMessage(error));
    }
});

export const IncreaseQuantity = createAsyncThunk("cart/increasequantity", async (Item,{rejectWithValue}) => {
  try {
      const response = await API_URL.post("/user/increasecart", Item);
      return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
    }
});

export const DecreaseQuantity = createAsyncThunk("cart/decreasequantity", async (Item,{rejectWithValue}) => {
  try {
      const response = await API_URL.post("/user/decreasecart", Item);
      return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
    }
});

export const DeleteCart = createAsyncThunk("cart/delete", async (Id,{rejectWithValue}) => {
  try {
      const response = await API_URL.post(`/user/deletecart/${Id}`);
      return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
    }
});

export const GetAllCart = createAsyncThunk("cart/getallcarts", async (id, { rejectWithValue }) => {
  try {
    const response = await API_URL.post("/user/AllCarts", id);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
});

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
  state.status = "loading";
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.status = "failed";
  state.error = action.payload || action.error.message;
};

export const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.pending, handlePending)
      .addCase(AddToCart.fulfilled, (state, action) => { 
        state.loading = false;
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(AddToCart.rejected, handleRejected)
      .addCase(IncreaseQuantity.pending, handlePending)
      .addCase(IncreaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(IncreaseQuantity.rejected, handleRejected)
      .addCase(DecreaseQuantity.pending, handlePending)
      .addCase(DecreaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(DecreaseQuantity.rejected, handleRejected)
      .addCase(DeleteCart.pending, handlePending)
      .addCase(DeleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(DeleteCart.rejected, handleRejected)
      .addCase(GetAllCart.pending, handlePending)
      .addCase(GetAllCart.fulfilled, (state, action) => { 
        state.loading = false;
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(GetAllCart.rejected, handleRejected);
  },
});

export default CartSlice.reducer;
