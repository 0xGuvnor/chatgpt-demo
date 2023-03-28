import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: string;
  secret: string;
  isAuth?: boolean;
}

const initialState: AuthState = {
  user: "",
  secret: "",
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.secret = action.payload.secret;
      state.isAuth = !!action.payload.user && !!action.payload.secret;
    },
    logout: (state) => {
      state.user = "";
      state.secret = "";
      state.isAuth = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
