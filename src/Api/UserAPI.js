// 引入axios
import axios from 'axios';
// 後端Heroku網址
const baseUrl =""

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
//取得所有推文
export const getOneUserTweets = async () => {
  try {
    // const res = await axiosInstance.get(`${baseUrl}/api/tweets`)
    const resfakeData ={
  "status": "success",
   "data" :[
      {
      "id": 1,
      "description": "我在推文",
      "createdAt": "2022-11-17T15:32:31.000z",
      "updatedAt": "2022-11-17T15:32:31.000z",
      "repliesCount": 4,
      "likeCount": 10,
      },
      {
      "id": 2,
      "description": "我在推文2",
      "createdAt": "2022-11-17T15:32:31.000z",
      "updatedAt": "2022-11-17T15:32:31.000z",
      "repliesCount":4,
      "likeCount":8
      }
    ]
  }

    return resfakeData
  }
  catch (error) {
    console.error('[Get AllTweetData failed]: ', error);
  }
}

//取得所有推文
export const getOneUserData = async () => {
  try {
    // const res = await axiosInstance.get(`${baseUrl}/api/tweets`)
    const resfakeData ={
  "status": "success",
   "data" :[
      {
      "id": 1,
      "account": "user1",
      "email": "user1@example.com",
      "name":"handsome",
      "avatar": "https://picsum.photos/50/50",
      "introduction": "我是大帥哥",
      "role": 1,
      "cover": "https://imgur.com/kaoge55g",
      "createdAt": "2022-11-17T15:32:31.000z",
      "updatedAt": "2022-11-17T15:32:31.000z",
      "following": true,
      "followingCount":3,
      "follower": 2,
      "tweetsCount":"4"
}

    ]
  }

    return resfakeData
  }
  catch (error) {
    console.error('[Get AllTweetData failed]: ', error);
  }
}