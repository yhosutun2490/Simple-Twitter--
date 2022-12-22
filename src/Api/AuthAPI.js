import axios from "axios";

const baseUrl = "https://floating-forest-88499.herokuapp.com/api";

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, {
      account,
      password,
    });
    const { token } = data;

    if (token) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error("[Login Failed]:", error);
  }
};

export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data } = await axios.post(`${baseUrl}/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });

    const { token } = data;

    if (token) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error("[Register Failed]:", error);
  }
};

export const checkPermission = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/auth`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("[Check Permission Failed]:", error);
  }
};
