// 引入axios
import axios from 'axios';
// 後端Heroku網址
const baseUrl ="https://floating-forest-88499.herokuapp.com"

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

//對某位使用者按追隨
export const unfollowUser = async (userID) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/api/followships`,{id:Number(userID)})
    return res.data
  }
  catch (error) {
    console.error('[Follow User request failed]: ', error);
  }
}

//對某位使用者取消追隨
export const followUser = async (userID,unFollowerID) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/api/followships/${unFollowerID}`,{id:Number(userID)})
    return res.data
  }
  catch (error) {
    console.error('[Follow User request failed]: ', error);
  }
}