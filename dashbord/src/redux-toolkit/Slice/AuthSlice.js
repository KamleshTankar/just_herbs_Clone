import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../Api/Api";


export const signin = createAsyncThunk('login', async (authdata) => { 
  try {
    const { data } = await API_URL.post('/admin/login', authdata);
    localStorage.setItem("profile", JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
  }
});
//   ("login", async (userData) => {
//   const response = await API_URL.post('/admin/login', userData);
//   localStorage.setItem("profile", JSON.stringify(response.data));
//   return response.data;
// });

export const signup = createAsyncThunk("signup", async (authdata) => {
  try {
    const { response } = await API_URL.post('/admin/signup', authdata);
    localStorage.setItem("profile", JSON.stringify(response));
    return response;
  } catch (error) {
    console.log(error);
  }
});

const currentuser = JSON.parse(localStorage.getItem("profile"))?.result;
const currenttoken = JSON.parse(localStorage.getItem("profile"))?.token;


const AuthSlice = createSlice({
  name: "auth",
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
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload.result;
        state.token = action?.payload.token;
        state.status = "successd";
        // localStorage.setItem(JSON.stringify("profile"));
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload.result;
        state.token = action?.payload.token;
        state.status = "successed";
        // localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
  
  export const { logout } = AuthSlice.actions;
  export default AuthSlice.reducer;