import styles from "./TweetPage.module.scss";
import { ReactComponent as PreArrow } from "../../assets/icons/arrowPre.svg";
import TweetInfo from "../../Components/TweetInfo";
import ReplyList from "../../Components/ReplyList";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
function TweetPage(props) {
  const [isLiked, setIsLiked] = useState(false);
  const containerRef = useRef(null);
  // 點擊置頂功能
  function scrollTop() {
    containerRef.current.scrollTo(0, 0);
  }
  const { replyerData } = props;
  return (
    <div className={styles["container"]} ref={containerRef} onClick={scrollTop}>
      <div className={styles["page-title-wrap"]}>
        <Link to={"/home"}>
          <PreArrow className={styles["arrow-img"]} />
        </Link>

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
