import styles from "./LikeIconButton.module.scss";
import { ReactComponent as Like } from "../../assets/icons/like_icon.svg";
function LikeIconButton(props) {
  // 回覆按鈕點到時需要連到tweet-list頁面,large放大圖片大小(tweet推文詳細頁用)
  const { large } = props;
  const size = large ? "large" : "";
  function handleLikeClick() {
    // 打api更新按讚狀態....
  }
  return (
    <div className={styles["container"]} onClick={handleLikeClick}>
      <Like className={styles[size]} />
    </div>
  );
}
export default LikeIconButton;
