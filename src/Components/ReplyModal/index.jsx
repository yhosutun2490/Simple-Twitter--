import styles from "./ReplyModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/cross_orange.svg";
import avatarDefault from "../../assets/icons/AcLogo.svg";
import ReplyTweetButton from "./ReplyTweetButton";
import UserInfo from "../UserTweetBox/UserInfo";
import { useState, useRef } from "react";
import { TimeFromNow } from "../../CostumHook/TransFormDate";
import { getAllTweets } from "../../Api/TweetAPI"; //取得所有推文API
import { getOneTweet } from "../../Api/TweetAPI"; //取得單支貼文資訊API
import { getOneTweetReplies } from "../../Api/RepliesAPI"; //取得單支貼文列表API
import { replyOneTweet } from "../../Api/RepliesAPI"; //回覆貼文API
import { useLocation } from "react-router-dom"; //用來判斷目前網址 決定呼叫哪支API更新
import Swal from "sweetalert2";
function ReplyModal(props) {
  // 目前位置名稱
  const { pathname } = useLocation();
  const nowPageName = pathname.split("/")[1]; //判斷 現在在home 還是 tweet
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
    update,
    setAllTweetList, //三個狀態同步畫面
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
  async function handleReplyTweet() {
    if (text.length > 140) {
      return;
    }
    if (text.length === 0) {
      setIsBlank(true);
    }
    const tweetResponse = await replyOneTweet(tweetID, text);
    console.log(tweetResponse);
    if (tweetResponse.status === 200) {
      await Swal.fire({
        position: "top",
        title: "成功推文！",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      setText("");
      // 成功回覆推文後要再更新資料(homepage)
      if (nowPageName === "home") {
        const newTweetListData = await getAllTweets(); //取得最新所有貼文
        setAllTweetList(newTweetListData); // 刷新tweetlist (homepage)
        closeEvent(false); //關掉彈窗
      }

      // 關閉視窗
      closeEvent(false);
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
              <img
                src={tweeterAvatar ? tweeterAvatar : avatarDefault}
                className={styles["tweeter-avatar"]}
                alt="tweet-avatar"
              />
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
              <img
                className={styles["avatar-img"]}
                src={userAvatar !== null ? userAvatar : avatarDefault}
                alt="user-avatar"
              />
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
