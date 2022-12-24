import styles from "./UserTweetList.module.scss";
import UserTweetBox from "../UserTweetBox";

function UserTweetList(props) {
  const {
    tweetList,
    selfTweet,
    setSelfTweetList,
    selfLikeTweet,
    setSelfLikeTweet,
  } = props;

  return (
    <div className={styles["container"]}>
      {selfTweet && selfTweet.length === 0 ? (
        <div className={styles["no-tweet-message"]}>該使用者目前沒有推文</div>
      ) : (
        ""
      )}
      {selfLikeTweet && selfLikeTweet.length === 0 ? (
        <div className={styles["no-tweet-message"]}>
          該使用者目前沒有喜歡的推文
        </div>
      ) : (
        ""
      )}
      {selfTweet &&
        selfTweet?.map((data) => (
          <UserTweetBox
            key={data?.id}
            tweeterAccount={data?.User?.account}
            tweeterName={data?.User?.name}
            tweeterID={data?.User?.id}
            avatar={data?.User?.avatar}
            update={data?.createdAt}
            content={data?.description}
            tweetNumber={data?.replyCount}
            likesNumber={data?.likeCount}
            tweetID={data?.id}
            isLike={data?.liked}
            setSelfTweetList={setSelfTweetList}
          />
        ))}
      {tweetList &&
        tweetList?.map((data) => (
          <UserTweetBox
            key={data.id}
            tweeterAccount={data?.User.account}
            tweeterName={data?.User.name}
            tweeterID={data.User?.id}
            avatar={data.User?.avatar}
            update={data?.createdAt}
            content={data?.description}
            tweetNumber={data?.replyCount}
            likesNumber={data?.likeCount}
            tweetID={data?.id}
            isLike={data?.isLiked}
          />
        ))}
      {selfLikeTweet &&
        selfLikeTweet?.map((data) => (
          <UserTweetBox
            key={data?.id}
            tweeterAccount={data?.Tweet?.User?.account}
            tweeterName={data?.Tweet?.User?.name}
            tweeterID={data?.Tweet?.User?.id}
            avatar={data?.Tweet?.User?.avatar}
            update={data?.Tweet?.createdAt}
            content={data?.Tweet?.description}
            tweetNumber={data?.Tweet?.ReplyCount}
            likesNumber={data?.Tweet?.LikeCount}
            tweetID={data?.TweetId}
            isLike={data?.Tweet?.isLiked}
            setSelfLikeTweet={setSelfLikeTweet}
            isOnLikePage={true}
          />
        ))}
    </div>
  );
}

export default UserTweetList;
