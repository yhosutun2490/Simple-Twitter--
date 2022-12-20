import styles from "./LikeIconButton.module.scss";
import { ReactComponent as Like } from "../../assets/icons/like_icon.svg";
import { getAllTweets } from "../../Api/TweetAPI";
import { getOneTweet } from "../../Api/TweetAPI"; //取得推文主要資料
import { userLikeTweet } from "../../Api/UserAPI"; //使用者對貼文按喜歡API
import { getOneUserTweets } from "../../Api/UserAPI"; //取得某位使用者的貼文
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
function LikeIconButton(props) {
  // 回覆按鈕點到時需要連到tweet-list頁面,large放大圖片大小(tweet推文詳細頁用)
  const {
    large,
    tweetID,
    setAllTweetList, //首頁用
    setMainTweetInfo, //首頁用
    setSelfTweetList, // 個人資料頁用
  } = props;
  const size = large ? "large" : "";
  // 取得目前所在頁面
  const { pathname } = useLocation();
  const pageName = pathname.split("/")[1]; //路由前墜
  const userLikePageName =
    pathname.split("/").length >= 4 ? pathname.split("/")[3] : ""; //抓到使用者like頁面路由params名名稱(like)
  const viewUserID = pathname.split("/")[2];

  async function handleLikeClick() {
    // 打api更新按讚狀態....
    const apiLikeResponse = await userLikeTweet(tweetID);
    if (apiLikeResponse.status === 200) {
      await Swal.fire({
        position: "top",
        title: "增加like成功！",
        timer: 2000,
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
      if (pageName === "user") {
        const userNewTweetData = await getOneUserTweets(viewUserID);
        setSelfTweetList(userNewTweetData);
        return;
      }

      // 如果目前在UserPage個人資料喜歡頁
      if (userLikePageName === "like") {
        return;
      }
    } else {
      await Swal.fire({
        position: "top",
        title: "增加like失敗",
        timer: 2000,
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
