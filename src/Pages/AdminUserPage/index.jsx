import styles from "./AdminUserPage.module.scss"
import { ReactComponent as TweetFeather } from "../../assets/icons/tweet_feather_icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like_icon.svg";


function AdminUserCard(props) {
  //須從後端取得的資料
  const { coverImg, avatar, account, userName, tweetNum, likedNum, followingNum, followerNum } = props;

  return (
    <div className={styles["tweet-box-container"]}>
      <div className={styles["cover-img-container"]}>
        <img src={coverImg} className={styles["cover-img"]} alt="user-cover" />
      </div>
      <div className={styles["avatar-img-container"]}>
        <img src={avatar} className={styles["avatar-img"]} alt="user-avatar" />
      </div>
      <div className={styles["user-info"]}>
        <p className={styles["user-info-name"]}>{userName}</p>
        <p className={styles["user-info-account"]}>@{account}</p>
      </div>
      <div className={styles["user-social-info"]}>
        <div>
          <TweetFeather />
          <p>{tweetNum}</p>
        </div>
        <div>
          <LikeIcon />
          <p>{likedNum}</p>
        </div>
      </div>
      <div className={styles["user-follow-info"]}>
        <p>{followingNum}跟隨中</p>
        <p>{followerNum}跟隨者</p>
      </div>
    </div>
  );
}