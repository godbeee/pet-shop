import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      id: "",
      token: "",
      fullname: "",
      email: "",
      phone: "",
      isAuth: false,
    },
  },
  reducers: {
    onLogin(state, action) {
      state.data.token = action.payload.token;
      state.data.id = action.payload.id;
      state.data.fullname = action.payload.fullname;
      state.data.email = action.payload.email;
      state.data.phone = action.payload.phone;
      state.data.isAuth = true;
    },
    onLogout(state) {
      state.data = {
        id: "",
        token: "",
        fullname: "",
        email: "",
        phone: "",
        isAuth: false,
      };
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
