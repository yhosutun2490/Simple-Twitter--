import styles from "./TweetPage.module.scss";
import { ReactComponent as PreArrow } from "../../assets/icons/arrowPre.svg";
import TweetInfo from "../../Components/TweetInfo";
import ReplyList from "../../Components/ReplyList";
import { useState } from "react";
function TweetPage(props) {
  const [isLiked, setIsLiked] = useState(false);
  const { replyerData } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["page-title-wrap"]}>
        <PreArrow className={styles["arrow-img"]} />
        <p className={styles["page-title"]}>推文</p>
      </div>
      <div className={styles["tweet-info-wrap"]}>
        <TweetInfo isLiked={isLiked} setLikeEvent={setIsLiked} />
      </div>
      <div className={styles["tweet-reply-wrap"]}>
        <ReplyList replyerData />
      </div>
    </div>
  );
}

export default TweetPage;
