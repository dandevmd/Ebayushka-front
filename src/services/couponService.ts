import axios from "axios";

export const createCoupon = async (
  token: string,
  name: string,
  discount: number,
  expire: Date
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/coupon/create-coupon`,
      { name, discount, expire },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    error instanceof Error && console.log(error.message);
  }
};

export const deleteCoupon = async (token: string, id: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/coupon/remove-coupon/${id}`,

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    error instanceof Error && console.log(error.message);
  }
};

export const getAllCoupons = async (token: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/coupon/all-coupons`,

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    error instanceof Error && console.log(error.message);
  }
};
export const verifiedCoupon = async (token: string, couponName: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/coupon/verify-coupon`,
      { couponName },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    error instanceof Error && console.log(error.message);
  }
};
