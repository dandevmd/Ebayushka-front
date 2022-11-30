import axios from "axios";

//create or Update User in Mongo with fb token
export const createOrUpdateUser = async (token: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/auth/create-or-update`,
      {},
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

//get currentUser
export const currentUser = async (token: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/auth/current-user`,

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

// check if user is admin
export const currentAdmin = async (token: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/auth/current-admin`,

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

// save the user address
export const saveAddress = async (
  token: string,
  address: {
    country: string;
    city: string;
    address: string;
  }
) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/auth/save-address`,
      { address },
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
