import styles from "./ProfileInfo.module.scss";
import ProfileEditButton from "../ProfileEditButton";
import { Link } from "react-router-dom"; //按到追隨者、追隨中轉址用
function ProfileInfo(props) {
  const {
    Avatar,
    account,
    name,
    content,
    followingCount,
    followerCount,
    userID,
    currentUserID,
  } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["user-avatar"]}>
        <img src={Avatar} alt="user-avatar" className={styles["avatar-img"]} />
      </div>
      <div className={styles["user-detail"]}>
        <ProfileEditButton currentUserID={currentUserID} userID={userID} />
        <div className={styles["user-info"]}>
          <p className={styles["user-name"]}>{name}</p>
          <p className={styles["user-account"]}>@{account}</p>
        </div>
        <div className={styles["user-description"]}>{content}</div>
        <div className={styles["user-track-info"]}>
          <div className={styles["user-following"]}>
            <Link
              to={`/user/${userID}/following`}
              className={styles["number-link"]}
            >
              {followingCount}
            </Link>
            <p className={styles["note"]}>個跟隨中</p>
          </div>
          <div className={styles["user-follower"]}>
            <Link
              to={`/user/${userID}/follower`}
              className={styles["number-link"]}
            >
              {followerCount}
            </Link>
            <p className={styles["note"]}>位跟隨者</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
