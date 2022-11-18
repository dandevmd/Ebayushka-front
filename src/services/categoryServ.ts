import axios from "axios";

export const getAll = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/category/all`
    );
    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const create = async (token: string, name: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/category/create`,
      { name },
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

export const read = async (slug: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/category/get/${slug}`
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};



export const update = async (
  token: string,
  slug: string,
  updatedCategory: {
    name: string;
    newSlug?: string;
  }
) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/category/update/${slug}`,
      { ...updatedCategory },
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

export const remove = async (token: string, slug: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/category/remove/${slug}`,

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
