import { createSlice } from "@reduxjs/toolkit";

export type Tbrand = "Apple" | "Samsung" | "Microsoft" | "Lenovo" | "Asus";
export type TColor = "Black" | "Brown" | "Silver" | "White" | "Blue";
export type Tshipping = "Yes" | "No";
export type Timage = {
  public_id: string;
  secure_url: string;
};

export type Trating = {
  rating: number;
  postedBy: string;
};

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  subs: string[];
  quantity: number;
  sold: number;
  shipping: Tshipping;
  color: TColor;
  brand: Tbrand;
  images: Timage[];
  ratings: Trating[];
}

export interface IproductState {
  products: IProduct[];
  newestArrivedProducts: {
    sortedProducts: IProduct[];
    countDocuments: number;
  };
  bestSelledProducts: {
    sortedProducts: IProduct[];
    countDocuments: number;
  };
  product: IProduct;
  relatedProducts: IProduct[];
}

type TcreateProductAction = {
  payload: IProduct;
};

type TgetAllProdAction = {
  payload: IProduct[];
};
type TremoveProductAction = {
  payload: IProduct;
};
type TupdateProductAction = {
  payload: IProduct;
};

type TgetFilteredProductAction = {
  payload: {
    sortedProducts: IProduct[];
    countDocuments: number;
  };
};
type TgetSingleProductAction = {
  payload: IProduct;
};

type TgetRelatedProductsAction = {
  payload: IProduct[];
};

const initialState: IproductState = {
  products: [] as IProduct[],
  newestArrivedProducts: {
    sortedProducts: [] as IProduct[],
    countDocuments: 0,
  },
  bestSelledProducts: {
    sortedProducts: [] as IProduct[],
    countDocuments: 0,
  },
  product: {} as IProduct,
  relatedProducts: [] as IProduct[],
};

const produtcSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    getAllProd: (
      state: IproductState = initialState,
      action: TgetAllProdAction
    ) => {
      state.products = action.payload;
    },
    createSingleProduct: (
      state: IproductState = initialState,
      action: TcreateProductAction
    ) => {
      state.products.push(action.payload);
    },
    getSingleProduct: (
      state: IproductState,
      action: TgetSingleProductAction
    ) => {
      state.product = action.payload;
    },
    removeProduct: (
      state: IproductState = initialState,
      action: TremoveProductAction
    ) => {
      state.products = state.products.filter(
        (i) => i._id !== action.payload._id
      );
    },
    updateProduct: (
      state: IproductState = initialState,
      action: TupdateProductAction
    ) => {
      state.products = state.products.map((p) => {
        return p._id === action.payload._id ? action.payload : p;
      });
    },
    getNewestArrivals: (
      state: IproductState = initialState,
      action: TgetFilteredProductAction
    ) => {
      state.newestArrivedProducts.sortedProducts =
        action.payload?.sortedProducts;
      state.newestArrivedProducts.countDocuments =
        action.payload?.countDocuments;
    },
    getBestSelled: (
      state: IproductState = initialState,
      action: TgetFilteredProductAction
    ) => {
      state.bestSelledProducts.sortedProducts = action.payload?.sortedProducts;
      state.bestSelledProducts.countDocuments = action.payload?.countDocuments;
    },
    gotRelatedProducts: (
      state: IproductState = initialState,
      action: TgetRelatedProductsAction
    ) => {
      state.relatedProducts = action.payload;
    },
  },
});

export const {
  createSingleProduct,
  getAllProd,
  removeProduct,
  updateProduct,
  getNewestArrivals,
  getBestSelled,
  getSingleProduct,
  gotRelatedProducts,
} = produtcSlice.actions;

export default produtcSlice.reducer;
