import axios from "axios";

export const createOder = async (token: string, stripeResponse: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/order/create-order`,
      { stripeResponse },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrders = async (token: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/order/get-user-orders`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrders = async (token: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/order/get-all`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateOrderStatus = async (
  token: string,
  orderId: string,
  orderStatus: string
) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/order/update-order`,
      { token, orderId, orderStatus },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
