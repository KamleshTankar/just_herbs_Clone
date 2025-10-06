import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../Api/Api";

export const login = createAsyncThunk("auth/login", async (authdata, { rejectWithValue }) => {
  try {
    const { data } = await API_URL.post("/user/login", authdata);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const register = createAsyncThunk("auth/signup", async (authdata, { rejectWithValue }) => {
  try {
    const { data } = await API_URL.post("/user/signup", authdata);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

const currentuser = JSON.parse(localStorage.getItem("user"))?.result;
const currenttoken = JSON.parse(localStorage.getItem("user"))?.token;

const AuthSlice = createSlice({
  name: "User",
  initialState: {
    user: currentuser || null,
    token: currenttoken || null,
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result;
        state.token = action.payload.token;
        state.status = "succeeded";
        // localStorage.setItem(JSON.stringify("user"));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result;
        state.token = action.payload.token;
        state.status = "succeeded";
        // localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
