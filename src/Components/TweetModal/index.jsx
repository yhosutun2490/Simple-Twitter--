import styles from "./TweetModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/cross_orange.svg";
import { ReactComponent as Avatar } from "../../assets/icons/user_fake.svg";
import { useState, useRef } from "react";
import TweetSubmitButton from "../TweetInput/TweetSubmitButton";

function TweetModal(props) {
  // 設定trigger參數，true or false決定彈窗打開與否
  // 設定關掉彈窗的set function (父層傳入)
  const { trigger, closeEvent, userAvatar, currentUserID } = props;
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);

  //  textarea輸入框隨使用者輸入高度變化
  function textAreaChange(e) {
    e.style.height = "auto";
    e.style.height = e.scrollHeight + "px";
    setText(e.value);
  }
  function handleTweetSubmit() {
    // 換行空白處理
    const tweetInput = text.trim().replace(/\r\n|\n/g, "");
    console.log(tweetInput);
    // 超過140字不送出推文表單
    if (text.length > 140) {
      return;
    }
  }
  return trigger ? (
    <>
      <div
        className={styles["popup-backdrop"]}
        onClick={() => {
          setText("");
          closeEvent(false);
        }}
      ></div>
      <div className={styles["popup-main-window"]}>
        <div className={styles["popup-head"]}>
          <button
            className={styles["btn-close"]}
            onClick={() => {
              setText("");
              closeEvent(false);
            }}
          >
            <Close className={styles["btn-close-img"]} />
          </button>
        </div>
        <div className={styles["popup-body"]}>
          <div className={styles["user-avatar"]}>
            <Avatar />
          </div>
          <div className={styles["input-body"]}>
            <textarea
              className={styles["input-textarea"]}
              placeholder="有什麼新鮮事?"
              ref={textAreaRef}
              onChange={(e) => textAreaChange(e.target)}
              value={text}
            ></textarea>
          </div>
        </div>
        <div className={styles["popup-footer"]}>
          {text.length > 140 ? (
            <div className={styles["error-message"]}>字數超過上限140字</div>
          ) : (
            <div></div>
          )}
          <div onClick={handleTweetSubmit}>
            <TweetSubmitButton />
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default TweetModal;
