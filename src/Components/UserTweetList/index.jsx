import UserTweetBox from "../UserTweetBox";
import { useState, useEffect } from "react";

function UserTweetList(props) {
  const { tweetList } = props;

  return (
    <div>
      {tweetList &&
        tweetList.map((data) => (
          <UserTweetBox
            key={data.id}
            tweeterAccount={data.user.account}
            tweeterName={data.user.name}
            Avatar={data.user.avatar}
            update={data.updatedAt}
            content={data.description}
            tweetNumber={data.repliesCount}
            likeNumber={data.likeCount}
            tweetID={data.id}
            isLike
          />
        ))}
    </div>
  );
}

export default UserTweetList;
