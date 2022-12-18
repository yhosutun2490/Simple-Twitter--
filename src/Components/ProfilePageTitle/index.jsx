import styles from "./ProfilePageTitle.module.scss";
import { ReactComponent as ArrowPre } from "../../assets/icons/arrowPre.svg";
import { useNavigate } from "react-router-dom"; //轉址至HomePage用

function ProfilePageTitle(props) {
  // 回到上一頁用
  const navigate = useNavigate();
  // props 有個人名稱name、推文次數
  const { name, tweetCount, scrollTop } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["arrow-img"]} onClick={() => navigate(-1)}>
        <ArrowPre />
      </div>
      <div className={styles["profile-title"]}>
        <div className={styles["user-name"]} onClick={() => scrollTop()}>
          {name}
        </div>
        <div className={styles["tweet-count"]}>{tweetCount} 貼文</div>
      </div>
    </div>
  );
}
export default ProfilePageTitle;
