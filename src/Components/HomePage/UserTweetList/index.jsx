import UserTweetBox from "../../UserTweetBox";

function UserTweetList() {
  return (
    <div>
      <UserTweetBox isLike={true} />
      <UserTweetBox />
      <UserTweetBox isLike={true} />
      <UserTweetBox isLike={true} />
      <UserTweetBox />
      <UserTweetBox />
      <UserTweetBox />
      <UserTweetBox />
    </div>
  );
}

export default UserTweetList;
