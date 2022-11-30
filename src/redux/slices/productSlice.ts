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

export interface IproductInCart extends IProduct {
  count: number;
}

export interface Icart {
  cart: IproductInCart[];
}

const getCartFromLs = localStorage.getItem("ebayushka_cart");

export interface IproductState {
  products: IProduct[];
  cart: IproductInCart[];
  newestArrivedProducts: {
    sortedProducts: IProduct[];
    countDocuments: number;
  };
  bestSelledProducts: {
    sortedProducts: IProduct[];
    countDocuments: number;
  };
  byCategory: IProduct[];
  bySub: IProduct[];
  product: IProduct;
  relatedProducts: IProduct[];
  byFilter: IProduct[];
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
type TbyCategoryAction = {
  payload: IProduct[];
};
type TbySub = {
  payload: IProduct[];
};
type TgetSingleProductAction = {
  payload: IProduct;
};

type TgetRelatedProductsAction = {
  payload: IProduct[];
};
type TgetProductsByFilter = {
  payload: IProduct[];
};

type TaddItemToCart = {
  payload: IproductInCart;
};
type TremoveItemFromCart = {
  payload: IproductInCart[];
};
type TincreaseOrdecreaseCartItemQuantity = {
  payload: IproductInCart[];
};
type TchangeColor = {
  payload: IproductInCart[];
};

const initialState: IproductState = {
  products: [] as IProduct[],
  cart: getCartFromLs ? JSON.parse(getCartFromLs) : ([] as IproductInCart[]),
  product: {} as IProduct,
  byCategory: [] as IProduct[],
  bySub: [] as IProduct[],
  relatedProducts: [] as IProduct[],
  newestArrivedProducts: {
    sortedProducts: [] as IProduct[],
    countDocuments: 0,
  },
  bestSelledProducts: {
    sortedProducts: [] as IProduct[],
    countDocuments: 0,
  },
  byFilter: [] as IProduct[],
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
    getByCategory: (
      state: IproductState = initialState,
      action: TbyCategoryAction
    ) => {
      state.byCategory = action.payload;
    },
    getBySub: (state: IproductState = initialState, action: TbySub) => {
      state.bySub = action.payload;
    },
    getByFilter: (
      state: IproductState = initialState,
      action: TgetProductsByFilter
    ) => {
      state.byFilter = action.payload;
    },
    addProductTocart: (state: Icart = initialState, action: TaddItemToCart) => {
      state.cart.push(action.payload);
      localStorage.setItem("ebayushka_cart", JSON.stringify(state.cart));
    },
    removeFromCart: (
      state: Icart = initialState,
      action: TremoveItemFromCart
    ) => {
      state.cart = action.payload;
      localStorage.setItem("ebayushka_cart", JSON.stringify(state.cart));
    },
    increaseCartQty: (
      state: Icart = initialState,
      action: TincreaseOrdecreaseCartItemQuantity
    ) => {
      state.cart = action.payload;
      localStorage.setItem("ebayushka_cart", JSON.stringify(state.cart));
    },
    decreaseCartQty: (
      state: Icart = initialState,
      action: TincreaseOrdecreaseCartItemQuantity
    ) => {
      state.cart = action.payload;
      localStorage.setItem("ebayushka_cart", JSON.stringify(state.cart));
    },
    changeItemColor: (state: Icart = initialState, action: TchangeColor) => {
      state.cart = action.payload;
      localStorage.setItem("ebayushka_cart", JSON.stringify(state.cart));
    },
    emptyCart: (state: Icart = initialState) => {
      state.cart = [];
      localStorage.removeItem("ebayushka_cart");
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
  getByCategory,
  getBySub,
  getByFilter,
  addProductTocart,
  removeFromCart,
  increaseCartQty,
  decreaseCartQty,
  changeItemColor,
  emptyCart,
} = produtcSlice.actions;

export default produtcSlice.reducer;
