import styles from "./TweetInput.module.scss";
import avatarDefault from "../../assets/icons/AcLogo.svg";
import { useState, useRef } from "react";
import TweetSubmitButton from "./TweetSubmitButton";
import { userTweet } from "../../Api/UserAPI"; //推文API
import { getAllTweets } from "../../Api/TweetAPI"; //取得所有推文
import { useAuth } from "../../Context/AuthContext"; // 取得登入使用者資料
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function TweetInput(props) {
  const { setTweetList } = props;
  // 推文內容記錄狀態用
  const [text, setText] = useState("");
  // 判斷使用者是否回到輸入狀態
  const [isOnSubmit, setIsOnSubmit] = useState(false);
  const textAreaRef = useRef(null);
  // 使用者個人資料
  const { currentUser } = useAuth();
  const currentUserAvatar = currentUser.avatar;
  const currentUserID = currentUser.id;

  //  textarea輸入框隨使用者輸入高度變化
  function textAreaChange(e) {
    e.style.height = "auto";
    e.style.height = e.scrollHeight + "px";
    setText(e.value);
  }
  async function handleTweetSubmit() {
    // 換行空白處理
    // const tweetInput = text.trim().replace(/\r\n|\n/g, "");

    // 超過140字推文表單不送出
    if (text.length > 140) {
      return;
    }
    // 空白內容處理
    if (text.length === 0) {
      setIsOnSubmit(true);
      return;
    }
    const tweetResponse = await userTweet(text);
    if (tweetResponse.status === 200) {
      await Swal.fire({
        position: "top",
        title: "成功推文！",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      setText("");
      // 成功推文後要即時更新資料
      const apiAllTweet = await getAllTweets();
      setTweetList(apiAllTweet);
    } else {
      Swal.fire({
        position: "top",
        title: "推文失敗！",
        timer: 2000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  }
  function handleOnFocus() {
    setIsOnSubmit(false);
  }
  // onFocus 事件綁在父層，當使用者重新輸入時，不再重複出現空白錯誤提示

  return (
    <div className={styles["container"]}>
      <div className={styles["input-body"]} onFocus={handleOnFocus}>
        <div className={styles["user-avatar"]}>
          <Link to={`/user/${currentUserID}`}>
            <img
              src={currentUserAvatar ? currentUserAvatar : avatarDefault}
              alt="avatar-img"
              className={styles["avatar-img"]}
            />
          </Link>
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
          {isOnSubmit && text.length === 0 ? "內容不能空白" : ""}
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
