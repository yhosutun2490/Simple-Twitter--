import styles from "./TweetPage.module.scss";
import { ReactComponent as PreArrow } from "../../assets/icons/arrowPre.svg";
import TweetInfo from "../../Components/TweetInfo";
import ReplyList from "../../Components/ReplyList";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOneTweet } from "../../Api/TweetAPI";
import { getOneTweetReplies } from "../../Api/RepliesAPI";
import { useLocation } from "react-router-dom";

function TweetPage() {
  const [mainTweetInfo, setMainTweetInfo] = useState("");
  const [replies, setRplies] = useState("");
  const mainTweeter = mainTweetInfo?.User?.account;
  const containerRef = useRef(null);
  const { pathname } = useLocation();

  // 抓取路由tweet id 名稱
  const tweetID = Number(pathname.split("/")[2]);
  // 點擊置頂功能
  function scrollTop() {
    containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }
  // 呼叫該頁API
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweets = async () => {
      try {
        const apiOneTweet = await getOneTweet(tweetID); // 等待資料回傳後渲染
        setMainTweetInfo(apiOneTweet);
      } catch (error) {
        console.error("initialize OneTweetPage error", error);
      }
    };
    apiTweets();
  }, [tweetID]);
  useEffect(() => {
    // 定義初始資料fetch api
    const apiTweetsRplies = async () => {
      try {
        const apiOneTweetRplies = await getOneTweetReplies(tweetID); // 等待資料回傳後渲染
        setRplies(apiOneTweetRplies);
      } catch (error) {
        console.error("initialize OneTweetReply Data error", error);
      }
    };
    apiTweetsRplies();
  }, [tweetID]);
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
          mainTweetInfo={mainTweetInfo}
          setReplies={setRplies}
          setMainTweetInfo={setMainTweetInfo}
        />
      </div>
      <div className={styles["tweet-reply-wrap"]}>
        <ReplyList repliesData={replies} mainTweeter={mainTweeter} />
      </div>
    </div>
  );
}

export default TweetPage;
