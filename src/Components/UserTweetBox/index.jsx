import styles from "./UserTweetBox.module.scss";
import { Link } from "react-router-dom";
import avatarDefault from "../../assets/icons/AcLogo.svg";
import ReplyIconButton from "../ReplyIconButton";
import UserInfo from "./UserInfo";
import LikeFullIconButton from "../LikeFullIconButton";
import LikeIconButton from "../LikeIconButton";
import { TimeFromNow } from "../../CostumHook/TransFormDate";
import { useTweetList } from "../../Context/TweetContext"; //控制homePageTweetLsit的狀態更新
function UserTweetBox(props) {
  const { setAllTweetList } = useTweetList(); //刷新tweetList的set function
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
    setSelfTweetList, //個人頁面同步更新用
    setSelfLikeTweet, // 個人喜歡貼文同步更新用
    isOnLikePage,
  } = props;
  // 日期資料轉換
  const date = TimeFromNow(update);
  return (
    <div className={styles["container"]}>
      <div className={styles["user-avatar"]}>
        <Link to={`/user/${tweeterID}`}>
          <img
            src={avatar ? avatar : avatarDefault}
            className={styles["avatar-img"]}
            alt="avatar-img"
          />
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
                Avatar={avatar}
                currentUserAvatar
                currentUserID
                tweetID={tweetID}
                content={content}
                name={tweeterName}
                account={tweeterAccount}
                update={update}
                setAllTweetList={setAllTweetList}
                setSelfTweetList={setSelfTweetList}
              />
            </div>
            <p className={styles["reply-number"]}>{tweetNumber}</p>
          </div>
          <div className={styles["tweet-social-group"]}>
            {isLike === 1 && (
              <div className={styles["like-btn"]}>
                <LikeFullIconButton
                  tweetID={tweetID}
                  setAllTweetList={setAllTweetList}
                  setSelfLikeTweet={setSelfLikeTweet}
                  isOnLikePage={isOnLikePage}
                />
              </div>
            )}
            {isLike === 0 && (
              <div className={styles["like-btn"]}>
                <LikeIconButton
                  tweetID={tweetID}
                  setAllTweetList={setAllTweetList}
                  setSelfLikeTweet={setSelfLikeTweet}
                  isOnLikePage={isOnLikePage}
                />
              </div>
            )}
            {isLike === false && (
              <div className={styles["like-btn"]}>
                <LikeIconButton
                  tweetID={tweetID}
                  tweeterID={tweetID}
                  setSelfTweetList={setSelfTweetList}
                  isOnLikePage={isOnLikePage}
                />
              </div>
            )}
            {isLike === true && (
              <div className={styles["like-btn"]}>
                <LikeFullIconButton
                  tweetID={tweetID}
                  tweeterID={tweetID}
                  setSelfTweetList={setSelfTweetList}
                  isOnLikePage={isOnLikePage}
                />
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
