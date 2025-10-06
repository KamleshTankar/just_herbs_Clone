import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../Api/Api";

export const getAllUsers = createAsyncThunk("getAllUser", async () => {
  const response = await API_URL.get('/admin/getAllUsers');
  return response.data;
});
export const RemoveUser = createAsyncThunk("removeuser", async (id) => {
  const response = await API_URL.delete(`/admin/removeuser/${id}`);
  return response.data;
});

const UserSlice = createSlice({
  name: "Users",
  initialState: {
    userslist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userslist = action.payload;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(RemoveUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(RemoveUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userslist = action.payload;
    })
    .addCase(RemoveUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  },
});


export default UserSlice.reducer;