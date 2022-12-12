import styles from "./LikeFullIconButton.module.scss";
import { ReactComponent as LikeFull } from "../../assets/icons/like_full_icon.svg";
function LikeFullIconButton(props) {
  // 回覆按鈕點到時需要連到tweet-list頁面,large放大圖片大小(tweet推文詳細頁用)
  const { tweetID, large } = props;
  const size = large ? "large" : "";
  function handleLikeClick() {
    // 打api更新按讚狀態....
  }
  return (
    <div className={styles["container"]}>
      <LikeFull className={styles[size]} />
    </div>
  );
}
export default LikeFullIconButton;
