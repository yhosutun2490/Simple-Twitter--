import styles from "./ReplyList.module.scss";
import ReplyBox from "../ReplyBox";
function ReplyList(props) {
  // 會用回覆者清單作渲染 (因為有不同資料，怕API格式不同以不同map渲染)
  const { repliesData, mainTweeter, selfProfile, selfReplies } = props;

  return (
    <div className={styles["container"]}>
      {repliesData &&
        repliesData?.map((data) => (
          <ReplyBox
            key={data.id}
            avatar={data?.User?.avatar}
            account={data?.User?.account}
            name={data?.User?.name}
            update={data?.updatedAt}
            userID={data?.User?.id}
            comment={data?.comment}
            replyTo={mainTweeter}
          />
        ))}
      {selfReplies &&
        selfReplies?.map((data) => (
          <ReplyBox
            key={data.id}
            avatar={selfProfile?.avatar}
            account={selfProfile?.account}
            name={selfProfile?.name}
            update={data?.createdAt}
            userID={selfProfile?.id}
            comment={data?.comment}
            replyTo={data?.Tweet?.User?.account}
          />
        ))}
    </div>
  );
}

export default ReplyList;
