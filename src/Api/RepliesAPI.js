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

//取得特定推文回覆資料
export const getOneTweetReplies = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/tweets/${id}/replies`)
    return res.data
  }
  catch (error) {
    console.error('[Get OneTweetReply Data failed]: ', error);
  }

}