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

// Admin login
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
    console.error("[Admin login Failed]:", error);
    const errCode = error.response.data.status
    return { success: false, errCode: errCode };
  }
};

// Admin get all tweets
export const adminGetAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/tweets`)
    return res.data
  } catch (error) {
    console.error('[Admin Get All Tweets failed]: ', error);
  }
}

// Admin delete tweets
export const adminDeleteTweet = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/tweets/${id}`)
    return res.data
  } catch (error) {
    console.error('[Admin Delete Tweet failed]: ', error)
  }
}

// Admin get all users
export const adminGetAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/users`)
    return res.data
  } catch (error) {
    console.error('[Admin Get All Users failed]: ', error)
  }
}