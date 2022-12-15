import styles from "./TweetInfo.module.scss";
import ReplyIconButton from "../ReplyIconButton";
import LikeIconButton from "../LikeIconButton";
import LikeFullIconButton from "../LikeFullIconButton";
import { getChineseDate, TimeMeridiem } from "../../CostumHook/TransFormDate";
function TweetInfo(props) {
  // 使用到的props參數
  const { mainTweetInfo, isLiked, likeEvent } = props;
  const data = mainTweetInfo ? mainTweetInfo[0] : "";
  // 愛心變換樣式
  function handleLikeClick() {
    likeEvent(!isLiked);
  }
  // 提出mainTweetInfo資料
  const avatar = data?.user?.avatar;
  const name = data?.user?.name;
  const account = data?.user?.account;
  const content = data?.description;
  const update = data?.createdAt;
  const repliesTimes = data?.replies?.length;
  const likeTimes = data?.liked ? data.liked : "";
  const date = getChineseDate(update);
  const time = TimeMeridiem(update);
  const tweetID = data?.id;
  return (
    <div className={styles["container"]}>
      <div className={styles["tweet-user-info"]}>
        <img src={avatar} alt="user-avatar" className={styles["user-avatar"]} />
        <div className={styles["user-name-group"]}>
          <p className={styles["name"]}>{name}</p>
          <p className={styles["account"]}>@{account}</p>
        </div>
      </div>
      <div className={styles["tweet-content"]}>{content}</div>
      <div className={styles["tweet-update-detail"]}>
        <p className={styles["update-time"]}>{time}</p>
        <p className={styles["update-dot"]}>•</p>
        <p className={styles["update-date"]}>{date}</p>
      </div>
      <div className={styles["tweet-number-detail"]}>
        <div className={styles["tweet-reply"]}>
          <div className={styles["number"]}>{repliesTimes}</div>
          <p className={styles["title"]}>回覆次數</p>
        </div>
        <div className={styles["tweet-like"]}>
          <div className={styles["number"]}>{likeTimes}</div>
          <p className={styles["title"]}>喜歡次數</p>
        </div>
      </div>
      <div className={styles["tweet-social-group"]}>
        <div className={styles["reply-icon"]}>
          <ReplyIconButton
            large={true}
            tweetID={tweetID}
            Avatar={avatar}
            content={content}
            name={name}
            account={account}
            update={update}
          />
        </div>
        <div className={styles["like-icon"]} onClick={handleLikeClick}>
          {isLiked ? (
            <LikeFullIconButton large={true} />
          ) : (
            <LikeIconButton large={true} />
          )}
        </div>
      </div>
    </div>
  );
}
export default TweetInfo;
