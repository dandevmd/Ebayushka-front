import axios from "axios";

export const getAllSubs = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/sub-category/all`
    );
    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const createSub = async (
  token: string,
  sub: {
    name: string;
    parent: string;
  }
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/sub-category/create`,
      { ...sub },
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

export const readSub = async (slug: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/sub-category/get/${slug}`
    );

    return data;
  } catch (error) {
    error instanceof Error ? console.log(error.message) : console.log(error);
  }
};

export const updateSub = async (
  token: string,
  slug: string,
  updatedSubCategory: {
    name: string;
    newSlug?: string;
    parent: string
  }
) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/sub-category/update/${slug}`,
      { ...updatedSubCategory },
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

export const removeSub = async (token: string, slug: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/sub-category/remove/${slug}`,

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
