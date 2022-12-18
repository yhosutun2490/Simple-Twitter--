import styles from "./TweetButtonSideBar.module.scss";
import Button from "../../../Button";
import TweetModal from "../../../TweetModal";
import { useState } from "react";
function TweetButtonSideBar(props) {
  // 設定推文視窗由推文按鈕決定要不要打開的狀態
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { children} = props;
  function handleOnClick() {
    setIsOpenModal(true);
  }

  return (
    <>
      <TweetModal
        trigger={isOpenModal}
        closeEvent={setIsOpenModal}
        userAvatar
        currentUserID
      />
      <div className={styles["container"]} onClick={handleOnClick}>
        <Button styleName={"lg-bg-logo"}>{children}</Button>
      </div>
    </>
  );
}
export default TweetButtonSideBar;
