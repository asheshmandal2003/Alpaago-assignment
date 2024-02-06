import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    uid: null,
    email: null,
    name: null,
    photoURL: null,
  },
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.photoURL = action.payload.photoURL;
    },
    logout: (state) => {
      state.email = null;
      state.name = null;
      state.photoURL = null;
      state.uid = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
