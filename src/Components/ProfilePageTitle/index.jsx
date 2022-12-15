import styles from "./ProfilePageTitle.module.scss";
import { ReactComponent as ArrowPre } from "../../assets/icons/arrowPre.svg";
import { Link } from "react-router-dom"; //轉址至HomePage用
function ProfilePageTitle(props) {
  // props 有個人名稱name、推文次數
  const { name, tweetCount } = props;
  return (
    <div className={styles["container"]}>
      <Link to={"/home"}>
        <div className={styles["arrow-img"]}></div>
        <ArrowPre />
      </Link>
      <div className={styles["profile-title"]}>
        <div className={styles["user-name"]}>{name}</div>
        <div className={styles["tweet-count"]}>{tweetCount} 貼文</div>
      </div>
    </div>
  );
}
export default ProfilePageTitle;
