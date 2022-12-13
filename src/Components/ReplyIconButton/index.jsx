import styles from "./ReplyIconButton.module.scss";
import { ReactComponent as Reply } from "../../assets/icons/reply_icon.svg";
import ReplyModal from "../ReplyModal";
import { useState } from "react";

function ReplyIconButton(props) {
  // 回覆按鈕點到時需要連到ReplyModal彈跳視窗，large放大圖片大小(tweet推文詳細頁用)
  const { tweetID, large } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const size = large ? "large" : "";
  function handleClick() {
    setIsOpenModal(true);
  }
  return (
    <>
      <ReplyModal
        trigger={isOpenModal}
        closeEvent={setIsOpenModal}
        tweetID
        tweetAvatar
        tweeterAccount
        tweeterName
        responseAccount
        content
        userAvatar
        userId
      />
      <div className={styles["container"]} onClick={handleClick}>
        <Reply className={styles[size]} />
      </div>
    </>
  );
}
export default ReplyIconButton;
