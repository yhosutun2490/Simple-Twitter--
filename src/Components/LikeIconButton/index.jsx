import styles from "./LikeIconButton.module.scss";
import { ReactComponent as Like } from "../../assets/icons/like_icon.svg";
import { userLikeTweet } from "../../Api/UserAPI"; //使用者對貼文按喜歡API
function LikeIconButton(props) {
  // 回覆按鈕點到時需要連到tweet-list頁面,large放大圖片大小(tweet推文詳細頁用)
  const { large, tweetID } = props;
  const size = large ? "large" : "";
  async function handleLikeClick() {
    // 打api更新按讚狀態....
    const apiLikeResponse = await userLikeTweet(tweetID);
    console.log(apiLikeResponse);
  }
  return (
    <div className={styles["container"]} onClick={handleLikeClick}>
      <Like className={styles[size]} />
    </div>
  );
}
export default LikeIconButton;
