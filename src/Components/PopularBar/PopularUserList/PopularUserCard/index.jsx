import styles from "./PopularUserCard.module.scss";
import userAvatarDefault from "../../../../assets/icons/AcLogo.svg";
import { Link } from "react-router-dom";
import FollowButton from "../../../FollowButton";
function PopularUserCard(props) {
  const { userName, accountName, avatar, userID, isFollowed, setTopFollower } =
    props;
  return (
    <div className={styles["container"]}>
      <Link to={`/user/${userID}`}>
        <img
          src={avatar ? avatar : userAvatarDefault}
          alt="user-avatar"
          className={styles["user-avatar"]}
        />
      </Link>
      <div className={styles["user-info"]}>
        <p className={styles["user-name"]}>
          {userName ? userName : "Pizza Hut"}
        </p>
        <p className={styles["user-account"]}>
          {accountName ? `@${accountName}` : "@pizzahut"}
        </p>
      </div>

      <FollowButton
        userID={userID}
        isFollow={isFollowed}
        setTopFollower={setTopFollower}
      />
    </div>
  );
}
export default PopularUserCard;
