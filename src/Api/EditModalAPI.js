// 引入axios
import axios from 'axios';
// 後端Heroku網址
const baseUrl ="https://lingering-wildflower-6442.fly.dev"
// 產生axios 實例來管理API
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// 利用axios 攔截器再發現請求前帶入token
axiosInstance.interceptors.request.use(
  (config) => {
     const token = localStorage.getItem('authToken'); // 取出token
     // 如果有token的話 放入API請求Header中
      if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
  },
  (error) => {console.error(error)}
)

// 使用者編輯視窗上傳圖片、修改自介名稱api
export const userEditPhotoModalNew = async (userID,formData) => {
  try {
    const res = await axiosInstance.put(`${baseUrl}/api/users/${userID}`,formData
)
    return res;
  } catch (error) {
    console.error("[Edit Profile Failed]:", error);
    return error;
  }
};