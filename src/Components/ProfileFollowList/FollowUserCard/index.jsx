import styles from "./FollowUserCard.module.scss";
import FollowButton from "../../FollowButton";
import { Link } from "react-router-dom";
function FollowUserCard(props) {
  const { avatar, userName, description, isFollow, userID } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["user-avatar"]}>
        <Link to={`/user/${userID}`} className={styles["user-avatar-link"]}>
          <img src={avatar} alt="avatar-img" className={styles["avatar-img"]} />
        </Link>
      </div>
      <div className={styles["follower-info"]}>
        <div className={styles["follower-title"]}>
          <p className={styles["user-name"]}>{userName}</p>
          <FollowButton
            isFollow={isFollow}
            className={styles["follow-btn"]}
            userID={userID}
          />
        </div>
        <div className={styles["user-description"]}>{description}</div>
      </div>
    </div>
  );
}
export default FollowUserCard;
