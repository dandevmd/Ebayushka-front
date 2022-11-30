import axios from "axios";
import { IproductInCart } from "../redux/slices/productSlice";

export const saveUserCart = async (token: string, cart: IproductInCart[]) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/cart/save-cart`,
      { cart },
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

export const getCart = async (token: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/cart/get-cart`,

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
export const removeCart = async (token: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/cart/delete-cart`,

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
