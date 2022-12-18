import styles from "./UserTweetBox.module.scss";
import { Link } from "react-router-dom";
// import { ReactComponent as Avatar } from "../../assets/icons/AcLogo.svg";
import ReplyIconButton from "../ReplyIconButton";
import UserInfo from "./UserInfo";
import LikeFullIconButton from "../LikeFullIconButton";
import LikeIconButton from "../LikeIconButton";
import { TimeFromNow } from "../../CostumHook/TransFormDate";
function UserTweetBox(props) {
  // 先設定好要傳入的資料props
  // 資料要傳給ReplyIconButton 跳窗才會正常顯示資料
  const {
    tweeterAccount,
    tweeterName,
    tweeterID,
    avatar,
    update,
    content,
    tweetNumber,
    likesNumber,
    tweetID,
    isLike,
  } = props;
  // 日期資料轉換
  const date = TimeFromNow(update);
  return (
    <div className={styles["container"]}>
      <div className={styles["user-avatar"]}>
        <Link to={`/user/${tweeterID}`}>
          <img src={Avatar} className={styles["avatar-img"]} alt="avatar-img" />
        </Link>
      </div>
      <div className={styles["tweet-detail"]}>
        <UserInfo
          userName={tweeterName}
          account={tweeterAccount}
          update={date}
        />
        <div className={styles["tweet-content"]}>
          <Link
            to={`/tweet/${tweetID}`}
            className={styles["tweet-content-link"]}
          >
            {content}
          </Link>
        </div>
        <div className={styles["tweet-social-list"]}>
          <div className={styles["tweet-social-group"]}>
            <div className={styles["reply-link"]}>
              <ReplyIconButton
                Avatar={Avatar}
                currentUserAvatar
                currentUserID
                tweetID={tweetID}
                content={content}
                name={tweeterName}
                account={tweeterAccount}
                update={update}
              />
            </div>
            <p className={styles["reply-number"]}>{tweetNumber}</p>
          </div>
          <div className={styles["tweet-social-group"]}>
            {isLike ? (
              <div className={styles["like-btn"]}>
                <LikeFullIconButton />
              </div>
            ) : (
              <div className={styles["like-btn"]}>
                <LikeIconButton />
              </div>
            )}

            <p className={styles["like-number"]}>{likesNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserTweetBox;
