import UserTweetBox from "../UserTweetBox";
function UserTweetList(props) {
  const { tweetList, selfTweet } = props;

  return (
    <div>
      {selfTweet &&
        selfTweet?.map((data) => (
          <UserTweetBox
            key={data?.id}
            tweeterAccount={data?.account}
            tweeterName={data?.name}
            avatar={data?.avatar}
            update={data?.updatedAt}
            content={data?.description}
            tweetNumber={data?.repliesCount}
            likesNumber={data?.likeCount}
            tweetID={data?.id}
            isLike={data?.liked}
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
            update={data?.cratedAt}
            content={data?.description}
            tweetNumber={data?.replyCount}
            likesNumber={data?.LikeCount}
            tweetID={data?.id}
            isLike={data?.ifliked}
          />
        ))}
    </div>
  );
}

export default UserTweetList;
