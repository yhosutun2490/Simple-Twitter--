import styles from "./TweetPage.module.scss";
import { ReactComponent as PreArrow } from "../../assets/icons/arrowPre.svg";
import TweetInfo from "../../Components/TweetInfo";
import ReplyList from "../../Components/ReplyList";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOneTweet } from "../../Api/TweetAPI";
import { getOneTweetReplies } from "../../Api/RepliesAPI";

function TweetPage() {
  const [isLiked, setIsLiked] = useState(false);
  const [mainTweetInfo, setMainTweetInfo] = useState("");
  const [replies, setRplies] = useState("");
  const containerRef = useRef(null);

  // 點擊置頂功能
  function scrollTop() {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }
  // 呼叫該頁API
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweets = async () => {
      try {
        const apiOneTweet = await getOneTweet(); // 等待資料回傳後渲染
        setMainTweetInfo(apiOneTweet);
      } catch (error) {
        console.error("initialize OneTweetPage error", error);
      }
    };
    apiTweets();
  }, []);
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweetsRplies = async () => {
      try {
        const apiOneTweetRplies = await getOneTweetReplies(); // 等待資料回傳後渲染
        setRplies(apiOneTweetRplies);
      } catch (error) {
        console.error("initialize OneTweetPage error", error);
      }
    };
    apiTweetsRplies();
  }, []);
  return (
    <div className={styles["container"]} ref={containerRef}>
      <div className={styles["page-title-wrap"]}>
        <Link to={"/home"}>
          <PreArrow className={styles["arrow-img"]} />
        </Link>

        <p className={styles["page-title"]} onClick={scrollTop}>
          推文
        </p>
      </div>
      <div className={styles["tweet-info-wrap"]}>
        <TweetInfo
          isLiked={isLiked}
          setLikeEvent={setIsLiked}
          mainTweetInfo={mainTweetInfo}
          likeEvent={setIsLiked}
        />
      </div>
      <div className={styles["tweet-reply-wrap"]}>
        <ReplyList repliesData={replies} mainTweetInfo={mainTweetInfo} />
      </div>
    </div>
  );
}

export default TweetPage;
