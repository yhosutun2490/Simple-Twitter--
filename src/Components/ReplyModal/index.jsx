import styles from "./ReplyModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/cross_orange.svg";
import { ReactComponent as Avatar } from "../../assets/icons/user_fake.svg";
import AcLogo from "../../assets/icons/AcLogo.svg";
import ReplyTweetButton from "./ReplyTweetButton";
import UserInfo from "../UserTweetBox/UserInfo";
import { useState, useRef } from "react";
import { TimeFromNow } from "../../CostumHook/TransFormDate";
function ReplyModal(props) {
  // 設定props 打開與否和關閉事件
  const {
    trigger,
    closeEvent,
    tweetID,
    tweeterAvatar,
    tweeterAccount,
    tweeterName,
    content,
    userAvatar,
    userID,
    update,
  } = props;
  // 回覆文字狀態紀錄
  const [text, setText] = useState("");
  // 送出推文按鈕時顯示空白錯誤
  const [isBlank, setIsBlank] = useState(false);
  // 設定useRef讓輸入內容高度能夠變化
  const textAreaRef = useRef(null);
  // 日期資料轉換
  const date = TimeFromNow(update);
  function textAreaChange(e) {
    e.style.height = "auto";
    e.style.height = e.scrollHeight + "px";
    setText(e.value);
  }
  // 處理回覆貼文送出
  function handleReplyTweet() {
    if (text.length > 140) {
      return;
    }
    if (text.length === 0) {
      setIsBlank(true);
    }
  }
  // 使用者重複輸入時，不重複顯示空白提示
  function handleOnFocus() {
    setIsBlank(false);
  }

  return trigger ? (
    <>
      <div
        className={styles["popup-backdrop"]}
        onClick={() => {
          setText("");
          setIsBlank(false);
          closeEvent(false);
        }}
      ></div>
      <div className={styles["popup-main-window"]}>
        <div className={styles["popup-head"]}>
          <button
            className={styles["btn-close"]}
            onClick={() => {
              setText("");
              setIsBlank(false);
              closeEvent(false);
            }}
          >
            <Close className={styles["btn-close-img"]} />
          </button>
        </div>
        <div className={styles["popup-body"]}>
          <div className={styles["tweet-info-body"]}>
            <div className={styles["avatar-main"]}>
              <img src={tweeterAvatar} className={styles["tweeter-avatar"]} />
              <div className={styles["connect-line"]}></div>
            </div>
            <div className={styles["tweet-content-info"]}>
              <UserInfo
                userName={tweeterName}
                account={tweeterAccount}
                update={date}
              />
              <div className={styles["tweet-content"]}>{content}</div>
              <div className={styles["response-to-user"]}>
                <p className={styles["response-title-1"]}>回覆給</p>
                <p className={styles["response-title-2"]}>@{tweeterAccount}</p>
              </div>
            </div>
          </div>
          <div className={styles["input-main-body"]}>
            <div className={styles["user-avatar"]}>
              <Avatar />
            </div>
            <div className={styles["input-body"]} onFocus={handleOnFocus}>
              <textarea
                className={styles["input-textarea"]}
                placeholder="推你的回覆"
                ref={textAreaRef}
                onChange={(e) => textAreaChange(e.target)}
                value={text}
              ></textarea>
            </div>
          </div>
        </div>
        <div className={styles["popup-footer"]}>
          {text.length > 140 ? (
            <div className={styles["error-message"]}>字數超過上限140字</div>
          ) : (
            <div></div>
          )}
          {isBlank && text.length === 0 ? (
            <div className={styles["error-message"]}>內容不可空白</div>
          ) : (
            <div></div>
          )}
          <div className={styles["reply-btn"]} onClick={handleReplyTweet}>
            <ReplyTweetButton />
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
export default ReplyModal;
