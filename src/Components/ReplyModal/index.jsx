import styles from "./ReplyModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/cross_orange.svg";
import { ReactComponent as Avatar } from "../../assets/icons/user_fake.svg";
import AcLogo from "../../assets/icons/AcLogo.svg";
import ReplyTweetButton from "./ReplyTweetButton";
import UserInfo from "../UserTweetBox/UserInfo";
import { useState, useRef } from "react";
function ReplyModal(props) {
  // 設定props 打開與否和關閉事件
  const { trigger, closeEvent } = props;
  // 回覆文字狀態紀錄
  const [text, setText] = useState("");
  // 送出推文按鈕時顯示空白錯誤
  const [isBlank, setIsBlank] = useState(false);
  // 設定useRef讓輸入內容高度能夠變化
  const textAreaRef = useRef(null);
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
          closeEvent(false);
        }}
      ></div>
      <div className={styles["popup-main-window"]}>
        <div className={styles["popup-head"]}>
          <button
            className={styles["btn-close"]}
            onClick={() => closeEvent(false)}
          >
            <Close className={styles["btn-close-img"]} />
          </button>
        </div>
        <div className={styles["popup-body"]}>
          <div className={styles["tweet-info-body"]}>
            <div className={styles["avatar-main"]}>
              <img src={AcLogo} className={styles["tweeter-avatar"]} />
              <div className={styles["connect-line"]}></div>
            </div>
            <div className={styles["tweet-content-info"]}>
              <UserInfo userName={"Apple"} account={"apple"} update={3} />
              <div className={styles["tweet-content"]}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour
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
