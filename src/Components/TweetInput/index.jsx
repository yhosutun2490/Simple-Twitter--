import styles from "./TweetInput.module.scss";
import { ReactComponent as Avatar } from "../../assets/icons/user_fake.svg";
import { useRef } from "react";
function TweetInput() {
  const textAreaRef = useRef(null);
  //  textarea輸入框隨使用者輸入高度變化
  function textAreaChange(e) {
    e.style.height = "auto";
    e.style.height = e.scrollHeight + "px";
  }
  function handleTweetSubmit() {
    // 換行空白處理
    const tweetInput = textAreaRef.current.value.trim().replace(/\r\n|\n/g, "");
    console.log(tweetInput);
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["input-body"]}>
        <div className={styles["user-avatar"]}>
          <Avatar />
        </div>
        <textarea
          className={styles["input-textarea"]}
          placeholder="有什麼新鮮事"
          ref={textAreaRef}
          onChange={(e) => textAreaChange(e.target)}
        ></textarea>
      </div>
      <div className={styles["footer"]}>
        <button className={styles["tweet-btn"]} onClick={handleTweetSubmit}>
          推文
        </button>
      </div>
    </div>
  );
}
export default TweetInput;
