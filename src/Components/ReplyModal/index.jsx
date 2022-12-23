import styles from "./ReplyModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/cross_orange.svg";
import avatarDefault from "../../assets/icons/AcLogo.svg";
import ReplyTweetButton from "./ReplyTweetButton";
import UserInfo from "../UserTweetBox/UserInfo";
import { useState, useRef } from "react";
import { TimeFromNow } from "../../CostumHook/TransFormDate";
import { useAuth } from "../../Context/AuthContext";
import { useTweetList } from "../../Context/TweetContext";
import { getAllTweets } from "../../Api/TweetAPI"; //取得所有推文API
import { getOneTweet } from "../../Api/TweetAPI"; //取得單支貼文資訊API
import { getOneTweetReplies } from "../../Api/RepliesAPI"; //取得單支貼文列表API
import { replyOneTweet } from "../../Api/RepliesAPI"; //回覆貼文API
import { getOneUserTweets } from "../../Api/UserAPI"; //取得使用者貼文列表
import { getOneUsersLikes } from "../../Api/UserAPI"; //取得使用者喜歡推文
import { useLocation } from "react-router-dom"; //用來判斷目前網址 決定呼叫哪支API更新
import { ToastSuccess, ToastFail } from "../../assets/sweetalert";
function ReplyModal(props) {
  // context用享狀態用
  const { setSelfTweetList, setSelfLikeData } = useTweetList();
  // 目前位置名稱
  const { pathname } = useLocation();
  const nowPageName = pathname.split("/")[1]; //判斷 現在在home 還是 tweet
  const currentTweetID = pathname.split("/")[2]; //現在回覆文的ID
  const likePageName = pathname.split("/")[3];
  // 個人資料頁觀看者的viewID
  let viewID = "";
  if (nowPageName === "user") {
    viewID = pathname.split("/")[2];
  }
  // 設定props 打開與否和關閉事件
  const {
    trigger,
    closeEvent,
    tweetID,
    tweeterAvatar,
    tweeterAccount,
    tweeterName,
    content,
    update,
    setAllTweetList, //三個同步畫面的setFunction
    setReplies,
    setMainTweetInfo,
  } = props;
  // 回覆文字狀態紀錄
  const [text, setText] = useState("");
  // 送出推文按鈕時顯示空白錯誤
  const [isBlank, setIsBlank] = useState(false);
  // 設定useRef讓輸入內容高度能夠變化
  const textAreaRef = useRef(null);
  // 日期資料轉換
  const date = TimeFromNow(update);
  // 使用者個人資料
  const { currentUser } = useAuth();
  const currentUserAvatar = currentUser.avatar;

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
    if (tweetResponse.status === 200) {
      await ToastSuccess.fire({
        position: "top",
        title: "回覆成功！",
        timer: 1000,
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
      // 在推文回覆列表頁後更新資料
      if (nowPageName === "tweet") {
        const newRepliesData = await getOneTweetReplies(currentTweetID); //取得最新單一貼文回覆資料
        setReplies(newRepliesData);
        const newMainTweetData = await getOneTweet(currentTweetID); //取得單一推文主資料
        setMainTweetInfo(newMainTweetData);
        closeEvent(false); //關掉彈窗
        return;
      }
      // 在個人推文列表頁
      if (nowPageName === "user" && likePageName !== "likes") {
        const newSelfTweetData = await getOneUserTweets(viewID);
        setSelfTweetList(newSelfTweetData);
        closeEvent(false);
      }
      // 個人喜歡推文頁
      if (likePageName === "likes") {
        const newSelfLikeTweet = await getOneUsersLikes(viewID);
        setSelfLikeData(newSelfLikeTweet);
        closeEvent(false);
      }
      // 關閉視窗
      closeEvent(false);
    } else {
      ToastFail.fire({
        position: "top",
        title: "回覆失敗！",
        timer: 1000,
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
                src={currentUserAvatar ? currentUserAvatar : avatarDefault}
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
