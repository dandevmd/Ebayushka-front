import { createSlice } from "@reduxjs/toolkit";

export interface ISubCategoryItem {
  _id: string;
  createdAt: Date;
  updatedAt?: Date;
  name: string;
  slug: string;
  parent: string;
}

interface ISubCategory {
  subCategories: ISubCategoryItem[];
}

type getAllSubCategoriesAction = {
  payload: ISubCategoryItem[];
};
type addSubCategoryAction = {
  payload: ISubCategoryItem;
};
type deleteSubCategoryAction = {
  payload: ISubCategoryItem;
};
type updateSubCategoryAction = {
  payload: ISubCategoryItem;
};

const initialState: ISubCategory = {
  subCategories: [],
};

const subCategorySlice = createSlice({
  name: "subCategoryReducer",
  initialState,
  reducers: {
    getAllSubCategories: (
      state: ISubCategory = initialState,
      action: getAllSubCategoriesAction
    ) => {
      state.subCategories = action.payload;
    },
    addSubCategory: (
      state: ISubCategory = initialState,
      action: addSubCategoryAction
    ) => {
      state.subCategories.push(action.payload);
    },
    deleteSubCategory: (
      state: ISubCategory = initialState,
      action: deleteSubCategoryAction
    ) => {
      state.subCategories = state.subCategories.filter(
        (c) => c._id !== action.payload._id
      );
    },
    updateSubCategory: (
      state: ISubCategory = initialState,
      action: updateSubCategoryAction
    ) => {
      state.subCategories.forEach((element, index) => {
        if (element._id === action.payload._id) {
          state.subCategories[index] = action.payload;
        }
      });
    },
  },
});

export const { getAllSubCategories, addSubCategory, deleteSubCategory, updateSubCategory } =
  subCategorySlice.actions;
export default subCategorySlice.reducer;
