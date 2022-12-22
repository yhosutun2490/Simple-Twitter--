import styles from "./HomePage.module.scss";
import TweetInput from "../../Components/TweetInput";
import UserTweetList from "../../Components/UserTweetList";
import { useEffect, useRef } from "react";
import { getAllTweets } from "../../Api/TweetAPI";
import { useTweetList } from "../../Context/TweetContext"; //引入context
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { allTweetList, setAllTweetList } = useTweetList(); //由外層總狀態管理
  const containerRef = useRef(null);
  const { isAuthenticated } = useAuth(); //驗證狀態
  const navigate = useNavigate();
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

  // 如果使用者沒有取得登入授權狀態(或憑證過期)
  useEffect(() => {
    // 如果token驗證狀態沒過
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

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
