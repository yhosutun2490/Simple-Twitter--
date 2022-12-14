import styles from "./HomePage.module.scss";
import TweetInput from "../../Components/TweetInput";
import UserTweetList from "../../Components/UserTweetList";
import { useState, useEffect, useRef } from "react";
import { getAllTweets } from "../../Api/TweetAPI";
function HomePage() {
  const [tweetList, setTweetList] = useState("");
  const containerRef = useRef(null);
  // 點擊置頂功能
  function scrollTop() {
    containerRef.current.scrollTo(0, 0);
  }
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
    <div className={styles["container"]} ref={containerRef}>
      <div className={styles["page-title"]} onClick={scrollTop}>
        首頁
      </div>
      <div className={styles["tweet-input"]}>
        <TweetInput />
      </div>
      <div className={styles["tweet-list"]}>
        <UserTweetList tweetList={tweetList} />
      </div>
    </div>
  );
}

export default HomePage;
