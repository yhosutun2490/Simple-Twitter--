import styles from "./UserInfo.module.scss";
import { Link } from "react-router-dom"; // 名字連結用

function UserInfo(props) {
  const { userName, account, update, tweeterID } = props;
  return (
    <div className={styles["container"]}>
      <p className={styles["user-info-name"]}>
        {userName ? userName : "Apple"}
      </p>
      <p className={styles["user-info-account"]}>
        <Link to={`/user/${tweeterID}`} className={styles["account-link"]}>{account ? `@${account}` : "@Apple"}</Link>
      </p>
      <p className={styles["user-info-dot"]}>•</p>
      <p className={styles["user-info-update"]}>
        {update ? `${update}` : "3 小時"}
      </p>
    </div>
  );
}

export default UserInfo;
