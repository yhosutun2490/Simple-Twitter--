import styles from "./UserInfo.module.scss";

function UserInfo(props) {
  const { userName, account, update } = props;
  return (
    <div className={styles["container"]}>
      <p className={styles["user-info-name"]}>
        {userName ? userName : "Apple"}
      </p>
      <p className={styles["user-info-account"]}>
        {account ? `@${account}` : "@Apple"}
      </p>
      <p className={styles["user-info-dot"]}>•</p>
      <p className={styles["user-info-update"]}>
        {update ? `${update} 小時` : "3 小時"}
      </p>
    </div>
  );
}

export default UserInfo;
