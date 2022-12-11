import styles from "./UserSideBar.module.scss";
import UserNavBar from "./UserNavBar";
function UserSideBar() {
  return (
    <div className={styles["container"]}>
      <UserNavBar />
    </div>
  );
}

export default UserSideBar;
