import styles from "./ReplyBox.module.scss";
import UserInfo from "../UserTweetBox/UserInfo";
import { ReactComponent as Avatar } from "../../assets/icons/AcLogo.svg";
import { Link } from "react-router-dom";

function ReplyBox(props) {
  // 這邊傳進來的是回覆的使用者
  const { userName, account, update, content, tweeterUser } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["user-avatar"]}>
        <Link to={`/user/${account}`}>
          <Avatar />
        </Link>
      </div>
      <div className={styles["response-detail"]}>
        <UserInfo userName={userName} account={account} update={update} />
        <div className={styles["response-to"]}>
          <p className={styles["response-title-1"]}>回覆</p>
          <p className={styles["response-title-2"]}>@{tweeterUser}</p>
        </div>
        <div className={styles["response-text"]}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </div>
      </div>
    </div>
  );
}

export default ReplyBox;
