import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      token: "",
      fullname: "",
      isAuth: false,
    },
  },
  reducers: {
    onLogin(state, action) {
      state.data.token = action.payload.token;
      state.data.fullname = action.payload.fullname;
      state.data.isAuth = true;
    },
    onLogout(state) {
      state.data = {
        token: "",
        fullname: "",
        isAuth: false,
      };
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
