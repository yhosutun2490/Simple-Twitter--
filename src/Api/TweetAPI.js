// 引入axios
import axios from 'axios';
// 後端Heroku網址
const baseUrl ="https://lingering-wildflower-6442.fly.dev"

// 產生axios 實例來管理API
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': "application/json" },
});

// 利用axios 攔截器再發現請求前帶入token
axiosInstance.interceptors.request.use(
  (config) => {
     const token = localStorage.getItem('authToken'); // 取出token
      if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
  },
  (error) => {console.error(error)}
)
//取得所有推文
export const getAllTweets = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/tweets`)
    return res.data
  }
  catch (error) {
    console.error('[Get AllTweetData failed]: ', error);
  }
}


//取得單筆推文資料(不包含回覆詳細內容)
export const getOneTweet = async (id) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/tweets/${id}`)
    return res.data
  }
  catch (error) {
    console.error('[Get OneTweetData failed]: ', error);
  }

}
