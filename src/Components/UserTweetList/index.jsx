import UserTweetBox from "../UserTweetBox";

function UserTweetList(props) {
  const { tweetList, selfTweet, setSelfTweetList, selfLikeTweet } = props;

  return (
    <div>
      {selfTweet &&
        selfTweet?.map((data) => (
          <UserTweetBox
            key={data?.id}
            tweeterAccount={data?.User?.account}
            tweeterName={data?.User?.name}
            tweeterID={data?.User?.id}
            avatar={data?.User?.avatar}
            update={data?.updatedAt}
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
            update={data?.createdAt}
            content={data?.Tweet?.description}
            tweetNumber={data?.Tweet?.ReplyCount}
            likesNumber={data?.Tweet?.LikeCount}
            tweetID={data?.TweetId}
            isLike={data?.Tweet?.isLiked}
            setSelfTweetList={setSelfTweetList}
          />
        ))}
    </div>
  );
}

export default UserTweetList;
