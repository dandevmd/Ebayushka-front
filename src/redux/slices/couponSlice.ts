import { createSlice } from "@reduxjs/toolkit";

export interface IvalidCoupon {
  discountedPrice: number | null;
}

const initialState: IvalidCoupon = {
  discountedPrice: null,
};

type updateDiscoutPriceAction = {
  payload: number;
};

const couponSlice = createSlice({
  name: "couponReducer",
  initialState,
  reducers: {
    updateDiscountPrice: (
      state: IvalidCoupon = initialState,
      action: updateDiscoutPriceAction
    ) => {
      state.discountedPrice = action.payload;
    },
  },
});

export const { updateDiscountPrice } = couponSlice.actions;
export default couponSlice.reducer;
