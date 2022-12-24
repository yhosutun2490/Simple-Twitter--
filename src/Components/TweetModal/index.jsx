import styles from "./TweetModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/cross_orange.svg";
import { useState, useRef } from "react";
import TweetSubmitButton from "../TweetInput/TweetSubmitButton";
import avatarDefault from "../../assets/icons/AcLogo.svg";
import { useTweetList } from "../../Context/TweetContext"; //引入context推文同步更新用
import { userTweet } from "../../Api/UserAPI"; //推文API
import { getAllTweets } from "../../Api/TweetAPI";
import { getOneUserTweets } from "../../Api/UserAPI";
import { useAuth } from "../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import { ToastSuccess, ToastFail } from "../../assets/sweetalert";

function TweetModal(props) {
  // 設定推文列表清單的狀態
  const { setAllTweetList, setSelfTweetList } = useTweetList();
  // 設定trigger參數，true or false決定彈窗打開與否
  // 設定關掉彈窗的set function (父層傳入)
  const { trigger, closeEvent } = props;
  const [text, setText] = useState("");
  const [isBlank, setIsBlank] = useState(false);
  const textAreaRef = useRef(null);
  // 使用者個人資料
  const { currentUser } = useAuth();
  const currentUserAvatar = currentUser.avatar;
  const currentUserID = Number(currentUser.id);
  // 現在觀看的使用者頁面id、頁面名稱
  const { pathname } = useLocation();
  const pathNameArr = pathname.split("/");
  const currentPageName = pathNameArr[1];
  const viewID = Number(pathNameArr[2]);

  //  textarea輸入框隨使用者輸入高度變化
  function textAreaChange(e) {
    e.style.height = "auto";
    e.style.height = e.scrollHeight + "px";
    setText(e.value);
  }

  async function handleTweetSubmit() {
    // 換行空白處理
    // const tweetInput = text.trim().replace(/\r\n|\n/g, "");
    // 超過140字和空白內文不送出推文表單
    if (text.length > 140) {
      return;
    }
    if (text.length === 0) {
      setIsBlank(true);
      return;
    }
    const tweetResponse = await userTweet(text);
    if (tweetResponse.status === 200) {
      setText("");
      if (currentPageName === "home") {
        // 成功推文後要即時更新資料(homepage)
        const apiAllTweet = await getAllTweets();
        setAllTweetList(apiAllTweet);
        closeEvent(false);
        await ToastSuccess.fire({
          position: "top",
          title: "成功推文！",
          timer: 2000,
          icon: "success",
          showConfirmButton: false,
        });
      }
      // 成功推文後要即時更新資料(個人頁面)
      if (currentPageName === "user" && currentUserID === viewID) {
        const apiSelfTweet = await getOneUserTweets(currentUserID);
        setSelfTweetList(apiSelfTweet);
        closeEvent(false);
        await ToastSuccess.fire({
          title: "成功推文！",
          timer: 2000,
          icon: "success",
          showConfirmButton: false,
        });
      }
    }
    if (tweetResponse.status === 500) {
      ToastFail.fire({
        title: "推文失敗(伺服器問題)！",
        timer: 2000,
        icon: "error",
        showConfirmButton: false,
      });
    }
    // 推文空白內容萬一被送出
    if (tweetResponse.status === 406) {
      ToastSuccess.fire({
        title: "推文失敗~內容不容空白或數超過上限！",
        timer: 2000,
        icon: "error",
        showConfirmButton: false,
      });
      closeEvent(false); //導回同一頁
    }
  }
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
        <div className={styles["popup-body"]} onFocus={handleOnFocus}>
          <div className={styles["user-avatar"]}>
            <img
              src={currentUserAvatar ? currentUserAvatar : avatarDefault}
              alt="avatar-img"
              className={styles["avatar-img"]}
            />
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
          {isBlank && text.length === 0 ? (
            <div className={styles["error-message"]}>內容不可空白</div>
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
