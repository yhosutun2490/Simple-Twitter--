import styles from "./UserTweetBox.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Avatar } from "../../assets/icons/AcLogo.svg";
import { ReactComponent as Reply } from "../../assets/icons/reply_icon.svg";
import { ReactComponent as Like } from "../../assets/icons/like_icon.svg";
import { ReactComponent as FullLike } from "../../assets/icons/like_full_icon.svg";
import UserInfo from "./UserInfo";
function UserTweetBox(props) {
  // 先設定好要傳入的資料props
  const {
    account,
    userName,
    update,
    tweetNumber,
    likesNumber,
    tweetID,
    isLike,
  } = props;

  return (
    <div className={styles["container"]}>
      <div className={styles["user-avatar"]}>
        <Link to={`/user/${account}`}>
          <Avatar />
        </Link>
      </div>
      <div className={styles["tweet-detail"]}>
        <UserInfo userName={userName} account={account} update={update} />
        <div className={styles["tweet-content"]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </div>
        <div className={styles["tweet-social-list"]}>
          <div className={styles["tweet-social-group"]}>
            <Link className={styles["reply-link"]} to={`/tweet/${tweetID}`}>
              <Reply />
            </Link>
            <p className={styles["reply-number"]}>
              {tweetNumber ? tweetNumber : 16}
            </p>
          </div>
          <div className={styles["tweet-social-group"]}>
            {isLike ? (
              <div className={styles["like-link"]}>
                <FullLike />
              </div>
            ) : (
              <div className={styles["like-link"]}>
                <Like />
              </div>
            )}

            <p className={styles["like-number"]}>
              {likesNumber ? likesNumber : 5}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserTweetBox;
