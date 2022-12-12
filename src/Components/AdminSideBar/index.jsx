import styles from "./AdminSideBar.module.scss";
import AdminNavBar from "./AdminNavBar";
function AdminSideBar() {
  return (
    <div className={styles["container"]}>
      <AdminNavBar />
    </div>
  );
}

export default AdminSideBar;
