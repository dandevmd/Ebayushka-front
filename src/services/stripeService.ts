import axios from "axios";

export const createPaymentIntent = async (token: string) => {
  return axios.post(
    `${process.env.REACT_APP_API}/stripe/create-payment-intent`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
};
