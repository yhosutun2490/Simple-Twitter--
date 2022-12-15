import styles from "./ProfileEditButton.module.scss";
import bellIcon from "../../assets/icons/bell_plus.svg";
import messageIcon from "../../assets/icons/message_icon.svg";
import FollowButton from "../FollowButton";

function ProfileEditButton(props) {
  // 透過登入者id和搜尋者id是否一樣判斷是否為本人
  // 非本人有isFollow追隨選項
  const { currentUserID, userID, isFollow } = props;
  return (
    <div className={styles["container"]}>
      {currentUserID === userID ? (
        <div className={styles["edit-btn"]}>編輯個人資料</div>
      ) : (
        <div className={styles["other-btn"]}>
          <div className={styles["message-avatar"]}>
            <img src={messageIcon} alt="message" />
          </div>
          <div className={styles["bell-avatar"]}>
            <img src={bellIcon} alt="bell" />
          </div>
          <FollowButton isFollow />
        </div>
      )}
    </div>
  );
}
export default ProfileEditButton;
