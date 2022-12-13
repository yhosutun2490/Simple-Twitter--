import styles from "./TweetInput.module.scss";
import { ReactComponent as Avatar } from "../../assets/icons/user_fake.svg";
import { useState, useRef } from "react";
import TweetSubmitButton from "./TweetSubmitButton";
function TweetInput() {
  // 推文內容記錄狀態用
  const [text, setText] = useState("");
  const [isBlank, setIsBlank] = useState(false);
  const textAreaRef = useRef(null);
  //  textarea輸入框隨使用者輸入高度變化
  function textAreaChange(e) {
    e.style.height = "auto";
    e.style.height = e.scrollHeight + "px";
    setText(e.value);
  }
  function handleTweetSubmit() {
    // 換行空白處理
    // const tweetInput = text.trim().replace(/\r\n|\n/g, "");

    // 超過140字推文表單不送出
    if (text.length > 140) {
      return;
    }
    // 空白內容處理
    if (text.length === 0) {
      setIsBlank(true);
      return;
    }

    // 用setTimeout 假設Api回傳成功後清除輸入
    setTimeout(() => {
      // 改回預設值狀態
      setText("");
      setIsBlank(false);
      alert("推文成功");
    }, 1000);
  }
  function handleOnFocus() {
    setIsBlank(false);
  }
  // onFocus 事件綁在父層，當使用者重新輸入時，不再重複出現空白錯誤提示

  return (
    <div className={styles["container"]}>
      <div className={styles["input-body"]} onFocus={handleOnFocus}>
        <div className={styles["user-avatar"]}>
          <Avatar />
        </div>
        <textarea
          className={styles["input-textarea"]}
          placeholder="有什麼新鮮事?"
          ref={textAreaRef}
          onChange={(e) => textAreaChange(e.target)}
          value={text}
        ></textarea>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["error-message"]}>
          {isBlank && text.length === 0 ? "內容不能空白" : ""}
          {text.length > 140 ? "字數超過上限140字" : ""}
        </div>
        <div className={styles["tweet-btn"]} onClick={handleTweetSubmit}>
          <TweetSubmitButton />
        </div>
      </div>
    </div>
  );
}
export default TweetInput;
