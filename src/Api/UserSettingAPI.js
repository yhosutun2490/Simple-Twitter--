import axios from "axios";

const baseUrl = "https://lingering-wildflower-6442.fly.dev/api/users";

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

export const setUserData = async (id, formData) => {
  try {
    const { data } = await axiosInstance.put(`${baseUrl}/${id}`, formData)

    if (data) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error("[Set User Failed]:", error);
    const errCode = error.response.data.status
    return { success: false, errCode: errCode };
  }
};
