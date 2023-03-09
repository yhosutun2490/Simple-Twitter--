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
//取得某位使用者所有推文(特定id)
export const getOneUserTweets = async (userID) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/users/${userID}/tweets`)

    return res.data
  }
  catch (error) {
    console.error('[Get AllTweetData failed]: ', error);
  }
}
// 取得某位使用者回覆貼文的列表資料
export const getOneUsersReplies  = async (userID) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/users/${userID}/replied_tweets`)

    return res.data
  }
  catch (error) {
    console.error('[Get OneUserReplies failed]: ', error);
  }

}
// 取得某位使用者喜歡貼文的列表資料
export const getOneUsersLikes = async (userID) => { 
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/users/${userID}/likes`)

    return res.data
  }
  catch (error) {
    console.error('[Get OneUserLikes failed]: ', error);
  }

}

//取得某位使用者資料
export const getOneUserData = async (userID) => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/users/${userID}`)
      return res.data
  }

  catch (error) {
    console.error('[Get Get OneUser Data failed]: ', error);
  }
}

//使用者推文
export const userTweet = async (text) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/api/tweets`,{description:text})
    return res;
  } catch (error) {
    console.error("[Submit Tweet Failed]:", error);
    return error;
  }
};

// 使用者追隨名單前10名
export const getTopFollower = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/api/users/topFollow`)
    return res.data;
  } catch (error) {
    console.error("[Get TopFollowers Failed]:", error);
    return error;
  }
};

// 使用者like某貼文
export const userLikeTweet = async (tweetID) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/api/tweets/${tweetID}/like`)
    return res;
  } catch (error) {
    console.error("[like OneTweet Failed]:", error);
    return error;
  }
};
// 使用者unlike不喜歡某貼文
export const userDisLikeTweet =  async (tweetID) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}/api/tweets/${tweetID}/unlike`)
    return res;
  } catch (error) {
    console.error("[Dislike OneTweet Failed]:", error);
    return error;
  }
};




