import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";
import subCategoryReducer from "./slices/subCategorySlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
