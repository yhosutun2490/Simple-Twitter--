import styles from "./HomePage.module.scss";
import TweetInput from "../../Components/TweetInput";
import UserTweetList from "../../Components/UserTweetList";
import { useEffect, useRef } from "react";
import { getAllTweets } from "../../Api/TweetAPI";
import { useTweetList } from "../../Context/TweetContext"; //引入context

function HomePage() {
  const { allTweetList, setAllTweetList } = useTweetList();
  const containerRef = useRef(null);
  // 點擊置頂功能 (test auto deploy)
  function scrollTop() {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }
  // 由API獲取所有Tweet資料 (只有第一次mount呼叫useEffect)
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweets = async () => {
      try {
        const apiAllTweet = await getAllTweets(); // 等待資料回傳後渲染
        setAllTweetList(apiAllTweet);
      } catch (error) {
        console.error("initialize allTweets error", error);
      }
    };
    apiTweets();
  }, [setAllTweetList]);

  return (
    <div className={styles["container"]} ref={containerRef}>
      <div className={styles["page-title"]} onClick={scrollTop}>
        首頁
      </div>
      <div className={styles["tweet-input"]}>
        <TweetInput setTweetList={setAllTweetList} />
      </div>
      <div className={styles["tweet-list"]}>
        <UserTweetList tweetList={allTweetList} />
      </div>
    </div>
  );
}

export default HomePage;
