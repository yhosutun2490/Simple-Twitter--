import styles from "./ReplyList.module.scss";
import ReplyBox from "../ReplyBox";
function ReplyList(props) {
  // 會用回覆者清單作渲染
  const { replyerData } = props;
  return (
    <div className={styles["container"]}>
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
      />
      <ReplyBox
        userName={"Sean"}
        account={"Sean888"}
        update={3}
        tweeterUser={"Apple"}
      />
    </div>
  );
}

export default ReplyList;
