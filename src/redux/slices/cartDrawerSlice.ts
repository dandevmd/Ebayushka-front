import { createSlice } from "@reduxjs/toolkit";

interface IcartDrawerState {
  drawer: boolean;
}

const initialState: IcartDrawerState = {
  drawer: false,
};

const cartDrawerSlice = createSlice({
  name: "cart-drawer-slice",
  initialState,
  reducers: {
    toggleDrawer: (state: IcartDrawerState = initialState) => {
      state.drawer = !state.drawer;
    },
  },
});

export const { toggleDrawer } = cartDrawerSlice.actions;

export default cartDrawerSlice.reducer;
