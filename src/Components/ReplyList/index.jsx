import styles from "./ReplyList.module.scss";
import ReplyBox from "../ReplyBox";
function ReplyList(props) {
  // 會用回覆者清單作渲染
  const { repliesData, mainTweetInfo } = props;
  // 主要回覆清單資料
  const replyTweets = repliesData?.data;
  // 回覆人
  const mainTweeterAccount = mainTweetInfo ? mainTweetInfo[0].user.account : "";

  return (
    <div className={styles["container"]}>
      {replyTweets &&
        replyTweets[0].replies?.map((data) => (
          <ReplyBox
            key={data.id}
            avatar={data?.user?.avatar}
            account={data?.user?.account}
            name={data?.user?.name}
            update={data?.updatedAt}
            content={data?.description}
            userID={data?.user?.id}
            comment={data?.comment}
            replyTo={mainTweeterAccount}
          />
        ))}
    </div>
  );
}

export default ReplyList;
