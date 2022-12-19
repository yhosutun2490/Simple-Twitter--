import axios from "axios";

const baseUrl = "https://floating-forest-88499.herokuapp.com/api/admin";

export const adminLogin = async ({ account, password }) => {
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
    // 待後端
    console.error("[Admin login Failed]:", error);
    //const errMsg = error.response.data.message
    //return errMsg
  }
};