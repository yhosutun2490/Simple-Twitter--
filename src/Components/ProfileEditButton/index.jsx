import styles from "./ProfileEditButton.module.scss";
import { useState } from "react";
import notificatiobIcon from "../../assets/icons/notification_info.svg";
import messageIcon from "../../assets/icons/letter_icon.svg";
import FollowButton from "../FollowButton"; //跟隨按鈕
import ProfileEditModal from "../ProfileEditModal"; // 個人編輯彈跳視窗

function ProfileEditButton(props) {
  // 個人資料編輯視窗打開狀態
  const [isOpenModal, setIsOpenModal] = useState(false);

  // 透過登入者id和搜尋者id是否一樣判斷是否為本人
  // 非本人有isFollow追隨選項
  const { currentUserID, viewID } = props;
  const stringCurrentUserID = String(currentUserID); //轉成文字
  // 視窗打開onClick事件
  function handleOnClick() {
    setIsOpenModal(true);
  }
  return (
    <>
      <ProfileEditModal trigger={isOpenModal} closeEvent={setIsOpenModal} />
      <div className={styles["container"]}>
        {stringCurrentUserID === viewID ? (
          <button className={styles["edit-btn"]} onClick={handleOnClick}>
            編輯個人資料
          </button>
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
    </>
  );
}
export default ProfileEditButton;
