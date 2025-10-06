import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_URL from "../Api/Api";


// Example async thunk for fetching orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders',async (id) => {
        const response = await API_URL.get(`/user/orders/${id}`);
        return await response.data;
    }
);
export const createorder = createAsyncThunk('orders/createOrder',async (orderData, Id) => {
    const response = await API_URL.post(`/user/createorder/${Id}`, orderData);
        return await response.data;
    }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    status: "idel",
  },
  reducers: {
    // Example reducer for clearing orders
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;