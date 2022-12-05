import axios from "axios";

export const getAll = async (token: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/wishlist/get-all`,

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

export const add = async (token: string, productId: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/wishlist//add-to-wishlist`,
      { productId },
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

export const remove = async (token: string, productId: string) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/wishlist/remove-from-wishlist`,
      { productId },
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
