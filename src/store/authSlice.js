import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isRegistrationComplete: false,
  isRegistering: false, // 추가
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    setRegistrationComplete: (state) => {
      state.isRegistrationComplete = true;
    },
    resetRegistrationComplete: (state) => {
      state.isRegistrationComplete = false;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
    setRegistering: (state) => {
      state.isRegistering = true;
    },
    resetRegistering: (state) => {
      state.isRegistering = false;
    },

    setUserTheme: (state, action) => {
      if (state.user) {
        state.user.theme = action.payload.theme;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  setRegistrationComplete,
  resetRegistrationComplete,
  loginFailure,
  logout,
  setRegistering,
  resetRegistering,
  setUserTheme,
} = authSlice.actions;
export default authSlice.reducer;
