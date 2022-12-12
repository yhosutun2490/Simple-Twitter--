import styles from "./TweetModal.module.scss";
import { ReactComponent as Close } from "../../assets/icons/cross_orange.svg";
import { useState } from "react";

function TweetModal(props) {
  // 設定trigger參數，true or false決定彈窗打開與否
  // 設定關掉彈窗的set function (父層傳入)
  const { trigger, closeEvent } = props;
  const [text, setText] = useState("");
  return trigger ? (
    <>
      <div
        className={styles["popup-backdrop"]}
        onClick={() => {
          setText("");
          closeEvent(false);
        }}
      ></div>
      <div className={styles["popup-main-window"]}>
        <div className={styles["popup-head"]}>
          <button
            className={styles["btn-close"]}
            onClick={() => {
              setText("");
              closeEvent(false);
            }}
          >
            <Close className={styles["btn-close-img"]} />
          </button>
        </div>
        <div className={styles["popup-body"]}></div>
        <div className={styles["popup-footer"]}>
          <button className={styles["tweet-btn"]}>推文</button>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default TweetModal;
