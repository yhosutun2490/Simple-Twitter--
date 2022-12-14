import UserTweetBox from "../UserTweetBox";
import { useState, useEffect } from "react";
import { getAllTweets } from "../../Api/TweetAPI";

function UserTweetList() {
  const [tweetList, setTweetList] = useState("");
  console.log(tweetList);
  console.log("渲染");

  // 由API獲取所有Tweet資料 (只有第一次mount呼叫useEffect)
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweets = async () => {
      try {
        const apiAllTweet = await getAllTweets(); // 等待資料回傳後渲染
        setTweetList(apiAllTweet);
      } catch (error) {
        console.error("initialize allTweets error", error);
      }
    };
    apiTweets();
  }, []);

  return (
    <div>
      <UserTweetBox isLike={true} />
      <UserTweetBox />
      <UserTweetBox isLike={true} />
      <UserTweetBox isLike={true} />
      <UserTweetBox />
      <UserTweetBox />
      <UserTweetBox />
      <UserTweetBox />
    </div>
  );
}

export default UserTweetList;
