import { createSlice } from "@reduxjs/toolkit";

export interface ICategoryItem {
  _id: string;
  createdAt: Date;
  updatedAt?: Date;
  name: string;
  slug: string;
}

interface ICategory {
  categories: ICategoryItem[];
}

type getAllCategoriesAction = {
  payload: ICategoryItem[];
};
type addCategoryAction = {
  payload: ICategoryItem;
};
type deleteCategoryAction = {
  payload: ICategoryItem;
};
type updateCategoryAction = {
  payload: ICategoryItem;
};

const initialState: ICategory = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categoryReducer",
  initialState,
  reducers: {
    getAllCategories: (
      state: ICategory = initialState,
      action: getAllCategoriesAction
    ) => {
      state.categories = action.payload;
    },
    addCategory: (
      state: ICategory = initialState,
      action: addCategoryAction
    ) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (
      state: ICategory = initialState,
      action: deleteCategoryAction
    ) => {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload._id
      );
    },
    updateCategory: (
      state: ICategory = initialState,
      action: updateCategoryAction
    ) => {
      state.categories.forEach((element, index) => {
        if (element._id === action.payload._id) {
          state.categories[index] = action.payload;
        }
      });
    },
  },
});

export const { getAllCategories, addCategory, deleteCategory, updateCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
