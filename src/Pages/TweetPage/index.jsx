import styles from "./TweetPage.module.scss";
import { ReactComponent as PreArrow } from "../../assets/icons/arrowPre.svg";
import TweetInfo from "../../Components/TweetInfo";
import { useState } from "react";
function TweetPage() {
  const [isLiked, setIsLiked ] = useState(false);
  return (
    <div className={styles["container"]}>
      <div className={styles["page-title-wrap"]}>
        <PreArrow className={styles["arrow-img"]} />
        <p className={styles["page-title"]}>首頁</p>
      </div>
      <div className={styles["tweet-info-wrap"]}>
        <TweetInfo isLiked={isLiked} setLikeEvent={setIsLiked} />
      </div>
      <div className={styles["tweet-reply-wrap"]}></div>
    </div>
  );
}

export default TweetPage;
