import axios from "axios";

const baseUrl = "https://floating-forest-88499.herokuapp.com/api/admin";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

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

export const adminGetAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`)
    return res.data
  } catch (error) {
    console.error('[Admin Get All Tweets failed]: ', error);
  }
}