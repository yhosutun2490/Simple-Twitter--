import styles from "./LikeFullIconButton.module.scss";
import { userDisLikeTweet } from "../../Api/UserAPI"; //使用者unLike貼文
import { ReactComponent as LikeFull } from "../../assets/icons/like_full_icon.svg";
import Swal from "sweetalert2";
function LikeFullIconButton(props) {
  // 回覆按鈕點到時需要連到tweet-list頁面,large放大圖片大小(tweet推文詳細頁用)
  const { large, tweetID } = props; // 需要傳進該Tweet貼文id，判斷API該打哪個params
  const size = large ? "large" : "";
  async function handleLikeClick() {
    // 打api更新按讚狀態....
    const apiDisLikeResponse = await userDisLikeTweet(tweetID);
    if (apiDisLikeResponse.status === 200) {
      await Swal.fire({
        position: "top",
        title: "取消like成功！",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        position: "top",
        title: "取消like失敗",
        timer: 2000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  }
  return (
    <div className={styles["container"]} onClick={handleLikeClick}>
      <LikeFull className={styles[size]} />
    </div>
  );
}
export default LikeFullIconButton;
