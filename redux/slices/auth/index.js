import { createSlice } from "@reduxjs/toolkit";
import { restAllData } from "../commanAction";

const initialState = {
  userInfo: {},
  verifyOTP: {},
  isLoggedIn: false

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => builder.addCase(restAllData, () => initialState),
  reducers: {
    userLogin: (state) => {
      state.loading = true;
    },
    setUserLogin: (state ,action)=>{
      state.loading = false;
      state.userInfo = action.payload
    },
    verifyOTP: (state)=>{
      state.loading = true;
    },
    setVerifyOTP: (state,action)=>{
      state.loading = false;
      state.isLoggedIn = true
      state.verifyOTP = action.payload
    },
    resendOTP: (state)=>{
      state.loading = true;
    },
    setResendOTP: (state)=>{
      state.loading = false;
    },
    logout: (state) => {
      state.loading = true;
    },
    setLogout: (state, action) => {
      state.loading = false;
      state.userInfo= {},
      state.verifyOTP= {},
      state.isLoggedIn= false
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  userLogin,
  setUserLogin,
  setVerifyOTP,
  verifyOTP,
  setResendOTP,
  resendOTP,
  setLogout,
  logout,
  onErrorStopLoad
} = authSlice.actions;

export default authSlice.reducer;
