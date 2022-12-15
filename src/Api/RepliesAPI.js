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

//取得特定推文回覆資料
export const getOneTweetReplies = async () => {
  try {
    // const res = await axiosInstance.get(`${baseUrl}/api/tweets`)
    const resfakeData = {
    "data" : [
       {
        "id": 1,
        "description": "我在推文",
        "createdAt": "2022-11-17T15:32:31.000z",
         "updatedAt": "2022-11-17T15:32:31.000z",
         "replies":[
          {
            "id": 1,
            "comment": "第一則回覆",
            "createdAt": "2022-11-17T15:32:31.000z",
            "updatedAt": "2022-11-17T15:32:31.000z",
            "user":{
                 "id": 1,
                 "account": "user1",
                 "email": "user1@example.com",
                 "name":"handsome",
                 "avatar": "https://picsum.photos/50/50",
                 "introduction": "我是大帥哥",
                 "cover": "https://imgur.com/kaoge55g",
                 "createdAt": "2022-11-17T15:32:31.000z",
                 "updatedAt": "2022-11-17T15:32:31.000z",
               },
            },
            {
            "id": 2,
            "comment": "第n則回覆",
            "createdAt": "2022-11-17T15:32:31.000z",
            "updatedAt": "2022-11-17T15:32:31.000z",
            "user":{
                 "id": 1,
                 "account": "user1",
                 "email": "user1@example.com",
                 "name":"handsome",
                 "avatar": "https://picsum.photos/50/50",
                 "introduction": "我是大帥哥",
                 "cover": "https://imgur.com/kaoge55g",
                 "createdAt": "2022-11-17T15:32:31.000z",
                 "updatedAt": "2022-11-17T15:32:31.000z",
               },
              }
            ]
          }
        ]
      }
    return resfakeData
  }
  catch (error) {
    console.error('[Get AllTweetData failed]: ', error);
  }

}