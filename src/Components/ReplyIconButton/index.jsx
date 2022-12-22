import styles from "./ReplyIconButton.module.scss";
import { ReactComponent as Reply } from "../../assets/icons/reply_icon.svg";
import ReplyModal from "../ReplyModal";
import { useState } from "react";

function ReplyIconButton(props) {
  // 回覆按鈕點到時需要連到ReplyModal彈跳視窗，large放大圖片大小(tweet推文詳細頁用)
  const {
    tweetID,
    Avatar,
    content,
    name,
    account,
    update,
    large,
    setAllTweetList,
    setReplies,
    setMainTweetInfo,
    setSelfTweetList,
  } = props;
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
        tweetID={tweetID}
        tweeterAvatar={Avatar}
        tweeterAccount={account}
        tweeterName={name}
        content={content}
        update={update}
        userAvatar={Avatar}
        setAllTweetList={setAllTweetList}
        setReplies={setReplies}
        setMainTweetInfo={setMainTweetInfo}
        setSelfTweetList={setSelfTweetList}
      />
      <div className={styles["container"]} onClick={handleClick}>
        <Reply className={styles[size]} />
      </div>
    </>
  );
}
export default ReplyIconButton;
