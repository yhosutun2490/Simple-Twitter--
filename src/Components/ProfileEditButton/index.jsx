import styles from "./ProfileEditButton.module.scss";
import notificatiobIcon from "../../assets/icons/notification_info.svg";
import messageIcon from "../../assets/icons/letter_icon.svg";
import FollowButton from "../FollowButton";

function ProfileEditButton(props) {
  // 透過登入者id和搜尋者id是否一樣判斷是否為本人
  // 非本人有isFollow追隨選項
  const { currentUserID, viewID, isFollow } = props;
  const stringCurrentUserID = String(currentUserID); //轉成文字
  return (
    <div className={styles["container"]}>
      {stringCurrentUserID === viewID ? (
        <div className={styles["edit-btn"]}>編輯個人資料</div>
      ) : (
        <div className={styles["other-btn"]}>
          <div className={styles["message-avatar"]}>
            <img
              src={messageIcon}
              alt="message"
              className={styles["avatar-img"]}
            />
          </div>
          <div className={styles["bell-avatar"]}>
            <img
              src={notificatiobIcon}
              alt="bell"
              className={styles["avatar-img"]}
            />
          </div>
          <FollowButton isFollow />
        </div>
      )}
    </div>
  );
}
export default ProfileEditButton;
