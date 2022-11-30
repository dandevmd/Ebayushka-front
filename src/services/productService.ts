import axios from "axios";
import { Icart, IProduct, IproductInCart } from "../redux/slices/productSlice";

export const postProduct = async (token: string, product: IProduct) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/products/create`,
      product,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const putProduct = async (
  token: string,
  slug: string,
  product: IProduct
) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/products/update/${slug}`,
      product,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const getAllProducts = async (count: number = 10) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/products/all/${count}`
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const getProductsByFilter = async (
  sort: string,
  order: string,
  page?: number,
  perPage?: number
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/products/by-seller-and-arrivals`,
      { sort, order, page, perPage }
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/products/get/${slug}`
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const fetchProductsByQuery = async (
  filter: {
    price?: [number, number] | null;
    category?: string | null;
    rating?: number | null;
    color?: string | null;
  },
  query?: string | null
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/products/search/filters`,
      { ...filter, query }
    );
    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/products/category/${category}`
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};
export const getProductsBySubCategory = async (sub: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/products/sub/${sub}`
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const getRelatedProducts = async (productId: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/products/related/${productId}`
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const deleteProductById = async (token: string, _id: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/products/remove/${_id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const uploadImages = async (token: string, image: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/upload`,
      image,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const removeImageById = async (token: string, public_id: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/upload/${public_id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};
export const rateProductRequest = async (
  token: string,
  rating: number,
  productId: string,
  user_id: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/products/addReview`,
      { rating, productId, user_id },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};


