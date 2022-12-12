import styles from "./ReplyIconButton.module.scss";
import { ReactComponent as Reply } from "../../assets/icons/reply_icon.svg";
import { Link } from "react-router-dom";
function ReplyIconButton(props) {
  // 回覆按鈕點到時需要連到tweet-list頁面,large放大圖片大小(tweet推文詳細頁用)
  const { tweetID, large } = props;
  const size = large ? "large" : "";
  return (
    <div className={styles["container"]}>
      <Link to={`/tweet/${tweetID}`}>
        <Reply className={styles[size]} />
      </Link>
    </div>
  );
}
export default ReplyIconButton;
