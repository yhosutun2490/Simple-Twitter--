import styles from "./LikeIconButton.module.scss";
import { ReactComponent as Like } from "../../assets/icons/like_icon.svg";
import { getAllTweets } from "../../Api/TweetAPI";
import { getOneTweet } from "../../Api/TweetAPI"; //取得推文主要資料
import { userLikeTweet } from "../../Api/UserAPI"; //使用者對貼文按喜歡API
import { getOneUserTweets } from "../../Api/UserAPI"; //取得某位使用者的貼文
import { getOneUsersLikes } from "../../Api/UserAPI"; //取得某位使用者喜歡的貼文
import { useLocation } from "react-router-dom";
import { ToastSuccess, ToastFail } from "../../assets/sweetalert";
function LikeIconButton(props) {
  // 回覆按鈕點到時需要連到tweet-list頁面,large放大圖片大小(tweet推文詳細頁用)
  const {
    large,
    tweetID,
    setAllTweetList, //首頁用
    setMainTweetInfo, //首頁用
    setSelfTweetList, // 個人資料頁用
    setSelfLikeTweet, // 個人喜歡貼文用
    isOnLikePage,
  } = props;
  const size = large ? "large" : "";
  // 取得目前所在頁面
  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1]; //路由前墜
  const viewUserID = pathname.split("/")[2];

  async function handleLikeClick() {
    // 打api更新按讚狀態....
    const apiLikeResponse = await userLikeTweet(tweetID);
    if (apiLikeResponse.status === 200) {
      await ToastSuccess.fire({
        title: "增加like成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      // 如果目前在homePage首頁的話
      if (pageName === "home") {
        const newAllTweetsData = await getAllTweets();
        setAllTweetList(newAllTweetsData); // 目前這段畫面沒跑到更新
      }
      // 如果在單一貼文回覆頁的話
      if (pageName === "tweet") {
        const newOneTweetData = await getOneTweet(tweetID);
        setMainTweetInfo(newOneTweetData);
      }
      // 如果目前在UserPage個人資料推文頁
      if (pageName === "user" && !isOnLikePage) {
        const userNewTweetData = await getOneUserTweets(viewUserID);
        setSelfTweetList(userNewTweetData);
        return;
      }

      // 如果目前在UserPage個人資料喜歡頁
      if (isOnLikePage) {
        const userNewLikeTweet = await getOneUsersLikes(viewUserID);
        setSelfLikeTweet(userNewLikeTweet);
        return;
      }
    } else {
      await ToastFail.fire({
        title: "增加like失敗",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  }
  return (
    <div className={styles["container"]} onClick={handleLikeClick}>
      <Like className={styles[size]} />
    </div>
  );
}
export default LikeIconButton;
