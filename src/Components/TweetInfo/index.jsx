import styles from "./TweetInfo.module.scss";
import { ReactComponent as Avatar } from "../../assets/icons/user_fake.svg";
import ReplyIconButton from "../ReplyIconButton";
import LikeIconButton from "../LikeIconButton";
import LikeFullIconButton from "../LikeFullIconButton";
function TweetInfo(props) {
  // 使用到的props參數
  const {
    avatar,
    name,
    account,
    content,
    time,
    date,
    likeNumber,
    relpyNumber,
    isLiked,
    setLikeEvent,
  } = props;
  // 愛心變換樣式
  function handleLikeClick() {
    setLikeEvent(!isLiked);
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["tweet-user-info"]}>
        <Avatar className={styles["user-avatar"]} />
        <div className={styles["user-name-group"]}>
          <p className={styles["name"]}>{name ? name : "Apple"}</p>
          <p className={styles["account"]}>
            {account ? `@${account}` : "@Apple"}
          </p>
        </div>
      </div>
      <div className={styles["tweet-content"]}>
        {content
          ? content
          : "It is a long established fact that a reader will be distracted by thenreadable content of a page when looking at its layout. "}
      </div>
      <div className={styles["tweet-update-detail"]}>
        <p className={styles["update-time"]}>{time ? time : "上午 10:05"}</p>
        <p className={styles["update-dot"]}>•</p>
        <p className={styles["update-date"]}>
          {date ? date : "2021年11月10日"}
        </p>
      </div>
      <div className={styles["tweet-number-detail"]}>
        <div className={styles["tweet-reply"]}>
          <div className={styles["number"]}>
            {relpyNumber ? relpyNumber : 15}
          </div>
          <p className={styles["title"]}>回覆次數</p>
        </div>
        <div className={styles["tweet-like"]}>
          <div className={styles["number"]}>{likeNumber ? likeNumber : 22}</div>
          <p className={styles["title"]}>喜歡次數</p>
        </div>
      </div>
      <div className={styles["tweet-social-group"]}>
        <div className={styles["reply-icon"]}>
          <ReplyIconButton large={true} />
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
