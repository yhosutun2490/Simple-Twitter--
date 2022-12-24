import styles from "./TweetInput.module.scss";
import avatarDefault from "../../assets/icons/AcLogo.svg";
import { useState, useRef } from "react";
import TweetSubmitButton from "./TweetSubmitButton";
import { userTweet } from "../../Api/UserAPI"; //推文API
import { getAllTweets } from "../../Api/TweetAPI"; //取得所有推文
import { useAuth } from "../../Context/AuthContext"; // 取得登入使用者資料
import { Link } from "react-router-dom";
import { ToastSuccess, ToastFail } from "../../assets/sweetalert";

function TweetInput(props) {
  const { setTweetList } = props;
  // 推文內容記錄狀態用
  const [text, setText] = useState("");
  // 送出推文後等待回應狀態
  const [isOnResponse, setIsOnResponse] = useState(false);
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
    setIsOnResponse(true);

    // 超過140字推文表單不送出
    if (text.length > 140) {
      setIsOnResponse(false);
      return;
    }
    // 空白內容處理 (沒輸入和輸入空白都是不能送表單)
    if (text.trim().length === 0) {
      setIsOnSubmit(true);
      setIsOnResponse(false);
      setText("");
      return;
    }
    const tweetResponse = await userTweet(text);
    if (tweetResponse.status === 200) {
      await ToastSuccess.fire({
        title: "成功推文！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      setText("");
      setIsOnResponse(false);
      // 成功推文後要即時更新資料
      const apiAllTweet = await getAllTweets();
      setTweetList(apiAllTweet);
    }
    if (tweetResponse.status === 500) {
      ToastFail.fire({
        title: "推文失敗(伺服器問題)！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      setIsOnResponse(false);
    }
    // 推文空白內容萬一被送出
    if (tweetResponse.status === 406) {
      ToastFail.fire({
        title: "推文失敗~內容不容空白或數超過上限！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      setIsOnResponse(false);
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
          {isOnSubmit && text.trim().length === 0 ? "內容不能空白" : ""}
          {text.length > 140 ? "字數超過上限140字" : ""}
        </div>
        <div className={styles["tweet-btn"]} onClick={handleTweetSubmit}>
          {isOnResponse && <div className={styles["loading"]}></div>}
          {isOnResponse && <div className={styles["loading-btn"]}>傳送中</div>}
          {!isOnResponse && <TweetSubmitButton />}
        </div>
      </div>
    </div>
  );
}
export default TweetInput;
