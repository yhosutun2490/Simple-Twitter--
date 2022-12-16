import styles from "./FollowUserCard.module.scss";
import FollowButton from "../../FollowButton";
function FollowUserCard(props) {
  const { avatar, userName, description, isFollow } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["user-avatar"]}>
        <img src={avatar} alt="avatar-img" className={styles["avatar-img"]} />
      </div>
      <div className={styles["follower-info"]}>
        <div className={styles["follower-title"]}>
          <p className={styles["user-name"]}>{userName}</p>
          <FollowButton isFollow={isFollow} className={styles["follow-btn"]} />
        </div>
        <div className={styles["user-description"]}>{description}</div>
      </div>
    </div>
  );
}
export default FollowUserCard;
