import { createSlice } from "@reduxjs/toolkit";

const savedAuth = (() => {
  try {
    const value = localStorage.getItem("auth");
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: savedAuth || { user: null, token: null, role: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.email;
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("auth");
    },
    signup: (state, action) => {
      state.user = action.payload.email;
      state.role = action.payload.role || "user";
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
export default authSlice.reducer;
