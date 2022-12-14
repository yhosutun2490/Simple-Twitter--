import styles from "./ReplyList.module.scss";
import ReplyBox from "../ReplyBox";
function ReplyList(props) {
  // 會用回覆者清單作渲染
  const { repliesData, mainTweetInfo } = props;
  const replyTweets = repliesData?.data;
  const mainTweeterAccount = mainTweetInfo ? mainTweetInfo[0].user.account : "";
  console.log(replyTweets);
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
          />
        ))}
      {/* <ReplyBox
        userName={"Sean"}
        account={"Sean888"}
        update={3}
        tweeterUser={"Apple"}
      />
      <ReplyBox
        userName={"Sean"}
        account={"Sean888"}
        update={3}
        tweeterUser={"Apple"}
      />
      <ReplyBox
        userName={"Sean"}
        account={"Sean888"}
        update={3}
        tweeterUser={"Apple"}
      />
      <ReplyBox
        userName={"Sean"}
        account={"Sean888"}
        update={3}
        tweeterUser={"Apple"}
      />
      <ReplyBox
        userName={"Sean"}
        account={"Sean888"}
        update={3}
        tweeterUser={"Apple"}
      />
      <ReplyBox
        userName={"Sean"}
        account={"Sean888"}
        update={3}
        tweeterUser={"Apple"}
      /> */}
    </div>
  );
}

export default ReplyList;
