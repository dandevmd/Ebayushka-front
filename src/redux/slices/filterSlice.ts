import { createSlice } from "@reduxjs/toolkit";

export interface IFilter {
  query: string;
  // price:number
  // rating:number
}

type TgetByQueryAction = {
  payload: string;
};

const initialState: IFilter = {
  query: "",
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    byQuery: (state: IFilter, action: TgetByQueryAction) => {
      state.query = action.payload;
    },
    resetQuery: (state: IFilter) => {
      state.query = "";
    },
  },
});

export const { byQuery, resetQuery } = filterSlice.actions;
export default filterSlice.reducer;
