import styles from "./HomePage.module.scss";
import TweetInput from "./TweetInput";
import UserTweetList from "./UserTweetList";
import { useRef } from "react";
function HomePage() {
  const containerRef = useRef(null);
  // 點擊置頂功能
  function scrollTop() {
    containerRef.current.scrollTo(0, 0);
  }
  return (
    <div className={styles["container"]} ref={containerRef}>
      <div className={styles["page-title"]} onClick={scrollTop}>
        首頁
      </div>
      <div className={styles["tweet-input"]}>
        <TweetInput />
      </div>
      <div className={styles["tweet-list"]}>
        <UserTweetList />
      </div>
    </div>
  );
}

export default HomePage;
