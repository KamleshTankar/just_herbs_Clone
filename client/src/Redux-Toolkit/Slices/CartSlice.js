import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../Api/Api";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error.message || "Something went wrong";

export const AddToCart = createAsyncThunk("cart/add", async (Item,{rejectWithValue}) => {
try {
    const response = await API_URL.post("/user/addcart", Item);
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

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
  state.status = "loading";
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.cartItems = action.payload; // replace with full data from backend
  state.status = "succeeded";
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
      .addCase(AddToCart.fulfilled, handleFulfilled)
      .addCase(AddToCart.rejected, handleRejected)
      .addCase(IncreaseQuantity.pending, handlePending)
      .addCase(IncreaseQuantity.fulfilled, handleFulfilled)
      .addCase(IncreaseQuantity.rejected, handleRejected)
      .addCase(DecreaseQuantity.pending, handlePending)
      .addCase(DecreaseQuantity.fulfilled, handleFulfilled)
      .addCase(DecreaseQuantity.rejected, handleRejected)
      .addCase(DeleteCart.pending, handlePending)
      .addCase(DeleteCart.fulfilled, handleFulfilled)
      .addCase(DeleteCart.rejected, handleRejected);
  },
});

export default CartSlice.reducer;
