import { createSlice } from "@reduxjs/toolkit";

export interface IvalidCoupon {
  discountedPrice: number | null;
}

const discountedPfromLS = localStorage.getItem("discounted_price");
const price =
  discountedPfromLS && JSON.stringify(localStorage.getItem("discounted_price"));
const discount = price && Number(price);

const initialState: IvalidCoupon = {
  discountedPrice: discount || null,
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
      localStorage.setItem(
        "discounted_price",
        JSON.parse(action.payload.toString())
      );
    },
    resetDiscountedPrice: (state: IvalidCoupon = initialState) => {
      state.discountedPrice = initialState.discountedPrice;
      localStorage.removeItem("discounted_price");
    },
  },
});

export const { updateDiscountPrice, resetDiscountedPrice } =
  couponSlice.actions;
export default couponSlice.reducer;
