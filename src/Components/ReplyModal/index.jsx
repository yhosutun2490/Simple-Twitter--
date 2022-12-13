import styles from "./ReplyModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/cross_orange.svg";
import { ReactComponent as Avatar } from "../../assets/icons/user_fake.svg";
import TweetSubmitButton from "../TweetInput/TweetSubmitButton";
function ReplyModal(props) {
  // 設定props 打開與否和關閉事件
  const { trigger, closeEvent } = props;
  return trigger ? (
    <>
      <div className={styles["popup-backdrop"]}></div>
      <div className={styles["popup-main-window"]}>
        <div className={styles["popup-head"]}>
          <button
            className={styles["btn-close"]}
            onClick={() => closeEvent(false)}
          >
            <Close className={styles["btn-close-img"]} />
          </button>
        </div>
        <div className={styles["popup-body"]}>
          <div className={styles["user-avatar"]}>
            <Avatar />
          </div>
          <div className={styles["input-body"]}>
            <textarea
              className={styles["input-textarea"]}
              placeholder="有什麼新鮮事?"
            ></textarea>
          </div>
        </div>
        <div className={styles["popup-footer"]}>
          <div>
            <TweetSubmitButton />
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
export default ReplyModal;
