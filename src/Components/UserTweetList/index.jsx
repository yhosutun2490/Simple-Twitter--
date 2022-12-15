import UserTweetBox from "../UserTweetBox";
import { useState, useEffect } from "react";

function UserTweetList(props) {
  const { tweetList, selfTweet, selfAccount } = props;

  return (
    <div>
      {selfTweet &&
        selfTweet?.map((data) => (
          <UserTweetBox
            key={data.id}
            tweeterAccount={data?.account}
            tweeterName={data?.name}
            Avatar={data?.avatar}
            update={data?.updatedAt}
            content={data?.description}
            tweetNumber={data?.repliesCount}
            likeNumber={data?.likeCount}
            tweetID={data?.id}
            isLike={data?.liked}
          />
        ))}
      {tweetList &&
        tweetList?.map((data) => (
          <UserTweetBox
            key={data.id}
            tweeterAccount={data.user?.account}
            tweeterName={data.user?.name}
            tweeterID={data.user?.id}
            Avatar={data.user?.avatar}
            update={data?.updatedAt}
            content={data?.description}
            tweetNumber={data?.repliesCount}
            likeNumber={data?.likeCount}
            tweetID={data?.id}
            isLike={data?.liked}
          />
        ))}
    </div>
  );
}

export default UserTweetList;
