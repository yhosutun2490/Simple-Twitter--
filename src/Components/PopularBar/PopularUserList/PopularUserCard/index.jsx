import styles from "./PopularUserCard.module.scss";
import { ReactComponent as UserFakeAvatar } from "../../../../assets/icons/AcLogo.svg";
import FollowButton from "../../../FollowButton";
function PopularUserCard(props) {
  const { userName, accountName, id, isFollowed } = props;
  return (
    <div className={styles["container"]}>
      <UserFakeAvatar className={styles["user-avatar"]} />
      <div className={styles["user-info"]}>
        <p className={styles["user-name"]}>
          {userName ? userName : "Pizza Hut"}
        </p>
        <p className={styles["user-account"]}>
          {accountName ? accountName : "@pizzahut"}
        </p>
      </div>
      <FollowButton currentUserID={1} id={id} isFollowed={isFollowed} />
    </div>
  );
}
export default PopularUserCard;
