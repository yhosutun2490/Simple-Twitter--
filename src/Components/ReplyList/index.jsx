import styles from "./ReplyList.module.scss";
import ReplyBox from "../ReplyBox";
function ReplyList(props) {
  // 會用回覆者清單作渲染 (因為有不同資料，怕API格式不同以不同map渲染)
  const { repliesData, mainTweetInfo, selfAccount, selfReplies } = props;
  // 主要回覆清單資料
  const replyTweets = repliesData?.data;
  // 回文首頁用回覆人
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
            userID={data?.user?.id}
            comment={data?.comment}
            replyTo={mainTweeterAccount}
          />
        ))}
      {selfReplies &&
        selfReplies?.map((data) => (
          <ReplyBox
            key={data.id}
            avatar={selfAccount?.avatar}
            account={selfAccount?.account}
            name={selfAccount?.name}
            update={data?.updatedAt}
            userID={selfAccount?.id}
            comment={data?.description}
            replyTo={data?.user.account}
          />
        ))}
    </div>
  );
}

export default ReplyList;
