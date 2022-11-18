import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = localStorage.getItem("ebay");
const parsedUser = user && JSON.parse(user);

interface UserState {
  user: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: UserState = {
  user: parsedUser,
  loading: false,
  error: "",
  success: false,
};

type loginAction = {
  payload: {
    uid: string;
    email: string | null;
    token: string;
  };
};

type logoutAction = {
  payload: {
    user: null;
  };
};
type loadingAction = {
  payload: {
    loading: boolean;
  };
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    login: (state: UserState = initialState, action: loginAction) => {
      state.user = action.payload;
    },
    logout: (state: UserState = initialState, action: logoutAction) => {
      state.user = action.payload?.user;
    },
    setLoading: (state: UserState = initialState, action: loadingAction) => {
      state.loading = action.payload.loading;
    },
  },
});

export const { login, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;
