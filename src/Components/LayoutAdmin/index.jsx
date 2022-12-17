import { Outlet } from "react-router-dom";
import styles from "./LayoutAdmin.module.scss";
import AdminSideBar from "../AdminSideBar";

function LayoutAdmin() {
  return (
    <div className={styles["layout-container"]}>
      <div className={styles["column-1"]}>
        <AdminSideBar />
      </div>
      <div className={styles["column-2"]}>
        <Outlet />
      </div>
    </div>
  );
}
export default LayoutAdmin;
