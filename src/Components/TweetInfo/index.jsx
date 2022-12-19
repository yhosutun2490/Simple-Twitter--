import styles from "./TweetInfo.module.scss";
import ReplyIconButton from "../ReplyIconButton";
import LikeIconButton from "../LikeIconButton";
import LikeFullIconButton from "../LikeFullIconButton";
import avatarDefault from "../../assets/icons/AcLogo.svg";
import { getChineseDate, TimeMeridiem } from "../../CostumHook/TransFormDate";
import { Link } from "react-router-dom";
function TweetInfo(props) {
  // 使用到的props參數
  const { mainTweetInfo, setReplies, setMainTweetInfo } = props;
  const data = mainTweetInfo ? mainTweetInfo : "";
  
  // 提出mainTweetInfo資料
  const avatar = data?.User?.avatar;
  const name = data?.User?.name;
  const account = data?.User?.account;
  const userID = data?.User?.id;
  const content = data?.description;
  const update = data?.createdAt;
  const repliesTimes = data?.replyCount;
  const likeTimes = data?.likeCount;
  const date = getChineseDate(data?.createdAt);
  const isLike = data?.isLiked;
  const time = TimeMeridiem(data?.createdAt);
  const tweetID = data?.id;
  return (
    <div className={styles["container"]}>
      <div className={styles["tweet-user-info"]}>
        <Link to={`/user/${userID}`}>
          <img
            src={avatar ? avatar : avatarDefault}
            alt="user-avatar"
            className={styles["user-avatar"]}
          />
        </Link>

        <div className={styles["user-name-group"]}>
          <p className={styles["name"]}>{name ? name : "Apple"}</p>
          <p className={styles["account"]}>@{account ? account : "apple"}</p>
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
            setReplies={setReplies}
            setMainTweetInfo={setMainTweetInfo}
          />
        </div>
        <div className={styles["like-icon"]}>
          {isLike ? (
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
